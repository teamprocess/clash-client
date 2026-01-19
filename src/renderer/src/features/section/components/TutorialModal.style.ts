import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const TutorialModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 3rem 5rem;
`;

export const TutorialModalTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export const TutorialModalIntro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

export const TutorialModalTitle = styled.span`
  ${font.display1.bold}
  color: ${({ theme }) => theme.label.normal};
  width: 100%;
  text-align: start;
`;

export const TutorialModalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const TutorialModalDescription = styled.p`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const TutorialModalAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.label.medium}
  color: ${palette.neutral["99"]};
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: 0.25rem;
  padding: 0.5rem 2.5rem;
`;

export const SectionDivider = styled.div`
  background-color: ${({ theme }) => theme.line.neutral};
  width: 100%;
  height: 0.1rem;
`;
