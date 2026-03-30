import { Button, Dialog } from "@/shared/ui";
import * as S from "./DeleteRivalsConfirm.style";
import { useRival } from "@/shared/lib";

interface DeleteRivalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rival: ReturnType<typeof useRival>;
  username?: string;
}

export const DeleteRivalsConfirmDialog = ({
  isOpen,
  onClose,
  rival,
  username,
}: DeleteRivalsDialogProps) => {
  const handleConfirm = async () => {
    await rival.confirmDeleteRival();
  };

  return (
    <Dialog title="라이벌 삭제" width={24} height={14} isOpen={isOpen} onClose={onClose}>
      <S.DialogBody>
        <S.Description>{`정말 ${username}님과의 라이벌 관계를 끊으시겠어요?`}</S.Description>
        {rival.deleteError && <S.ErrorText>{rival.deleteError}</S.ErrorText>}
        <S.ButtonBox>
          <Button size="sm" variant="secondary" fullWidth onClick={onClose}>
            취소
          </Button>
          <Button
            size="sm"
            variant="primary"
            fullWidth
            onClick={handleConfirm}
            disabled={rival.isDeleteSubmitting}
          >
            삭제
          </Button>
        </S.ButtonBox>
      </S.DialogBody>
    </Dialog>
  );
};
