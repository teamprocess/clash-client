import styled from "styled-components";
import { font } from "@/shared/config/font";

export const RoadMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
`;

export const RoadMapContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
`;

export const RoadMapTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

export const RoadMapTitle = styled.h1`
  ${font.display1.bold};
  color: ${({ theme }) => theme.label.normal};
`;

export const RoadMapDescription = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${font.body.medium};
  color: ${({ theme }) => theme.label.assistive};
`;
