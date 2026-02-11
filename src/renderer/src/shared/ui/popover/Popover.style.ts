import styled from "styled-components";

export const PopoverContainer = styled.div<{ $align: "start" | "end"; $offset: number }>`
  position: absolute;
  top: calc(100% + ${({ $offset }) => $offset}px);
  ${({ $align }) => ($align === "end" ? "right: 0;" : "left: 0;")}
  min-width: 7rem;
  background-color: ${({ theme }) => theme.label.disable};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 10;
`;
