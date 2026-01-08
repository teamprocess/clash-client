import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  gap: 3rem;
`;

export const QuestionTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const QuestionTitle = styled.span`
  ${font.display2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const QuestionSubTitle = styled.div`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.assistive}
`;

export const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const AnswerBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const ItemWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LabelBox = styled.div`
  display: flex;
  width: 100%;
`;

export const LabelWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AnswerItem = styled.div<{ $itemSize: string; $isActive: boolean }>`
  width: ${({ $itemSize }) =>
    $itemSize === "Large" ? "4rem" : $itemSize === "Medium" ? "3rem" : "2rem"};
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 4px solid
    ${({ theme, $isActive }) => ($isActive ? theme.primary.normal : theme.line.normal)};
  flex-shrink: 0;
  cursor: pointer;
`;

export const AnswerItemTitle = styled.div`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.alternative};
  text-align: center;
  white-space: nowrap;
`;

export const SubmitButton = styled.button<{ $isActive: boolean }>`
  width: 32rem;
  height: 3.75rem;
  cursor: ${props => (props.$isActive ? "pointer" : "not-allowed")};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary.normal : theme.line.normal};
  ${font.headline1.medium}
  color: ${palette.neutral[97]};
  border-radius: 1rem;
`;
