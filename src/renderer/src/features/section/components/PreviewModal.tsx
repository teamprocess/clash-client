import * as S from "./PreviewModal.style";
import { Dialog } from "@/shared/ui";
import { usePreview } from "../model/usePreview";
import { useState, useRef } from "react";
import { Button } from "@/shared/ui/button/Button";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  isLocked: boolean;
  sectionId: number;
}

export const PreviewModal = ({
  isOpen,
  onClose,
  onStart,
  isLocked,
  sectionId,
}: PreviewModalProps) => {
  const { previewData, loading, error, totalSteps } = usePreview(sectionId);

  const [currentStep, setCurrentStep] = useState(1);
  const [prevSectionId, setPrevSectionId] = useState(sectionId);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (prevSectionId !== sectionId) {
    setPrevSectionId(sectionId);
    setCurrentStep(1);
  }

  const activeStep = previewData?.steps.find(step => step.id === currentStep);

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);

    const container = stepsContainerRef.current;
    const stepEl = stepRefs.current[stepId - 1];
    if (!container || !stepEl) return;

    const containerWidth = container.clientWidth;
    const stepLeft = stepEl.offsetLeft;
    const stepWidth = stepEl.clientWidth;

    const targetScroll = stepLeft - containerWidth / 2.2 + stepWidth / 2;
    if (targetScroll > 0) {
      container.scrollTo({ left: targetScroll, behavior: "smooth" });
    } else {
      container.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <Dialog width={74} height={48} isOpen={isOpen} onClose={onClose}>
        <S.PreviewModalWrapper>
          <div>로딩 중...</div>
        </S.PreviewModalWrapper>
      </Dialog>
    );
  }

  if (error || !previewData) {
    return (
      <Dialog width={74} height={48} isOpen={isOpen} onClose={onClose}>
        <S.PreviewModalWrapper>
          <div>데이터를 불러올 수 없습니다.</div>
        </S.PreviewModalWrapper>
      </Dialog>
    );
  }

  return (
    <Dialog width={74} height={48} isOpen={isOpen} onClose={onClose}>
      <S.PreviewModalWrapper>
        <S.PreviewModalTop>
          <S.PreviewModalIntro>
            <S.PreviewModalTitle>{previewData.title}</S.PreviewModalTitle>
            <S.PreviewModalInfo>
              <S.PreviewModalDescription>{previewData.intro}</S.PreviewModalDescription>
              <S.PreviewModalAction $locked={isLocked}>
                <Button variant="primary" size="sm" disabled={isLocked} onClick={onStart}>
                  시작하기
                </Button>
              </S.PreviewModalAction>
            </S.PreviewModalInfo>
          </S.PreviewModalIntro>
          <S.SectionDivider $type="Preview" />
        </S.PreviewModalTop>

        <S.PreviewModalBottom>
          <S.PreviewModalHead>
            <S.CheckIcon />
            <S.PreviewModalHeadLabel>
              목표 달성을 위한 전략적 경로를 시각적으로 표현한 계획으로, 스텝을 하나하나 따라가다
              보면 목표에 도달할 수 있어요.
            </S.PreviewModalHeadLabel>
          </S.PreviewModalHead>

          <S.PreviewModalBody>
            <S.RoadmapBox>
              <S.RoadmapTop>
                <S.RoadmapIcon />
                <S.RoadmapTitle>한눈에 보는 로드맵</S.RoadmapTitle>
              </S.RoadmapTop>

              <S.RoadmapBottom>
                <S.RoadmapStepsContainer ref={stepsContainerRef}>
                  <S.RoadmapSteps>
                    {previewData.steps.map((step, index) => (
                      <S.StepWrapper
                        key={step.id}
                        ref={el => {
                          stepRefs.current[index] = el;
                        }}
                        onClick={() => handleStepClick(step.id)}
                      >
                        <S.StepCircle $active={step.id === currentStep}>{step.id}</S.StepCircle>
                        {step.id === currentStep && <S.StepTooltip>{step.tooltip}</S.StepTooltip>}
                      </S.StepWrapper>
                    ))}
                    <S.StepCircle>
                      <S.StepFlag />
                    </S.StepCircle>
                  </S.RoadmapSteps>
                </S.RoadmapStepsContainer>

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
                  <S.TargetTitle>{previewData.title}</S.TargetTitle>
                </S.TargetBoxIntro>
                <S.SectionDivider $type="Target" />
              </S.TargetBoxTop>

              <S.TargetBoxList>
                {previewData.targets.map((text, idx) => (
                  <S.TargetItem key={idx}>
                    <S.TargetStarWrapper>
                      <S.TargetStar />
                    </S.TargetStarWrapper>
                    <S.TargetItemText>{text}</S.TargetItemText>
                  </S.TargetItem>
                ))}
              </S.TargetBoxList>
            </S.TargetBox>
          </S.PreviewModalBody>
        </S.PreviewModalBottom>
      </S.PreviewModalWrapper>
    </Dialog>
  );
};
