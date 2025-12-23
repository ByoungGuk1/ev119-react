import { useState, useEffect, useRef } from "react";
import MemberLoginContainer from "./MemberLoginContainer";
import * as S from "./style";
import StaffLoginContainer from "./StaffLoginContainer";

const Login = () => {
  const [viewType, setViewType] = useState("");
  const viewTypeRef = useRef("");
  const hasPushedState = useRef(false);

  useEffect(() => {
    viewTypeRef.current = viewType;
  }, [viewType]);

  useEffect(() => {
    if (viewType && !hasPushedState.current) {
      window.history.pushState({ viewType }, "");
      hasPushedState.current = true;
    } else if (!viewType) {
      hasPushedState.current = false;
    }
  }, [viewType]);

  useEffect(() => {
    const handlePopState = () => {
      if (viewTypeRef.current) {
        setViewType("");
        hasPushedState.current = false;
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const setViewMemberHandler = () => {
    setViewType("MemberLogin");
  };

  const setViewStaffHandler = () => {
    setViewType("StaffLogin");
  };

  return (
    <S.Container>
      <S.Header>
        <S.Logo to="/">EV119</S.Logo>
        <S.Subtitle>응급실 정보 서비스</S.Subtitle>
      </S.Header>

      {viewType === "MemberLogin" ? (
        <MemberLoginContainer />
      ) : viewType === "StaffLogin" ? (
        <StaffLoginContainer />
      ) : (
        <S.MainContent>
          <S.FormCard>
            <S.LoginTypeButtonWrapper>
              <S.LoginTypeButton onClick={setViewMemberHandler}>
                <S.LoginTypeText>일반</S.LoginTypeText>
                <S.LoginTypeArrow>→</S.LoginTypeArrow>
              </S.LoginTypeButton>
              <S.LoginTypeButton onClick={setViewStaffHandler}>
                <S.LoginTypeText>의료진</S.LoginTypeText>
                <S.LoginTypeArrow>→</S.LoginTypeArrow>
              </S.LoginTypeButton>
            </S.LoginTypeButtonWrapper>
          </S.FormCard>
        </S.MainContent>
      )}
    </S.Container>
  );
};

export default Login;
