import styled from "styled-components";
import { font } from "@/shared/config/font";
import Test from "./assets/test.svg";
import Choice from "./assets/choice.svg";
import Check from "./assets/check.svg";
import NotCheck from "./assets/notCheck.svg";
import { palette } from "@/shared/config/theme";

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
  gap: 5.5rem;
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
  gap: 3.25rem;
  width: 26rem;
  height: 13rem;
`;

export const ChoiceBox = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 0.75rem;
  box-shadow: 0 0 6px 0
    ${({ $isSelected, theme }) => ($isSelected ? theme.primary.normal : theme.line.normal)};
  width: 11.625rem;
  height: 13rem;
  cursor: pointer;
`;

export const ChoiceItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 7.375rem;
`;

export const CheckedIcon = styled(Check)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  border-radius: 50%;
  width: 1.75rem;
  height: 1.75rem;
`;

export const NotCheckedIcon = styled(NotCheck)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  border-radius: 50%;
  width: 1.75rem;
  height: 1.75rem;
`;

export const TestIcon = styled(Test)``;

export const ChoiceIcon = styled(Choice)``;

export const ChoiceText = styled.span`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const RoadMapButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32rem;
  height: 3.25rem;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.primary.normal : theme.line.normal};
  ${font.headline1.medium};
  color: ${palette.neutral["97"]};
  border-radius: 1rem;
  cursor: ${({ $isSelected }) => ($isSelected ? "pointer" : "default")};
`;
