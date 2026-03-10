import styled from "styled-components";

const resolveOffsetValue = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

export const PopoverContainer = styled.div<{
  $align: "start" | "end";
  $offset: number;
  $alignOffset: number | string;
  $minWidth: number | string;
}>`
  position: absolute;
  top: calc(100% + ${({ $offset }) => $offset}px);
  ${({ $align, $alignOffset }) =>
    $align === "end"
      ? `right: ${resolveOffsetValue($alignOffset)};`
      : `left: ${resolveOffsetValue($alignOffset)};`}
  min-width: ${({ $minWidth }) => resolveOffsetValue($minWidth)};
  background-color: ${({ theme }) => theme.label.disable};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 10;
`;
