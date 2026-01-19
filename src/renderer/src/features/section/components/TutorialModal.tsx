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
          <S.SectionDivider />
        </S.TutorialModalTop>
      </S.TutorialModalWrapper>
    </Modal>
  );
};
