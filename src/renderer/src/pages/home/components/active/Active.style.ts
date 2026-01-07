import styled from "styled-components";
import { font } from "@/shared/config/font";

export const ActiveContainer = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const Title = styled.div`
  ${font.title2.bold}
`;
