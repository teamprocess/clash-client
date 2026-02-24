import styled from "styled-components";
import { font } from "@/shared/config/font";

export const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const MenuBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  height: 3rem;
  width: 74.5rem;
  padding: 0.25rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const MenuButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.fill.alternative : "transparent"};
  color: ${({ theme }) => theme.label.normal};
  ${font.headline1.bold};
  cursor: pointer;
`;
