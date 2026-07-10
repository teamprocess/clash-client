import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import {
  AuthActionGroup,
  AuthFieldGroup,
  AuthForm,
  AuthHelpLink,
  AuthHelpLinks,
} from "@/features/auth/ui/form-layout/AuthFormLayout.style";

export const FormContainer = styled(AuthForm).attrs({ $spacing: "responsive" })``;
export const InputBox = AuthFieldGroup;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 24rem;

  > input {
    padding-right: 7rem;
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

export const ButtonWrapper = AuthActionGroup;
export const HelpTextContainer = AuthHelpLinks;
export const HelpText = AuthHelpLink;
