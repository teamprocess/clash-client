import * as S from "./TutorialModal.style";
import { Modal } from "@/shared/ui/modal/Modal";
import { tutorialData, TutorialData } from "../mocks/tutorialData";
import { useTutorial } from "../model/useTutorial";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  tutorial?: TutorialData;
  title?: string;
}

export const TutorialModal = ({
  isOpen,
  onClose,
  onStart,
  tutorial = tutorialData[0],
}: TutorialModalProps) => {
  const { currentStep, activeStep, totalSteps, handlePrev, handleNext } = useTutorial(tutorial);

  return (
    <Modal width={74} height={48} isOpen={isOpen} onClose={onClose}>
      <S.TutorialModalWrapper>
        <S.TutorialModalTop>
          <S.TutorialModalIntro>
            <S.TutorialModalTitle>{tutorial.title}</S.TutorialModalTitle>
            <S.TutorialModalInfo>
              <S.TutorialModalDescription>{tutorial.intro}</S.TutorialModalDescription>
              <S.TutorialModalAction onClick={onStart}>시작하기</S.TutorialModalAction>
            </S.TutorialModalInfo>
          </S.TutorialModalIntro>
          <S.SectionDivider $type="Tutorial" />
        </S.TutorialModalTop>

        <S.TutorialModalBottom>
          <S.TutorialModalHead>
            <S.CheckIcon />
            <S.TutorialModalHeadLabel>
              목표 달성을 위한 전략적 경로를 시각적으로 표현한 계획으로, 스텝을 하나하나 따라가다
              보면 목표에 도달할 수 있어요.
            </S.TutorialModalHeadLabel>
          </S.TutorialModalHead>

          <S.TutorialModalBody>
            <S.RoadmapBox>
              <S.RoadmapTop>
                <S.RoadmapIcon />
                <S.RoadmapTitle>한눈에 보는 로드맵</S.RoadmapTitle>
              </S.RoadmapTop>

              <S.RoadmapBottom>
                <S.RoadmapSteps>
                  {tutorial.steps.map(step => (
                    <S.StepWrapper key={step.id}>
                      <S.StepCircle $active={step.id === currentStep}>{step.id}</S.StepCircle>
                      {step.id === currentStep && <S.StepTooltip>{step.tooltip}</S.StepTooltip>}
                    </S.StepWrapper>
                  ))}
                  <S.StepCircle>
                    <S.StepFlag />
                  </S.StepCircle>
                </S.RoadmapSteps>

                <S.RoadmapDescriptionBox>
                  <S.RoadmapNumberBox>
                    <S.StepTitle>Step</S.StepTitle>
                    <S.RoadmapNumber>{String(activeStep?.id).padStart(2, "0")}</S.RoadmapNumber>
                  </S.RoadmapNumberBox>
                  <S.RoadmapDescription>{activeStep?.description}</S.RoadmapDescription>
                </S.RoadmapDescriptionBox>

                <S.RoadmapStepBox>
                  <S.ArrowButton onClick={handlePrev} $disabled={currentStep === 1}>
                    <S.ArrowIcon $direction="left" />
                  </S.ArrowButton>
                  <S.StepLabel>
                    <S.CurrentStepLabel>{currentStep}</S.CurrentStepLabel>/
                    <S.TotalStepLabel>{totalSteps}</S.TotalStepLabel>
                  </S.StepLabel>
                  <S.ArrowButton onClick={handleNext} $disabled={currentStep === totalSteps}>
                    <S.ArrowIcon $direction="right" />
                  </S.ArrowButton>
                </S.RoadmapStepBox>
              </S.RoadmapBottom>
            </S.RoadmapBox>

            <S.TargetBox>
              <S.TargetBoxTop>
                <S.TargetBoxIntro>
                  <S.TargetLabel>로드맵 목표</S.TargetLabel>
                  <S.TargetTitle>{tutorial.title}</S.TargetTitle>
                </S.TargetBoxIntro>
                <S.SectionDivider $type="Target" />
              </S.TargetBoxTop>

              <S.TargetBoxList>
                {tutorial.targets.map((text, idx) => (
                  <S.TargetItem key={idx}>
                    <S.TargetStarWrapper>
                      <S.TargetStar />
                    </S.TargetStarWrapper>
                    <S.TargetItemText>{text}</S.TargetItemText>
                  </S.TargetItem>
                ))}
              </S.TargetBoxList>
            </S.TargetBox>
          </S.TutorialModalBody>
        </S.TutorialModalBottom>
      </S.TutorialModalWrapper>
    </Modal>
  );
};
