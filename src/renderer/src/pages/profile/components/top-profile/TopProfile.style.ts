import styled from "styled-components";
import { palette } from "@/shared/config/theme";
import { font } from "@/shared/config/font";

export const Banner = styled.div`
  width: 100%;
  height: 25%;
  border-radius: 16px;
  background: ${({ theme }) => theme.background.alternative};
  padding: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ButtonEdit = styled.button`
  width: 69px;
  height: 30px;
  background: ${({ theme }) => theme.line.normal};
  border-radius: 10px;
  color: ${palette.neutral[97]};
  ${font.label.medium};
`;

export const ButtonLogout = styled.button`
  width: 82px;
  height: 30px;
  background: ${({ theme }) => theme.primary.normal};
  border-radius: 10px;
  color: ${palette.neutral[97]};
  ${font.label.medium};
`;

export const Button = styled.div`
  display: flex;
  gap: 12px;
`;
