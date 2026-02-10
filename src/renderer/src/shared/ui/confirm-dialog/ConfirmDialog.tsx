import { Modal } from "@/shared/ui/modal/Modal";
import { Button } from "@/shared/ui/button";
import * as S from "./ConfirmDialog.style";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmMessage?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmMessage,
  confirmLabel = "확인",
  cancelLabel = "취소",
  isConfirming = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <Modal width={23} height={13} isOpen={isOpen} onClose={onClose} modalTitle={title} gap={3}>
      <S.Content>
        <S.MessageBox>
          <S.Description>{description}</S.Description>
          {confirmMessage && <S.ConfirmMessage>{confirmMessage}</S.ConfirmMessage>}
        </S.MessageBox>
        <S.ActionBox>
          <Button variant="secondary" size="lg" onClick={onClose} disabled={isConfirming}>
            {cancelLabel}
          </Button>
          <Button variant="primary" size="lg" onClick={onConfirm} disabled={isConfirming}>
            {isConfirming ? `${confirmLabel} 중...` : confirmLabel}
          </Button>
        </S.ActionBox>
      </S.Content>
    </Modal>
  );
};
