import styled from "styled-components";
import Arrow from "@/features/shop/assets/arrow.svg";
import { font } from "@/shared/config/font";
import Search from "@/features/shop/assets/search.svg";

export const FilterContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.line.neutral};
  box-sizing: border-box;
`;

export const FilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
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

export const SearchBox = styled.div`
  display: flex;
  width: 14.5rem;
  height: 2.25rem;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.fill.neutral};
`;

export const SearchInput = styled.input`
  width: 10.75rem;
  overflow: hidden;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.label.assistive};
  ${font.body.regular};
  &:focus {
    outline: none;
  }
`;

export const SearchIcon = styled(Search)`
  cursor: pointer;
`;
