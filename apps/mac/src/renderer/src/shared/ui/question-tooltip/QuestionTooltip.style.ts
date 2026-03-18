import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const Trigger = styled.button`
  width: 1rem;
  height: 1rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.line.normal};
  border-radius: 2rem;
  background: transparent;
  color: ${({ theme }) => theme.label.assistive};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  cursor: help;
  transition: background-color 0.15s ease;
  ${font.caption.bold}
  line-height: 1;

  &:hover {
    background: ${({ theme }) => theme.fill.normal};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary.normal};
    outline-offset: 2px;
  }
`;
