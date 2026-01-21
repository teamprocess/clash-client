import styled from "styled-components";
import { palette } from "@/shared/config/theme";
import { font } from "@/shared/config/font";
import { Link } from "react-router-dom";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 5rem;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Input = styled.input`
  border-radius: 1rem;
  width: 24rem;
  height: 3.5rem;
  padding: 0 1.5rem;
  ${font.body.medium}
  color: ${({ theme }) => theme.label.neutral};
  background-color: ${({ theme }) => theme.background.alternative};
  border: none;
  outline: none;
`;

export const ErrorText = styled.span`
  ${font.caption.medium};
  color: ${palette.red[60]};
  margin-top: 0.5rem;
  display: block;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const SubmitButton = styled.button`
  width: 24rem;
  padding: 1rem 0;
  border-radius: 1rem;
  border: none;
  color: ${palette.neutral[97]};
  background-color: ${({ theme }) => theme.primary.normal};
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
`;
