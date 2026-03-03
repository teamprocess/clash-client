import styled from "styled-components";
import NotFound from "./assets/404.svg";
import { font } from "@/shared/config/font";
import { Link } from "react-router-dom";
import { palette } from "@/shared/config/theme";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  height: 100vh;
  width: 100%;
`;

export const NotFoundInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const NotFoundIcon = styled(NotFound)``;

export const NotFoundText = styled.h1`
  ${font.display2.medium}
  color: ${({ theme }) => theme.label.strong};
`;

export const LinkToMain = styled(Link)`
  background-color: ${({ theme }) => theme.primary.normal};
  color: ${palette.neutral[97]};
  padding: 0.75rem 5rem;
  border-radius: 1rem;
`;
