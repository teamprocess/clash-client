import * as S from "./TutorialModal.style";
import { Modal } from "@/shared/ui/modal/Modal";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  title: string;
}

export const TutorialModal = ({ isOpen, onClose, onStart, title }: TutorialModalProps) => {
  return (
    <Modal $width={74} $height={48} isOpen={isOpen} onClose={onClose} bgColor="background.normal">
      <S.TutorialModalWrapper>
        <S.TutorialModalTop>
          <S.TutorialModalIntro>
            <S.TutorialModalTitle>{title}</S.TutorialModalTitle>
            <S.TutorialModalInfo>
              <S.TutorialModalDescription>
                비동기 처리, 성능 최적화 기법, 함수형 프로그래밍, 프로그레시브 웹 앱, 이벤트 처리
                심화 기술들을 익히실 수 있습니다.
              </S.TutorialModalDescription>
              <S.TutorialModalAction onClick={onStart}>시작하기</S.TutorialModalAction>
            </S.TutorialModalInfo>
          </S.TutorialModalIntro>
          <S.SectionDivider $type={"Tutorial"} />
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
                  {[1, 2, 3, 4, 5].map(step => (
                    <S.StepWrapper key={step}>
                      <S.StepCircle $active={step === 3}>{step}</S.StepCircle>

                      {step === 3 && <S.StepTooltip>함수형 프로그래밍</S.StepTooltip>}
                    </S.StepWrapper>
                  ))}
                  <S.StepCircle>
                    <S.StepFlag />
                  </S.StepCircle>
                </S.RoadmapSteps>

                <S.RoadmapDescriptionBox>
                  <S.RoadmapNumberBox>
                    <S.StepTitle>Step</S.StepTitle>
                    <S.RoadmapNumber>03</S.RoadmapNumber>
                  </S.RoadmapNumberBox>
                  <S.RoadmapDescription>
                    함수형 프로그래밍을 이용하여 상태 관리 용이, 가독성 및 유지보수성 향상와 같은
                    장점들을 실무에 활용할 수 있습니다.
                  </S.RoadmapDescription>
                </S.RoadmapDescriptionBox>
                <S.RoadmapStepBox>
                  <S.ArrowIcon $direction="left" />
                  <S.StepLabel>
                    <S.CurrentStepLabel>3</S.CurrentStepLabel>/
                    <S.TotalStepLabel>5</S.TotalStepLabel>
                  </S.StepLabel>
                  <S.ArrowIcon $direction="right" />
                </S.RoadmapStepBox>
              </S.RoadmapBottom>
            </S.RoadmapBox>
            <S.TargetBox>
              <S.TargetBoxTop>
                <S.TargetBoxIntro>
                  <S.TargetLabel>로드맵 목표</S.TargetLabel>
                  <S.TargetTitle>{title}</S.TargetTitle>
                </S.TargetBoxIntro>
                <S.SectionDivider $type={"Target"} />
              </S.TargetBoxTop>
              <S.TargetBoxList>
                {[
                  "프론트엔드 기본기 확실하게 다지기",
                  "체계적 커리큘럼으로 자바스크립트 마스터하기",
                  "미션으로 내 실력을 더 확실히 알기",
                ].map((text, idx) => (
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
