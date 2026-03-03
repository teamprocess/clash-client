import styled from "styled-components";
import Clash from "../assets/clash-logo.svg";

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34rem;
  gap: 5rem;
`;

export const ClashLogo = styled(Clash)`
  width: 14rem;
  height: 3rem;
`;

export const RightContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.background.alternative};
`;
