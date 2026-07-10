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
`;

export const HelpTextBox = styled.div`
  display: flex;
  gap: 1rem;
`;

export const HelpText = styled(Link)`
  ${font.caption.medium};
  text-decoration: underline;
  color: ${({ theme }) => theme.label.neutral};
  cursor: pointer;
`;
