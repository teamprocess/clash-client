import styled from "styled-components";
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

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24rem;
  gap: 1rem;
`;
