import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const EmailVerifyBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const EmailVerifyTitle = styled.span`
  ${font.headline2.medium};
  color: ${({ theme }) => theme.label.neutral};
  justify-self: flex-start;
`;

export const EmailVerifySubTitle = styled.p`
  ${font.headline2.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const UserEmail = styled.span`
  color: ${({ theme }) => theme.label.assistive};
`;

export const CodeInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  width: 100%;
  max-width: 24rem;
  gap: clamp(0.25rem, 2vw, 0.75rem);
`;

export const CodeInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 4rem;
  border-radius: 0.75rem;
  border: 2px solid ${({ theme }) => theme.line.normal};
  background-color: ${({ theme }) => theme.background.alternative};
  color: ${({ theme }) => theme.label.neutral};
  text-align: center;
  outline: none;
  transition: all 0.2s ease;
  ${font.title1.bold};

  &:focus {
    border-color: ${({ theme }) => theme.interaction.selectionBorder};
    background-color: ${({ theme }) => theme.background.normal};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;
