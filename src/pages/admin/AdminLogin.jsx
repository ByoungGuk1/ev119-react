import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from "./style";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    memberEmail: "",
    memberPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const handleChange = (e) => {
    setError("");
    setInfo("");
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const validate = () => {
    if(!formData.memberEmail.trim()) return "이메일을 입력해 주세요.";
    if(!formData.memberPassword.trim()) return "비밀번호를 입력해주세요";
    return ""; 
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    const v = validate();
    if(v) return setError(v);

    try {
      setLoading(true);

      const response = await fetch(`${BACKEND_URL}/api/member/login`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const json = await response.json().catch(() => null);

      if(!response.ok) {
        const message = json?.message || "로그인에 실패했습니다.";
        setError(message);
        return;
      }

      const data = json?.data;
      const memberType = data?.memberType;

      if(memberType !== "ADMIN") {
        setError("관리자 계정이 아닙니다. 관리자 계정으로 로그인 해 주세요.");
        return;
      }

      if(data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      localStorage.setItem("memberType", memberType);
      localStorage.setItem("memberEmail", data?.memberEmail || "");

      setInfo("관리자 로그인 성공! 대시보드로 이동합니다!");
      navigate("/admin/intro");
    } catch (error) {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Logo to="/">EV119</S.Logo>
        <S.Subtitle>관리자 전용 로그인</S.Subtitle>
      </S.Header>

      <S.MainContent>
        <S.FormCard>
          <S.FormTitle>Admin Login</S.FormTitle>
          <S.FormSubtitle>
            관리자 계정으로 로그인하면 운영 기능에 접근할 수 있어요.
          </S.FormSubtitle>

          <S.Form onSubmit={handleSubmit}>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            {info && <S.InfoMessage>{info}</S.InfoMessage>}

            <S.InputGroup>
              <S.Label htmlFor="memberEmail">이메일</S.Label>
              <S.Input
                id="memberEmail"
                name="memberEmail"
                type="email"
                placeholder="admin@example.com"
                value={formData.memberEmail}
                onChange={handleChange}
                autoComplete="email"
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label htmlFor="memberPassword">비밀번호</S.Label>
              <S.Input
                id="memberPassword"
                name="memberPassword"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={formData.memberPassword}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </S.InputGroup>

            <S.SubmitButton type="submit" disabled={loading}>
              {loading ? "로그인 중..." : "관리자 로그인"}
            </S.SubmitButton>

            <S.Divider>
              <S.DividerLine />
              <S.DividerText>또는</S.DividerText>
              <S.DividerLine />
            </S.Divider>

            <S.ButtonRow>
              <S.GhostButton type="button" onClick={() => navigate("/")}>
                사용자 화면
              </S.GhostButton>
            </S.ButtonRow>

            <S.AdminHint>
              * 보안상 관리자 계정이 아닐 경우 접근이 차단됩니다.
            </S.AdminHint>
          </S.Form>
        </S.FormCard>
      </S.MainContent>
    </S.Container>
  );
};

export default AdminLogin;