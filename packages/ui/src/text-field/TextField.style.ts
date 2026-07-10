import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";

export type TextFieldSize = "md" | "lg";
export type TextFieldSurface = "alternative" | "normal" | "neutral";

interface TextFieldStyleProps {
  $invalid: boolean;
  $inputSize: TextFieldSize;
  $surface: TextFieldSurface;
}

const sizeStyleMap = {
  md: css`
    height: 3rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
  `,
  lg: css`
    height: 3.5rem;
    padding: 0 1.5rem;
    border-radius: 1rem;
  `,
} as const;

export const TextFieldRoot = styled.input<TextFieldStyleProps>`
  ${font.body.medium};
  box-sizing: border-box;
  width: 100%;
  border: none;
  outline: none;
  color: ${({ theme, $surface }) =>
    $surface === "neutral" ? theme.label.normal : theme.label.neutral};
  background-color: ${({ theme, $surface }) => {
    if ($surface === "normal") return theme.background.normal;
    if ($surface === "neutral") return theme.fill.neutral;
    return theme.background.alternative;
  }};
  box-shadow: ${({ theme, $invalid }) =>
    $invalid ? `inset 0 0 0 1px ${theme.feedback.danger}` : "none"};
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  ${({ $inputSize }) => sizeStyleMap[$inputSize]}

  &::placeholder {
    color: ${({ theme }) => theme.label.alternative};
  }

  &:focus {
    background-color: ${({ theme, $surface }) =>
      $surface === "neutral" ? theme.fill.neutral : theme.background.neutral};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
