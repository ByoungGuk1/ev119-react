import styled from "styled-components";
import { Link } from "react-router-dom";

/* ========= Page Shell ========= */
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.header`
  padding: 40px 24px 26px;
  text-align: center;
  background-color: #fafafa;
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
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

export const TopActions = styled.div`
  margin-top: 18px;
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 18px 24px 40px;
  box-sizing: border-box;

  @media (max-width: 520px) {
    padding: 14px 16px 36px;
  }
`;

export const Footer = styled.footer`
  padding: 16px 24px 26px;
  text-align: center;
  color: #999999;
  font-size: 12px;
`;

export const FooterText = styled.div``;

/* ========= Buttons ========= */
export const GhostButton = styled.button`
  height: 48px;
  padding: 0 14px;
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

export const RowButton = styled.button`
  height: 38px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  color: #333333;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  ${({ $variant }) =>
    $variant === "ok"
      ? `
        border-color: rgba(27, 94, 32, 0.25);
        background-color: #e8f5e9;
        color: #1b5e20;
      `
      : $variant === "bad"
      ? `
        border-color: rgba(205, 11, 22, 0.25);
        background-color: #ffebee;
        color: #cd0b16;
      `
      : $variant === "ghost"
      ? `
        background-color: #fafafa;
      `
      : ``}
`;

export const PrimaryBtn = styled.button`
  height: 48px;
  padding: 0 14px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #cd0b16 0%, #c30d16 50%, #b80f16 100%);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #b80f16 0%, #b00d14 50%, #a50f14 100%);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(195, 13, 22, 0.28);
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

export const DangerBtn = styled(PrimaryBtn)``;

/* ========= KPI ========= */
export const KpiGrid = styled.section`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 12px;

  @media (min-width: 760px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const KpiCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);

  ${({ $accent }) =>
    $accent === "warn"
      ? `border-color: rgba(255, 193, 7, 0.35);`
      : $accent === "ok"
      ? `border-color: rgba(27, 94, 32, 0.25);`
      : $accent === "bad"
      ? `border-color: rgba(205, 11, 22, 0.25);`
      : ``}
`;

export const KpiLabel = styled.div`
  font-size: 12px;
  color: #666666;
  font-weight: 600;
`;

export const KpiValue = styled.div`
  margin-top: 8px;
  font-size: 22px;
  font-weight: 800;
  color: #333333;
`;

/* ========= Panel ========= */
export const Panel = styled.section`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 18px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const PanelTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #333333;
  margin-bottom: 12px;
`;

/* ========= Filters ========= */
export const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 220px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 44px 0 16px;
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

export const SearchIcon = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  opacity: 0.7;
`;

export const Select = styled.select`
  height: 48px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  color: #333333;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  min-width: 140px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #cd0b16;
    background-color: #fafafa;
  }
`;

export const SmallHint = styled.div`
  font-size: 13px;
  color: #666666;

  b {
    font-weight: 800;
    color: #333333;
  }
`;

/* ========= Table ========= */
export const TableWrap = styled.div`
  margin-top: 10px;
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 860px;
  background-color: #ffffff;

  thead tr {
    background-color: #fafafa;
  }

  tbody tr {
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  tbody tr:hover {
    background-color: rgba(205, 11, 22, 0.04);
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px 12px;
  font-size: 12px;
  color: #666666;
  white-space: nowrap;

  ${({ $clickable }) =>
    $clickable
      ? `
        cursor: pointer;
        user-select: none;
        &:hover { color: #333333; }
      `
      : ``}
`;

export const Td = styled.td`
  padding: 12px 12px;
  font-size: 13px;
  color: #333333;
  white-space: nowrap;
`;

export const Empty = styled.div`
  padding: 18px 0;
  text-align: center;
  color: #666666;
`;

/* ========= Cells ========= */
export const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #cd0b16;
  background-color: rgba(205, 11, 22, 0.08);
  border: 1px solid rgba(205, 11, 22, 0.14);
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  color: #333333;

  ${({ $status }) =>
    $status === "PENDING"
      ? `
        border-color: rgba(255, 193, 7, 0.35);
        background-color: rgba(255, 193, 7, 0.12);
        color: #8a6d00;
      `
      : $status === "APPROVED"
      ? `
        border-color: rgba(27, 94, 32, 0.25);
        background-color: #e8f5e9;
        color: #1b5e20;
      `
      : $status === "REJECTED"
      ? `
        border-color: rgba(205, 11, 22, 0.25);
        background-color: #ffebee;
        color: #cd0b16;
      `
      : ``}
`;

export const RowActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

/* ========= Pagination ========= */
export const Pagination = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const PageBtn = styled(GhostButton)`
  height: 44px;
`;

export const PageInfo = styled.div`
  font-size: 13px;
  color: #666666;
  font-weight: 600;
`;

/* ========= Modal ========= */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 999;
`;

export const Modal = styled.div`
  width: min(560px, 100%);
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.18);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background: #fafafa;
`;

export const ModalTitle = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: #333333;
`;

export const ModalClose = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  color: #666666;

  &:hover {
    color: #333333;
  }
`;

export const ModalBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  span {
    font-size: 12px;
    color: #666666;
    font-weight: 600;
  }

  b {
    font-size: 13px;
    color: #333333;
    font-weight: 800;
  }
`;

export const ModalHint = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #999999;
  line-height: 1.5;
`;

export const ModalFooter = styled.div`
  padding: 14px 16px 16px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
`;

/* ========= Login-only ========= */
export const Header = styled.header`
  padding: 40px 24px 30px;
  text-align: center;
  background-color: #fafafa;
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

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const AdminHint = styled.div`
  font-size: 12px;
  color: #999999;
  text-align: center;
  margin-top: -6px;
  line-height: 1.4;
`;

