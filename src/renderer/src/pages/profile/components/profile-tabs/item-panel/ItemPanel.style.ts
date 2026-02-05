import styled from "styled-components";
import { font } from "@/shared/config/font";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
`;

export const TitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.p`
  ${font.title1.medium}
`;

export const Body = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
`;
