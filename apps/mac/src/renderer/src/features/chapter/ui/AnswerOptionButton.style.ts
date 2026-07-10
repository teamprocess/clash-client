import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const AnswerOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 29rem);
  min-height: 4.2rem;
  padding: 0.95rem 1.25rem;
  border-radius: 0.9rem;
  border: 2px solid
    ${({ $selected, theme }) =>
      $selected ? theme.interaction.selectionBorder : theme.line.alternative};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.fill.alternative : theme.fill.normal};
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
  text-align: center;
  line-height: 1.45;
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.label.assistive};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
