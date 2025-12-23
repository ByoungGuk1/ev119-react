import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  padding: 40px 24px 30px;
  text-align: center;
  background-color: #fafafa;
`;

export const Logo = styled(Link)`
  font-size: 48px;
  font-weight: 800;
  color: #cd0b16;
  margin: 0 0 8px 0;
  letter-spacing: -2px;
  text-decoration: none;
  display: inline-block;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 0;
  font-weight: 500;
`;

export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 24px 40px;
  box-sizing: border-box;
`;

export const FormCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 32px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #333333;
  margin: 0 0 8px 0;
  text-align: center;
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 0 0 32px 0;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333333;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-size: 15px;
  color: #333333;
  background-color: #ffffff;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &::placeholder {
    color: #999999;
  }

  &:focus {
    outline: none;
    border-color: #cd0b16;
    background-color: #fafafa;
  }
`;

export const FieldError = styled.div`
  font-size: 12px;
  color: #cd0b16;
  margin-top: -4px;
`;

export const ErrorMessage = styled.div`
  padding: 12px;
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  font-size: 14px;
  color: #cd0b16;
  text-align: center;
`;

export const InfoMessage = styled.div`
  padding: 12px;
  background-color: #e8f5e9;
  border: 1px solid #c8e6c9;
  border-radius: 8px;
  font-size: 14px;
  color: #1b5e20;
  text-align: center;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, #cd0b16 0%, #c30d16 50%, #b80f16 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: linear-gradient(135deg, #b80f16 0%, #b00d14 50%, #a50f14 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(195, 13, 22, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const DividerText = styled.span`
  font-size: 13px;
  color: #999999;
`;

export const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SocialButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${(props) => {
    if (props.$variant === "kakao") return "#FEE500";
    if (props.$variant === "naver") return "#03C75A";
    return "#FFFFFF";
  }};
  color: ${(props) => {
    if (props.$variant === "kakao") return "#000000";
    if (props.$variant === "naver") return "#FFFFFF";
    return "#333333";
  }};
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SocialIcon = styled.span`
  font-size: 18px;
`;

export const LinkContainer = styled.div`
  text-align: center;
  margin-top: 5px;
`;

export const LinkText = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 0;
`;

export const StyledLink = styled(Link)`
  color: #cd0b16;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;

  ${SubmitButton} {
    flex: 1;
    margin-top: 8px;
  }
`;

export const GhostButton = styled.button`
  height: 52px;
  margin-top: 8px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  color: #333333;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const TextButton = styled.button`
  border: none;
  background: transparent;
  color: #cd0b16;
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LoginTypeButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  height: auto;
`;

export const LoginTypeButton = styled.button`
  width: 100%;
  min-height: 160px;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  color: #333333;
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #cd0b16 0%, #c30d16 50%, #b80f16 100%);
    border-color: #cd0b16;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(195, 13, 22, 0.35);
    color: #ffffff;

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(195, 13, 22, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    min-height: 140px;
    padding: 20px;
  }
`;

export const LoginTypeText = styled.div`
  font-size: 32px;
  font-weight: 700;
  transition: color 0.3s ease;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const LoginTypeArrow = styled.div`
  font-size: 32px;
  transition: transform 0.3s ease, color 0.3s ease;
  line-height: 1;

  ${LoginTypeButton}:hover & {
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;
