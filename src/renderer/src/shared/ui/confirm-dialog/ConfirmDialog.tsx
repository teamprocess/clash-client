import { Dialog } from "@/shared/ui";
import type { ButtonVariant } from "@/shared/ui/button";
import { ModalActions } from "@/shared/ui/dialog-actions";
import * as S from "./ConfirmDialog.style";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmMessage?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: ButtonVariant;
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
  confirmVariant = "primary",
  isConfirming = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog width={23} height={13} isOpen={isOpen} onClose={onClose} title={title} gap={3}>
      <S.Content>
        <S.MessageBox>
          <S.Description>{description}</S.Description>
          {confirmMessage && <S.ConfirmMessage>{confirmMessage}</S.ConfirmMessage>}
        </S.MessageBox>
        <ModalActions
          onCancel={onClose}
          cancelLabel={cancelLabel}
          cancelDisabled={isConfirming}
          onConfirm={onConfirm}
          confirmLabel={isConfirming ? `${confirmLabel} 중...` : confirmLabel}
          confirmDisabled={isConfirming}
          confirmVariant={confirmVariant}
          size="md"
        />
      </S.Content>
    </Dialog>
  );
};
