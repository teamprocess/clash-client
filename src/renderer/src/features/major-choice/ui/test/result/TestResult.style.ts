import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
import Web from "../../../assets/web.svg";
import Server from "../../../assets/server.svg";

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
`;

export const ResultContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.25rem;
`;

export const ResultContentsTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

export const ResultTitle = styled.h1`
  ${font.display1.bold};
  color: ${({ theme }) => theme.label.normal};
`;

export const ResultDescription = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${font.body.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

export const WebIcon = styled(Web)``;

export const ServerIcon = styled(Server)``;

export const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 0 6px 0 ${({ theme }) => theme.primary.normal};
  width: 11.5rem;
  height: 13rem;
  border-radius: 0.875rem;
`;

export const ResultMajor = styled.span`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button<{ $buttonType: "retry" | "start" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.headline1.medium};
  color: ${({ theme, $buttonType }) =>
    $buttonType === "retry" ? theme.label.assistive : palette.neutral[97]};
  background-color: ${({ theme, $buttonType }) =>
    $buttonType === "retry" ? theme.label.disable : theme.primary.normal};
  width: 10rem;
  height: 3.5rem;
  border-radius: 1rem;
  cursor: pointer;
`;
