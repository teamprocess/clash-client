import { Button, Dialog } from "@/shared/ui";
import * as S from "./DeleteRivalsConfirm.style";
import { useRival } from "@/shared/lib";

interface DeleteRivalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rival: ReturnType<typeof useRival>;
  rivalId: number;
  userName?: string;
}

export const DeleteRivalsConfirmDialog = ({
  isOpen,
  onClose,
  rival,
  rivalId,
  userName,
}: DeleteRivalsDialogProps) => {
  const handleConfirm = async () => {
    await rival.handleRivalDelete(rivalId);
    onClose();
  };

  return (
    <Dialog title="라이벌 삭제" width={23.5} height={14} isOpen={isOpen} onClose={onClose}>
      <S.DialogBody>
        <div />
        <S.Description>
          {userName ? `${userName}님을 ` : ""}정말 라이벌에서 삭제하시겠습니까?
        </S.Description>

        {rival.error && <S.ErrorText>{rival.error}</S.ErrorText>}

        <S.ButtonBox>
          <Button size={"sm"} variant="secondary" fullWidth onClick={onClose}>
            취소
          </Button>
          <Button size={"sm"} variant="primary" fullWidth onClick={handleConfirm}>
            삭제
          </Button>
        </S.ButtonBox>
      </S.DialogBody>
    </Dialog>
  );
};
