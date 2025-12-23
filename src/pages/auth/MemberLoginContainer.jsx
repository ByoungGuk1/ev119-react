import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import * as S from "./style";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";

const ERROR_MESSAGES = {
  REDIS_DOWN:
    "현재 서버(세션/토큰 저장소) 상태 문제로 소셜 로그인이 불가합니다. 잠시 후 다시 시도해주세요.",
  REDIS_ERROR:
    "소셜 로그인 처리 중 저장소 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  OAUTH_EMAIL_MISSING:
    "이메일 제공에 동의해야 소셜 로그인을 사용할 수 있습니다.",
  OAUTH_DB_NOT_FOUND:
    "소셜 계정이 회원 DB에 없습니다. 관리자에게 문의해주세요.",
  DEFAULT: "소셜 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.",
};

const MemberLoginContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const err = params.get("error");

    if (err) {
      setError(ERROR_MESSAGES[err] || ERROR_MESSAGES.DEFAULT);

      navigate("/auth/login", { replace: true });
    }
  }, [location.search, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleKakaoLogin = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/kakao`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/naver`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/member/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          memberEmail: formData.email,
          memberPassword: formData.password,
        }),
      });

      let result = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (response.status === 400) {
        setError(result?.message || "입력하신 정보를 다시 확인해주세요.");
        return;
      }

      if (response.status === 401) {
        setError(result?.message || "토큰이 없거나 인증에 실패했습니다.");
        return;
      }

      if (!response.ok) {
        setError(result?.message || "서버 오류가 발생했습니다.");
        return;
      }

      const data = result?.data;
      const accessToken = data?.accessToken;

      if (!accessToken) {
        throw new Error("입력하신 정보를 다시 확인해주세요.");
      }

      localStorage.setItem("accessToken", accessToken);

      const currentMember = {
        memberId: data?.memberId ?? null,
        memberName: data?.memberName ?? null,
        memberEmail: data?.memberEmail ?? formData.email,
        provider: "LOCAL",
      };

      localStorage.setItem("currentMember", JSON.stringify(currentMember));
      localStorage.setItem(
        "member",
        JSON.stringify({
          memberId: currentMember.memberId,
          memberName: currentMember.memberName,
          memberEmail: currentMember.memberEmail,
        })
      );
      localStorage.setItem("isLoggedIn", "true");

      navigate("/main/mypage");
    } catch (err) {
      console.error(err);
      setError(err?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div>
      {" "}
      <S.MainContent>
        <S.FormCard>
          <S.FormTitle>일반 로그인</S.FormTitle>
          <S.FormSubtitle>이메일과 비밀번호를 입력해주세요</S.FormSubtitle>

          <S.Form onSubmit={handleSubmit}>
            <S.InputGroup>
              <S.Label>이메일</S.Label>
              <S.Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                required
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>비밀번호</S.Label>
              <S.Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </S.InputGroup>

            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

            <S.SubmitButton type="submit">로그인</S.SubmitButton>

            <S.Divider>
              <S.DividerLine />
              <S.DividerText>또는</S.DividerText>
              <S.DividerLine />
            </S.Divider>

            <S.SocialButtons>
              <S.SocialButton
                type="button"
                $variant="kakao"
                onClick={handleKakaoLogin}>
                <S.SocialIcon>💬</S.SocialIcon>
                카카오 로그인
              </S.SocialButton>

              <S.SocialButton
                type="button"
                $variant="naver"
                onClick={handleNaverLogin}>
                <S.SocialIcon>N</S.SocialIcon>
                네이버 로그인
              </S.SocialButton>
            </S.SocialButtons>

            <S.LinkContainer>
              <S.LinkText>
                계정이 없으신가요?{" "}
                <S.StyledLink to="/auth/signup">회원가입</S.StyledLink>
              </S.LinkText>
            </S.LinkContainer>

            <S.LinkContainer>
              <S.LinkText>
                비밀번호를 잊으셨나요?{" "}
                <S.StyledLink to="/auth/findPassword">
                  비밀번호 찾기
                </S.StyledLink>
              </S.LinkText>
            </S.LinkContainer>
          </S.Form>
        </S.FormCard>
      </S.MainContent>
    </div>
  );
};

export default MemberLoginContainer;
