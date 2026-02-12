import styled from "styled-components";
import { font } from "@/shared/config/font";
import Test from "@/features/major-choice/assets/test.svg";
import Choice from "@/features/major-choice/assets/choice.svg";

export const TestIcon = styled(Test)`
  width: 5rem;
`;

export const ChoiceIcon = styled(Choice)`
  width: 5rem;
`;

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
  width: 30rem;
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

export const ChoiceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 26rem;
  height: 13rem;
`;
