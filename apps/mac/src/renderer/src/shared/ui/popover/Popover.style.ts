import styled from "styled-components";

const resolveOffsetValue = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

export const PopoverContainer = styled.div<{
  $minWidth: number | string;
}>`
  position: fixed;
  top: 0;
  left: 0;
  min-width: ${({ $minWidth }) => resolveOffsetValue($minWidth)};
  max-width: calc(100vw - 1rem);
  max-height: 0;
  visibility: hidden;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.background.normal};
  border: 1px solid ${({ theme }) => theme.line.alternative};
  border-radius: 0.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  z-index: 900;

  & > * {
    max-width: 100%;
  }
`;
