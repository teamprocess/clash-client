import styled from "styled-components";
import { palette } from "@clash/design-tokens/theme";
import { font } from "@clash/design-tokens/font";
import { Link } from "react-router-dom";

export const FormContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24rem;
  gap: 3rem;
`;

export const StatusContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24rem;
  gap: 3rem;
  padding-top: 2rem;
  box-sizing: border-box;
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
  width: 100%;
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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
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

export const ActionButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  ${font.caption.medium};
  text-decoration: underline;
  color: ${({ theme }) => theme.label.neutral};
  cursor: pointer;
`;
