import styled from "styled-components";
import { font } from "@/shared/config/font";

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  height: 100%;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

export const Tab = styled.div<{ $isActive: boolean }>`
  ${font.title1.medium};
  color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
`;

export const Hr = styled.div`
  height: 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const GroupEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  height: 100%;
  width: 100%;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;
