import styled from "styled-components";
import { palette } from "@/shared/config/theme";
import { font } from "@/shared/config/font";
import { Link } from "react-router-dom";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 3rem;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
  width: 24rem;
  gap: 1rem;
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
