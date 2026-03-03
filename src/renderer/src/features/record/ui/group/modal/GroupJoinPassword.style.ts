import styled from "styled-components";
import { font } from "@/shared/config/font";

export const PasswordDialogBody = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const PasswordDialogDescription = styled.p`
  margin-top: 0.5rem;
  ${font.body.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const PasswordInput = styled.input`
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  outline: none;
  ${font.body.medium};
  color: ${({ theme }) => theme.label.normal};
  background-color: ${({ theme }) => theme.label.disable};

  &::placeholder {
    color: ${({ theme }) => theme.label.assistive};
  }
`;

export const PasswordErrorText = styled.p`
  margin-top: 0.5rem;
  ${font.label.medium};
  color: ${({ theme }) => theme.primary.normal};
`;
