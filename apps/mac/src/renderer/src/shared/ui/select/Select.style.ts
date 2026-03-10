import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Arrow from "../assets/arrow.svg";

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  min-width: 0;
  cursor: pointer;
`;

export const Select = styled.select`
  ${font.body.regular};
  width: 7.5rem;
  max-width: 100%;
  height: 2rem;
  padding: 0 2.25rem 0 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  color: ${({ theme }) => theme.label.normal};
  border: none;
  appearance: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 0.75rem;

  &:focus {
    outline: none;
  }
`;

export const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
  pointer-events: none;
`;
