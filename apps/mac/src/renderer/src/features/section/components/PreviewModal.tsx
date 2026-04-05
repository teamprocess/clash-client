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

  const scrollToStep = (stepId: number) => {
    const container = stepsContainerRef.current;
    const stepEl = stepRefs.current[stepId - 1];
    if (!container || !stepEl) return;

    const containerWidth = container.clientWidth;
    const stepLeft = stepEl.offsetLeft;
    const stepWidth = stepEl.clientWidth;

    const targetScroll = stepLeft - containerWidth / 2.2 + stepWidth / 2;
    container.scrollTo({ left: Math.max(0, targetScroll), behavior: "smooth" });
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      scrollToStep(currentStep + 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
    scrollToStep(stepId);
  };

  if (loading) {
    return (
      <Dialog
        width={74}
        height={48}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
      >
        <S.PreviewModalWrapper>
          <S.LoadingState aria-hidden>
            <S.PreviewModalTop>
              <S.LoadingIntro>
                <S.SkeletonBlock $width="42%" $height="2.75rem" $radius="0.75rem" />
                <S.LoadingInfoRow>
                  <S.SkeletonBlock $width="72%" $height="3.25rem" $radius="0.75rem" />
                  <S.SkeletonBlock $width="7rem" $height="2.75rem" $radius="0.75rem" />
                </S.LoadingInfoRow>
              </S.LoadingIntro>
              <S.SectionDivider $type="Preview" />
            </S.PreviewModalTop>

            <S.PreviewModalBottom>
              <S.LoadingHead>
                <S.SkeletonCircle $size="1.5rem" />
                <S.SkeletonBlock $width="78%" $height="1.5rem" $radius="0.5rem" />
              </S.LoadingHead>

              <S.LoadingBody>
                <S.RoadmapBox>
                  <S.RoadmapTop>
                    <S.SkeletonCircle $size="2rem" />
                    <S.SkeletonBlock $width="11rem" $height="1.75rem" $radius="0.5rem" />
                  </S.RoadmapTop>

                  <S.LoadingRoadmapBottom>
                    <S.LoadingStepsRail>
                      <S.SkeletonCircle $size="2.25rem" />
                      <S.SkeletonCircle $size="2.25rem" />
                      <S.SkeletonCircle $size="2.25rem" />
                      <S.SkeletonCircle $size="2.25rem" />
                      <S.SkeletonCircle $size="2.25rem" />
                    </S.LoadingStepsRail>

                    <S.LoadingRoadmapDescription>
                      <S.SkeletonBlock $width="2.8rem" $height="2.8rem" $radius="0.5rem" />
                      <S.SkeletonBlock $width="70%" $height="1.5rem" $radius="0.5rem" />
                    </S.LoadingRoadmapDescription>

                    <S.LoadingStepper>
                      <S.SkeletonCircle $size="1.75rem" />
                      <S.SkeletonBlock $width="3.5rem" $height="1.5rem" $radius="0.5rem" />
                      <S.SkeletonCircle $size="1.75rem" />
                    </S.LoadingStepper>
                  </S.LoadingRoadmapBottom>
                </S.RoadmapBox>

                <S.TargetBox>
                  <S.TargetBoxTop>
                    <S.LoadingTargetIntro>
                      <S.SkeletonBlock $width="6rem" $height="2rem" $radius="1rem" />
                      <S.SkeletonBlock $width="85%" $height="1.75rem" $radius="0.5rem" />
                    </S.LoadingTargetIntro>
                    <S.SectionDivider $type="Target" />
                  </S.TargetBoxTop>

                  <S.LoadingTargetList>
                    <S.LoadingTargetItem>
                      <S.SkeletonCircle $size="1.5rem" />
                      <S.SkeletonBlock $width="80%" $height="1.25rem" $radius="0.5rem" />
                    </S.LoadingTargetItem>
                    <S.LoadingTargetItem>
                      <S.SkeletonCircle $size="1.5rem" />
                      <S.SkeletonBlock $width="72%" $height="1.25rem" $radius="0.5rem" />
                    </S.LoadingTargetItem>
                    <S.LoadingTargetItem>
                      <S.SkeletonCircle $size="1.5rem" />
                      <S.SkeletonBlock $width="76%" $height="1.25rem" $radius="0.5rem" />
                    </S.LoadingTargetItem>
                  </S.LoadingTargetList>
                </S.TargetBox>
              </S.LoadingBody>
            </S.PreviewModalBottom>
          </S.LoadingState>
        </S.PreviewModalWrapper>
      </Dialog>
    );
  }

  if (error || !previewData) {
    return (
      <Dialog
        width={74}
        height={48}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
      >
        <S.PreviewModalWrapper>
          <div>데이터를 불러올 수 없습니다.</div>
        </S.PreviewModalWrapper>
      </Dialog>
    );
  }

  const hasSteps = previewData.steps.length > 0;

  return (
    <Dialog width={74} height={48} isOpen={isOpen} onClose={onClose} closeOnOverlayClick={true}>
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
                  {hasSteps ? (
                    <S.RoadmapSteps>
                      {previewData.steps.map((step, index) => {
                        const isFirstStep = index === 0;
                        const isLastStep = index === previewData.steps.length - 1;
                        const tooltipAlign = isFirstStep ? "left" : isLastStep ? "right" : "center";

                        return (
                          <S.StepWrapper
                            key={step.id}
                            ref={el => {
                              stepRefs.current[index] = el;
                            }}
                            onClick={() => handleStepClick(step.id)}
                          >
                            <S.StepCircle $active={step.id === currentStep}>{step.id}</S.StepCircle>
                            {step.id === currentStep && (
                              <S.StepTooltip $align={tooltipAlign}>{step.tooltip}</S.StepTooltip>
                            )}
                          </S.StepWrapper>
                        );
                      })}
                      <S.StepCircle>
                        <S.StepFlag />
                      </S.StepCircle>
                    </S.RoadmapSteps>
                  ) : (
                    <S.EmptyRoadmapState>
                      아직 등록된 챕터가 없어요. 내용이 추가되면 여기서 스텝을 확인할 수 있습니다.
                    </S.EmptyRoadmapState>
                  )}
                </S.RoadmapStepsContainer>

                <S.RoadmapDescriptionBox>
                  {hasSteps ? (
                    <>
                      <S.RoadmapNumberBox>
                        <S.StepTitle>Step</S.StepTitle>
                        <S.RoadmapNumber>{String(activeStep?.id).padStart(2, "0")}</S.RoadmapNumber>
                      </S.RoadmapNumberBox>
                      <S.RoadmapDescription>{activeStep?.description}</S.RoadmapDescription>
                    </>
                  ) : (
                    <S.EmptyRoadmapDescription>
                      아직 준비된 스텝이 없습니다.
                    </S.EmptyRoadmapDescription>
                  )}
                </S.RoadmapDescriptionBox>

                <S.RoadmapStepBox>
                  {hasSteps ? (
                    <>
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
                    </>
                  ) : (
                    <S.EmptyStepLabel>챕터 준비 중</S.EmptyStepLabel>
                  )}
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
