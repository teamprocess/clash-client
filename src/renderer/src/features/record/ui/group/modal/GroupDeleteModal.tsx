import { Modal } from "@/shared/ui/modal/Modal";
import type { GroupDeleteModalProps } from "@/features/record/model/useGroup";
import * as S from "./GroupDeleteModal.style";

export const GroupDeleteModal = ({ isOpen, onClose, onConfirm }: GroupDeleteModalProps) => {
  return (
    <Modal width={22} height={13} isOpen={isOpen} onClose={onClose} modalTitle="과목 삭제" gap={3}>
      <S.ModalContent>
        <S.TextBox>
          <S.Text>정말 해당 그룹을 삭제하시겠습니까?</S.Text>
          <S.Text $type="WARNING">삭제 시 해당 그룹의 데이터가 모두 삭제됩니다</S.Text>
        </S.TextBox>
        <S.ButtonBox>
          <S.Button $type="CANCEL" onClick={onClose}>
            취소
          </S.Button>
          <S.Button $type="DELETE" onClick={onConfirm}>
            삭제
          </S.Button>
        </S.ButtonBox>
      </S.ModalContent>
    </Modal>
  );
};
