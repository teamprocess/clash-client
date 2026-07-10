import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import {
  AuthActionGroup,
  AuthFieldGroup,
  AuthForm,
  AuthHelpLink,
  AuthHelpLinks,
} from "@/features/auth/ui/form-layout/AuthFormLayout.style";

export const FormContainer = styled(AuthForm).attrs({ $spacing: "regular" })``;

export const StatusContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem;
  gap: 3rem;
  box-sizing: border-box;
  margin-bottom: 3rem;
`;

export const TopActionButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 999px;
  background: transparent;
  padding: 0;
  color: ${({ theme }) => theme.label.neutral};
  cursor: pointer;
`;

export const TopActionIcon = styled.svg`
  width: 2rem;
  height: 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  text-align: center;
`;

export const Title = styled.span`
  ${font.title1.bold};
  color: ${({ theme }) => theme.label.neutral};
`;

export const Description = styled.p`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const SubMessage = styled.p`
  ${font.caption.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

export const InputBox = AuthFieldGroup;
export const ButtonWrapper = AuthActionGroup;
export const HelpTextBox = AuthHelpLinks;
export const HelpText = AuthHelpLink;

export const ActionButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  ${font.caption.medium};
  text-decoration: underline;
  color: ${({ theme }) => theme.label.neutral};
  cursor: pointer;
`;
