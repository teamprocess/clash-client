import styled from "styled-components";
import Clash from "../assets/clash-logo.svg";

export const ResetPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.background.alternative};
`;

export const ResetPasswordFormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  height: 80%;
  width: 34rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const ClashLogo = styled(Clash)`
  width: 14rem;
  height: 3rem;
`;
