import styled from "styled-components";
import Arrow from "@/features/shop/assets/arrow.svg";
import { font } from "@clash/design-tokens/font";

export const FilterContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem 1rem;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
  box-sizing: border-box;
`;

export const FilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  min-width: 0;
`;

export const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const Select = styled.select`
  ${font.body.regular};
  width: 8.5rem;
  height: 2rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  color: ${({ theme }) => theme.label.normal};
  border: none;
  appearance: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 0.75rem;
  &:focus {
    outline: none;
  }
`;
