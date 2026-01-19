import * as S from "./LockedModal.style";
import { Modal } from "@/shared/ui/modal/Modal";

interface LockedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LockedModal = ({ isOpen, onClose }: LockedModalProps) => {
  return (
    <Modal $width={74} $height={48} isOpen={isOpen} onClose={onClose} bgColor="background.normal">
      <S.LockedModalWrapper>
        <S.LockedModalTop>
          <S.LockedModalIntro>
            <S.LockedModalTitle>자바스크립트 고급</S.LockedModalTitle>
            <S.LockedModalInfo>
              <S.LockedModalDescription>
                비동기 처리, 성능 최적화 기법, 함수형 프로그래밍, 프로그레시브 웹 앱, 이벤트 처리
                심화 기술들을 익히실 수 있습니다.
              </S.LockedModalDescription>
              <S.LockedModalAction>시작하기</S.LockedModalAction>
            </S.LockedModalInfo>
          </S.LockedModalIntro>
          <S.SectionDivider></S.SectionDivider>
        </S.LockedModalTop>
      </S.LockedModalWrapper>
    </Modal>
  );
};
