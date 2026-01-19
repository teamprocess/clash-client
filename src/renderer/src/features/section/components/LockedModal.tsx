import * as S from "./LockedModal.style";
import { Modal } from "@/shared/ui/modal/Modal";

interface LockedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LockedModal = ({ isOpen, onClose }: LockedModalProps) => {
  return (
    <Modal $width={20} $height={12.5} isOpen={isOpen} onClose={onClose} showClose={false}>
      <S.LockedModalWrapper>
        <S.LockedModalLabel>
          [ 넥스트 초급 ] 로드맵은 잠금해제 후 이용하실 수 있습니다
        </S.LockedModalLabel>
        <S.LockedModalButton onClick={onClose}>확인</S.LockedModalButton>
      </S.LockedModalWrapper>
    </Modal>
  );
};
