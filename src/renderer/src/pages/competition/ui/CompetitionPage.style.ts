import styled from "styled-components";
import { font } from "@/shared/config/font";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CompetitionTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0.25rem;
  gap: 0.25rem;
  background: ${({ theme }) => theme.background.normal};
  border-radius: 0.75rem;
`;

export const WitchCompete = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  ${font.headline1.bold}
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.fill.alternative : "transparent"};
  color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  cursor: pointer;
`;
