import styled from "styled-components";
import { font } from "@clash/design-tokens";

export const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  height: 3rem;
  width: 100%;
  padding: 0.25rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const HeaderItem = styled.button<{ $isActive: boolean }>`
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
