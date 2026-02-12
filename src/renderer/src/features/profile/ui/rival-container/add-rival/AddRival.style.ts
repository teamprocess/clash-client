import styled from "styled-components";
import { font } from "@/shared/config/font";

export const AddBox = styled.button`
  width: 21rem;
  height: 5.375rem;
  background: ${({ theme }) => theme.background.alternative};
  border: none;
  border-radius: 0.75rem;
  padding: 1rem;
  cursor: pointer;

  ${font.title1.bold};
  color: ${({ theme }) => theme.label.neutral};
  &:hover {
    filter: brightness(1.1);
  }
`;
