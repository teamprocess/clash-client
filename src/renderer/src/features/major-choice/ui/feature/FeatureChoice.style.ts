import styled from "styled-components";
import { palette } from "@/shared/config/theme";
import { font } from "@/shared/config/font";

export const RoadMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
`;

export const RoadMapContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
`;

export const RoadMapTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

export const RoadMapTitle = styled.h1`
  ${font.display1.bold};
  color: ${({ theme }) => theme.label.normal};
`;

export const RoadMapDescription = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${font.body.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

export const ChoiceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 26rem;
  height: 13rem;
`;

export const RoadMapButton = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32rem;
  height: 3.25rem;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.line.normal : theme.primary.normal};
  ${font.headline1.medium};
  color: ${palette.neutral["97"]};
  border-radius: 1rem;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;
