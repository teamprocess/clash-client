import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { Link } from "react-router-dom";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem;
  gap: clamp(2rem, 5dvh, 5rem);
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;

  > div {
    width: 100%;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 24rem;

  > input {
    padding-right: 7rem;
  }
`;

export const Input = styled.input`
  border-radius: 1rem;
  width: 100%;
  max-width: 24rem;
  height: 3.5rem;
  padding: 0 1.5rem;
  ${font.body.medium}
  color: ${({ theme }) => theme.label.neutral};
  background-color: ${({ theme }) => theme.background.alternative};
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.label.alternative};
  }
`;

export const VerifyButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  ${font.caption.medium};
  color: ${({ theme }) => theme.action.primary.foreground};
  background-color: ${({ theme }) => theme.action.primary.background};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SuccessMessage = styled.span`
  ${font.caption.medium};
  color: ${({ theme }) => theme.feedback.success};
  margin-top: 0.5rem;
  display: block;
`;

export const ErrorText = styled.span`
  ${font.caption.medium};
  color: ${({ theme }) => theme.feedback.danger};
  margin-top: 0.5rem;
  display: block;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  max-width: 24rem;
  padding: 1rem 0;
  border-radius: 1rem;
  border: none;
  color: ${({ theme }) => theme.action.primary.foreground};
  background-color: ${({ theme }) => theme.action.primary.background};
  ${font.headline2.medium};
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const HelpTextContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const HelpText = styled(Link)`
  ${font.caption.medium};
  text-decoration: underline;
  color: ${({ theme }) => theme.label.neutral};
  cursor: pointer;
`;
