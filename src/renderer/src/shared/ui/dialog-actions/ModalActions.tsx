import { Button } from "@/shared/ui/button";
import type { ButtonSize, ButtonVariant } from "@/shared/ui/button";
import * as S from "./ModalActions.style";

export interface ModalActionsProps {
  onCancel: () => void;
  cancelLabel?: string;
  cancelDisabled?: boolean;
  onConfirm?: () => void;
  confirmLabel: string;
  confirmDisabled?: boolean;
  confirmType?: "button" | "submit";
  confirmVariant?: ButtonVariant;
  size?: ButtonSize;
}

export const ModalActions = ({
  onCancel,
  cancelLabel = "취소",
  cancelDisabled = false,
  onConfirm,
  confirmLabel,
  confirmDisabled = false,
  confirmType = "button",
  confirmVariant = "primary",
  size = "sm",
}: ModalActionsProps) => {
  return (
    <S.ActionRow>
      <Button
        type="button"
        variant="secondary"
        size={size}
        onClick={onCancel}
        disabled={cancelDisabled}
      >
        {cancelLabel}
      </Button>
      <Button
        type={confirmType}
        variant={confirmVariant}
        size={size}
        onClick={onConfirm}
        disabled={confirmDisabled}
      >
        {confirmLabel}
      </Button>
    </S.ActionRow>
  );
};
