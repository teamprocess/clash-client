import styled from "styled-components";
import Test from "../assets/test.svg";
import Choice from "../assets/choice.svg";
import Check from "../assets/check.svg";
import NotCheck from "../assets/notCheck.svg";
import { palette } from "@/shared/config/theme";
import { font } from "@/shared/config/font";

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
