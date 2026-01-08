import styled, { keyframes } from "styled-components";
import Loading from "../../../assets/loding.svg";
import { font } from "@/shared/config/font";

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const LoadingContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 32rem;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled(Loading)`
  animation: ${spin} 2s linear infinite;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const LoadingStatus = styled.span`
  ${font.display1.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const LoadingLabel = styled.span`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.assistive};
`;
