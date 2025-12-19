import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const HealthInfo = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("health"); // basic, medication, allergy, emergency
  const [diseases, setDiseases] = useState([]);
  const [health, setHealth] = useState({
    bloodRh: "-",
    bloodAbo: "",
    height: "-",
    weight: "-",
    diseases: [],
  });
  const [medications, setMedications] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [emergencyPhones, setEmergencyPhones] = useState([]);

  const [healthData, setHealthData] = useState({
    health: health,
    medication: medications,
    allergy: allergies,
    emergencyPhones: emergencyPhones,
  });

  const [formData, setFormData] = useState(healthData);

  const handleChange = (section, field, value) => {
    if (
      section === "health" ||
      section === "medication" ||
      section === "allergy" ||
      section === "emergencyPhones"
    ) {
      setFormData((prev) => ({
        ...prev,
        [section]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleAddItem = (section) => {
    const newItem =
      section === "medication"
        ? { medicationName: "", medicationUsage: "", medicationTakingtime: "" }
        : section === "allergy"
        ? { allergyType: "", allergyName: "" }
        : {
            emergencyPhoneName: "",
            emergencyPhoneRelationship: "",
            emergencyPhoneNumber: "",
          };

    setFormData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem],
    }));
  };

  const handleRemoveItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: (prev[section] || []).filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      // 기본정보 수정 (기저질환 포함)
      const healthResponse = await fetch(
        `${privateUrl}/my-page/health/modify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            ...formData.health,
            diseases: formData.health.diseases || health,
          }),
        }
      );
      if (!healthResponse.ok) {
        throw new Error("건강정보 저장 실패");
      }
      const healthResult = await healthResponse.json();

      // 복용약물 수정
      const medicationResponse = await fetch(
        `${privateUrl}/my-page/medication/modify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(formData.medication || medications),
        }
      );
      if (!medicationResponse.ok) {
        throw new Error("복용약물 저장 실패");
      }
      const medicationResult = await medicationResponse.json();

      // 알레르기 수정
      const allergyResponse = await fetch(
        `${privateUrl}/my-page/allergy/modify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(formData.allergy || allergies),
        }
      );
      if (!allergyResponse.ok) {
        throw new Error("알레르기 저장 실패");
      }
      const allergyResult = await allergyResponse.json();

      // 응급연락처 수정
      const emergencyResponse = await fetch(
        `${privateUrl}/my-page/emergency-phone/modify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(formData.emergencyPhones || emergencyPhones),
        }
      );
      if (!emergencyResponse.ok) {
        throw new Error("응급연락처 저장 실패");
      }
      const emergencyResult = await emergencyResponse.json();

      // 저장된 데이터로 상태 업데이트
      const updatedData = {
        health: healthResult.data || formData.health,
        medication: medicationResult.data || formData.medication,
        allergy: allergyResult.data || formData.allergy,
        emergencyPhones: emergencyResult.data || formData.emergencyPhones,
      };

      setHealthData(updatedData);
      setFormData(updatedData);
      setHealth(healthResult.data || formData.health);
      setMedications(medicationResult.data || formData.medication);
      setAllergies(allergyResult.data || formData.allergy);
      setEmergencyPhones(emergencyResult.data || formData.emergencyPhones);
      setDiseases(healthResult.data?.diseases || diseases);

      alert("건강정보가 저장되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving health data:", error);
      alert("건강정보 저장에 실패했습니다: " + error.message);
    }
  };

  const handleCancel = () => {
    setFormData(healthData);
    setIsEditing(false);
  };

  const tabs = [
    { id: "health", label: "기본정보", icon: "🏥" },
    { id: "medication", label: "복용약물", icon: "💊" },
    { id: "allergy", label: "알레르기", icon: "⚠️" },
    { id: "emergencyPhones", label: "응급연락처", icon: "📞" },
  ];

  const privateUrl =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 건강 정보 가져오기
        const healthResponse = await fetch(`${privateUrl}/my-page/health`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (!healthResponse.ok) {
          throw new Error("건강정보 조회 실패");
        }
        const healthResult = await healthResponse.json();
        const healthData = healthResult.data.health;
        setHealth(healthData);
        // setDiseases(healthData.health.diseases);
        console.log("Fetched health info:", healthData);

        // 복용약물 가져오기
        const medicationResponse = await fetch(
          `${privateUrl}/my-page/medication`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (!medicationResponse.ok) {
          throw new Error("복용약물 조회 실패");
        }
        const medicationResult = await medicationResponse.json();
        const medicationData = medicationResult.data || medications;
        setMedications(medicationData);

        // 알레르기 가져오기
        const allergyResponse = await fetch(`${privateUrl}/my-page/allergy`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (!allergyResponse.ok) {
          throw new Error("알레르기 조회 실패");
        }
        const allergyResult = await allergyResponse.json();
        const allergyData = allergyResult.data || allergies;
        setAllergies(allergyData);

        // 응급연락처 가져오기
        const emergencyResponse = await fetch(
          `${privateUrl}/my-page/emergency-phone`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (!emergencyResponse.ok) {
          throw new Error("응급연락처 조회 실패");
        }
        const emergencyResult = await emergencyResponse.json();
        const emergencyData = emergencyResult.data || emergencyPhones;
        setEmergencyPhones(emergencyData);

        const allData = {
          health: healthData,
          medication: medicationData,
          allergy: allergyData,
          emergencyPhones: emergencyData,
        };
        setFormData(allData);
        setHealthData(allData);
        console.log("Fetched health data:", allData);
      } catch (error) {
        console.error("Error fetching health data:", error);
        alert("건강정보를 불러오는데 실패했습니다: " + error.message);
      }
    };

    fetchAllData();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>← 뒤로</S.BackButton>
        <S.Title>건강정보 관리</S.Title>
      </S.Header>

      <S.Content>
        <S.TabContainer>
          {tabs.map((tab) => (
            <S.Tab
              key={tab.id}
              $active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}>
              <S.TabIcon>{tab.icon}</S.TabIcon>
              <S.TabLabel>{tab.label}</S.TabLabel>
            </S.Tab>
          ))}
        </S.TabContainer>

        <S.HealthSection>
          {!isEditing && (
            <S.EditButton onClick={() => setIsEditing(true)}>수정</S.EditButton>
          )}

          {activeTab === "health" && (
            <S.BasicInfoSection>
              <S.InputGroup>
                <S.Label>혈액형</S.Label>
                {isEditing ? (
                  <>
                    <S.Select
                      value={formData.health.bloodRh}
                      onChange={(e) =>
                        handleChange("health", "bloodRh", e.target.value)
                      }>
                      <option value="RH+">RH+</option>
                      <option value="RH-">RH-</option>
                    </S.Select>
                    <S.Select
                      value={formData.health.bloodAbo}
                      onChange={(e) =>
                        handleChange("health", "bloodAbo", e.target.value)
                      }>
                      <option value="A">A형</option>
                      <option value="B">B형</option>
                      <option value="AB">AB형</option>
                      <option value="O">O형</option>
                    </S.Select>
                  </>
                ) : (
                  <S.InfoValue>
                    {formData.health.bloodRh ? formData.health.bloodRh : ""}
                    {formData.health.bloodAbo
                      ? ` ${formData.health.bloodAbo}형`
                      : " -"}
                  </S.InfoValue>
                )}
              </S.InputGroup>

              <S.InputGroup>
                <S.Label>키 (cm)</S.Label>
                {isEditing ? (
                  <S.Input
                    type="number"
                    value={formData.health.height}
                    onChange={(e) =>
                      handleChange("health", "height", e.target.value)
                    }
                    placeholder="키를 입력하세요"
                  />
                ) : (
                  <S.InfoValue>
                    {formData.health.height && formData.health.height !== "-"
                      ? `${formData.health.height} cm`
                      : "-"}
                  </S.InfoValue>
                )}
              </S.InputGroup>

              <S.InputGroup>
                <S.Label>몸무게 (kg)</S.Label>
                {isEditing ? (
                  <S.Input
                    type="number"
                    value={formData.health.weight}
                    onChange={(e) =>
                      handleChange("health", "weight", e.target.value)
                    }
                    placeholder="몸무게를 입력하세요"
                  />
                ) : (
                  <S.InfoValue>
                    {formData.health.weight && formData.health.weight !== "-"
                      ? `${formData.health.weight} kg`
                      : "-"}
                  </S.InfoValue>
                )}
              </S.InputGroup>

              <S.InputGroup>
                <S.Label>기저질환</S.Label>
                {isEditing ? (
                  <S.TagInput
                    type="text"
                    placeholder="기저질환을 입력하고 Enter를 누르세요"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        handleChange("health", "diseases", [
                          ...formData.health.diseases,
                          e.target.value.trim(),
                        ]);
                        e.target.value = "";
                      }
                    }}
                  />
                ) : null}
                <S.TagContainer>
                  {formData.health.diseases &&
                  formData.health.diseases.length > 0
                    ? formData.health.diseases.map((disease, idx) => (
                        <S.Tag key={idx}>
                          {disease.displayName}
                          {isEditing && (
                            <S.TagRemove
                              onClick={() => {
                                handleChange(
                                  "health",
                                  "diseases",
                                  formData.health.diseases.filter(
                                    (_, i) => i !== idx
                                  )
                                );
                              }}>
                              ×
                            </S.TagRemove>
                          )}
                        </S.Tag>
                      ))
                    : !isEditing && (
                        <S.EmptyMessage>
                          등록된 기저질환이 없습니다.
                        </S.EmptyMessage>
                      )}
                </S.TagContainer>
              </S.InputGroup>
            </S.BasicInfoSection>
          )}

          {activeTab === "medication" && (
            <S.MedicationSection>
              {formData.medication && formData.medication.length > 0
                ? formData.medication.map((med, idx) => (
                    <S.MedicationCard key={idx}>
                      {isEditing ? (
                        <>
                          <S.InputGroup>
                            <S.Label>약물명</S.Label>
                            <S.Input
                              value={med.medicationName}
                              onChange={(e) => {
                                const updated = [...formData.medication];
                                updated[idx].medicationName = e.target.value;
                                handleChange("medication", null, updated);
                              }}
                              placeholder="약물명을 입력하세요"
                            />
                          </S.InputGroup>
                          <S.InputGroup>
                            <S.Label>용법</S.Label>
                            <S.Input
                              value={med.medicationUsage}
                              onChange={(e) => {
                                const updated = [...formData.medication];
                                updated[idx].medicationUsage = e.target.value;
                                handleChange("medication", null, updated);
                              }}
                              placeholder="예: 1일 1회"
                            />
                          </S.InputGroup>
                          <S.InputGroup>
                            <S.Label>복용시간</S.Label>
                            <S.Input
                              value={med.medicationTakingtime}
                              onChange={(e) => {
                                const updated = [...formData.medication];
                                updated[idx].medicationTakingtime =
                                  e.target.value;
                                handleChange("medication", null, updated);
                              }}
                              placeholder="예: 아침 식후"
                            />
                          </S.InputGroup>
                          <S.RemoveButton
                            onClick={() => handleRemoveItem("medication", idx)}>
                            삭제
                          </S.RemoveButton>
                        </>
                      ) : (
                        <>
                          <S.MedicationName>
                            {med.medicationName}
                          </S.MedicationName>
                          <S.MedicationInfo>
                            {med.medicationUsage} - {med.medicationTakingtime}
                          </S.MedicationInfo>
                        </>
                      )}
                    </S.MedicationCard>
                  ))
                : !isEditing && (
                    <S.EmptyMessage>등록된 복용약물이 없습니다.</S.EmptyMessage>
                  )}
              {isEditing && (
                <S.AddButton onClick={() => handleAddItem("medication")}>
                  + 약물 추가
                </S.AddButton>
              )}
            </S.MedicationSection>
          )}

          {activeTab === "allergy" && (
            <S.AllergySection>
              {formData.allergy && formData.allergy.length > 0
                ? formData.allergy.map((item, idx) => (
                    <S.AllergyCard key={idx}>
                      {isEditing ? (
                        <>
                          <S.InputGroup>
                            <S.Label>알레르기 유형</S.Label>
                            <S.Select
                              value={item.allergyType}
                              onChange={(e) => {
                                const updated = [...formData.allergy];
                                updated[idx].allergyType = e.target.value;
                                handleChange("allergy", null, updated);
                              }}>
                              <option value="">선택하세요</option>
                              <option value="약물">약물</option>
                              <option value="음식">음식</option>
                              <option value="환경">환경</option>
                              <option value="기타">기타</option>
                            </S.Select>
                          </S.InputGroup>
                          <S.InputGroup>
                            <S.Label>알레르기 항목</S.Label>
                            <S.Input
                              value={item.allergyName}
                              onChange={(e) => {
                                const updated = [...formData.allergy];
                                updated[idx].allergyName = e.target.value;
                                handleChange("allergy", null, updated);
                              }}
                              placeholder="알레르기 항목을 입력하세요"
                            />
                          </S.InputGroup>
                          <S.RemoveButton
                            onClick={() => handleRemoveItem("allergy", idx)}>
                            삭제
                          </S.RemoveButton>
                        </>
                      ) : (
                        <>
                          <S.AllergyType>{item.allergyType}</S.AllergyType>
                          <S.AllergyName>{item.allergyName}</S.AllergyName>
                        </>
                      )}
                    </S.AllergyCard>
                  ))
                : !isEditing && (
                    <S.EmptyMessage>등록된 알레르기가 없습니다.</S.EmptyMessage>
                  )}
              {isEditing && (
                <S.AddButton onClick={() => handleAddItem("allergy")}>
                  + 알레르기 추가
                </S.AddButton>
              )}
            </S.AllergySection>
          )}

          {activeTab === "emergencyPhones" && (
            <S.EmergencySection>
              {formData.emergencyPhones && formData.emergencyPhones.length > 0
                ? formData.emergencyPhones.map((contact, idx) => (
                    <S.EmergencyCard key={idx}>
                      {isEditing ? (
                        <>
                          <S.InputGroup>
                            <S.Label>이름</S.Label>
                            <S.Input
                              value={contact.emergencyPhoneName}
                              onChange={(e) => {
                                const updated = [...formData.emergencyPhones];
                                updated[idx].emergencyPhoneName =
                                  e.target.value;
                                handleChange("emergencyPhones", null, updated);
                              }}
                              placeholder="이름을 입력하세요"
                            />
                          </S.InputGroup>
                          <S.InputGroup>
                            <S.Label>관계</S.Label>
                            <S.Input
                              value={contact.emergencyPhoneRelationship}
                              onChange={(e) => {
                                const updated = [...formData.emergencyPhones];
                                updated[idx].emergencyPhoneRelationship =
                                  e.target.value;
                                handleChange("emergencyPhones", null, updated);
                              }}
                              placeholder="관계를 입력하세요"
                            />
                          </S.InputGroup>
                          <S.InputGroup>
                            <S.Label>전화번호</S.Label>
                            <S.Input
                              type="tel"
                              value={contact.emergencyPhoneNumber}
                              onChange={(e) => {
                                const updated = [...formData.emergencyPhones];
                                updated[idx].emergencyPhoneNumber =
                                  e.target.value;
                                handleChange("emergencyPhones", null, updated);
                              }}
                              placeholder="010-0000-0000"
                            />
                          </S.InputGroup>
                          <S.RemoveButton
                            onClick={() =>
                              handleRemoveItem("emergencyPhones", idx)
                            }>
                            삭제
                          </S.RemoveButton>
                        </>
                      ) : (
                        <>
                          <S.EmergencyName>
                            {contact.emergencyPhoneName}
                          </S.EmergencyName>
                          <S.EmergencyRelation>
                            {contact.emergencyPhoneRelationship}
                          </S.EmergencyRelation>
                          <S.EmergencyPhone
                            href={`tel:${contact.emergencyPhoneNumber}`}>
                            {contact.emergencyPhoneNumber}
                          </S.EmergencyPhone>
                        </>
                      )}
                    </S.EmergencyCard>
                  ))
                : !isEditing && (
                    <S.EmptyMessage>
                      등록된 응급연락처가 없습니다.
                    </S.EmptyMessage>
                  )}
              {isEditing && (
                <S.AddButton onClick={() => handleAddItem("emergencyPhones")}>
                  + 연락처 추가
                </S.AddButton>
              )}
            </S.EmergencySection>
          )}

          {isEditing && (
            <S.ButtonGroup>
              <S.CancelButton onClick={handleCancel}>취소</S.CancelButton>
              <S.SaveButton onClick={handleSave}>저장</S.SaveButton>
            </S.ButtonGroup>
          )}
        </S.HealthSection>
      </S.Content>
    </S.Container>
  );
};

export default HealthInfo;
