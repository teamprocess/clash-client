import styled from "styled-components";
import { palette } from "@/shared/config/theme";
import { font } from "@/shared/config/font";
import { Link } from "react-router-dom";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

export const Title = styled.h1`
  ${font.title1.bold};
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
