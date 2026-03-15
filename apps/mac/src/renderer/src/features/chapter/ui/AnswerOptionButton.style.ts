import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const AnswerOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 3.5rem;
  padding: 0.9rem 1rem;
  border-radius: 0.85rem;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.primary.normal : theme.line.alternative)};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.fill.normal : theme.background.alternative};
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
  text-align: left;
  line-height: 1.5;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary.normal};
    transform: translateY(-1px);
  }
`;
