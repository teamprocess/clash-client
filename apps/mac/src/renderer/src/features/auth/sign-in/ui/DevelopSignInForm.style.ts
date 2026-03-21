import styled from "styled-components";
import { palette } from "@clash/design-tokens/theme";
import { font } from "@clash/design-tokens/font";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 24rem;
  gap: 1rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const Label = styled.label`
  ${font.headline2.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.label.disable};
  color: ${({ theme }) => theme.label.normal};
  ${font.body.medium};

  &::placeholder {
    color: ${({ theme }) => theme.label.assistive};
  }
`;

export const Title = styled.h1`
  ${font.title1.medium};
  color: ${({ theme }) => theme.label.neutral};
  margin: 0;
`;

export const Description = styled.p`
  ${font.body.regular};
  color: ${({ theme }) => theme.label.alternative};
  margin: 0;
  text-align: center;
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
  width: 24rem;
  gap: 1rem;
`;
