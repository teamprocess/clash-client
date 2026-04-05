import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
`;

export const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.label.normal};
  ${font.title1.bold};
  margin: 0;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12.75rem, 1fr));
  gap: 1rem;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;
