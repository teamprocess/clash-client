import styled from "styled-components";
import {
  AuthActionGroup,
  AuthFieldGroup,
  AuthForm,
  AuthHelpLink,
  AuthHelpLinks,
} from "@/features/auth/ui/form-layout/AuthFormLayout.style";

export const FormContainer = styled(AuthForm).attrs({ $spacing: "responsive" })``;
export const InputBox = AuthFieldGroup;
export const ButtonWrapper = AuthActionGroup;
export const HelpTextBox = AuthHelpLinks;
export const HelpText = AuthHelpLink;
