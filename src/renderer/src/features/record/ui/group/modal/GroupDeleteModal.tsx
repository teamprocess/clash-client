import { Modal } from "@/shared/ui/modal/Modal";
import { Button } from "@/shared/ui";
import type { GroupDeleteModalProps } from "../../../model/useGroup";
import * as S from "./GroupDeleteModal.style";

export const GroupDeleteModal = ({ isOpen, onClose, onConfirm, action }: GroupDeleteModalProps) => {
  const isDelete = action === "delete";
  const title = isDelete ? "그룹 삭제" : "그룹 탈퇴";
  const description = isDelete
    ? "정말 해당 그룹을 삭제하시겠습니까?"
    : "정말 해당 그룹을 탈퇴하시겠습니까?";
  const warning = isDelete
    ? "삭제 시 해당 그룹의 데이터가 모두 삭제됩니다"
    : "탈퇴 시 그룹에서 나가게 됩니다";
  const confirmLabel = isDelete ? "삭제" : "탈퇴";

  return (
    <Modal width={22} height={13} isOpen={isOpen} onClose={onClose} modalTitle={title} gap={3}>
      <S.ModalContent>
        <S.TextBox>
          <S.Text>{description}</S.Text>
          <S.Text $type="WARNING">{warning}</S.Text>
        </S.TextBox>
        <S.ButtonBox>
          <Button variant="secondary" size="md" onClick={onClose}>
            취소
          </Button>
          <Button variant="danger" size="md" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </S.ButtonBox>
      </S.ModalContent>
    </Modal>
  );
};
