import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { Link } from "react-router-dom";

export type AuthFormSpacing = "responsive" | "regular";

export const AuthForm = styled.form<{ $spacing?: AuthFormSpacing }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem;
  gap: ${({ $spacing = "responsive" }) =>
    $spacing === "responsive" ? "clamp(2rem, 5dvh, 5rem)" : "3rem"};
`;

export const AuthFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;

  > div {
    width: 100%;
  }
`;

export const AuthActionGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export const AuthHelpLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

export const AuthHelpLink = styled(Link)`
  ${font.caption.medium};
  color: ${({ theme }) => theme.label.neutral};
  text-decoration: underline;
  cursor: pointer;
`;
