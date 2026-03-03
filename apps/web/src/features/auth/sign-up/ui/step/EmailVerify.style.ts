import styled from "styled-components";
import { font } from "@/shared/config/font";

export const EmailVerifyBox = styled.div`
  display: flex;
  flex-direction: column;
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
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

export const CodeInput = styled.input`
  width: 3.25rem;
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
    border-color: ${({ theme }) => theme.primary.normal};
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
