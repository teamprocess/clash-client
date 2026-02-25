import styled from "styled-components";
import { font } from "@/shared/config/font";
import Cry from "@/shared/ui/assets/cry-emoji.svg";

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
  grid-template-columns: repeat(auto-fill, minmax(13.5rem, 1fr));
  gap: 1rem;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

export const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.fill.neutral};
  border-radius: 0.5rem;
`;

export const CryIcon = styled(Cry)`
  width: 2.5rem;
  height: 2.5rem;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.label.alternative};
  ${font.body.regular};
`;
