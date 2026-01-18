import styled from "styled-components";
import { font } from "@/shared/config/font";

export const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  gap: 0.625rem;
  align-self: stretch;
`;

export const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.label.normal};
  ${font.title1.bold};
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;
