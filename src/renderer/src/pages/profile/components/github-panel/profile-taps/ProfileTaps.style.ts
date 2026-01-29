import styled from "styled-components";
import { font } from "@/shared/config/font";

export const Wrapper = styled.div`
  width: 39rem;
`;

export const TabRow = styled.div`
  width: 15rem;
  display: flex;
  gap: 1.75rem;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  ${font.title2.medium};
  color: ${({ $active, theme }) => ($active ? theme.label.normal : theme.label.assistive)};
  padding: 0;
`;

export const Underline = styled.div`
  position: relative;
  width: 39rem;
  height: 0.25rem;
  margin-top: 0.75rem;
  background: ${({ theme }) => theme.line.neutral};
  border-radius: 6.25rem;
`;

export const Indicator = styled.div<{ $active: "github" | "item" | "time" }>`
  position: absolute;
  height: 0.25rem;
  width: 5.75rem;
  background: ${({ theme }) => theme.primary.normal};
  border-radius: 6.25rem;

  transform: ${({ $active }) => {
    if ($active === "github") return "translateX(0)";
    if ($active === "item") return "translateX(5.75rem)";
    return "translateX(11.5rem)";
  }};
  transition: transform 200ms ease;
`;
