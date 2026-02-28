import type { ChangeEvent, FormEvent } from "react";
import { Dialog, ModalActions } from "@/shared/ui";
import * as S from "./GroupJoinPassword.style";

interface GroupJoinPasswordProps {
  isOpen: boolean;
  groupName: string | null;
  isJoining: boolean;
  password: string;
  errorMessage: string;
  onClose: () => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event?: FormEvent<HTMLFormElement>) => Promise<void>;
}

export const GroupJoinPassword = ({
  isOpen,
  groupName,
  isJoining,
  password,
  errorMessage,
  onClose,
  onPasswordChange,
  onSubmit,
}: GroupJoinPasswordProps) => {
  return (
    <Dialog title="비밀번호 입력" width={28} height={15} isOpen={isOpen} onClose={onClose} gap={1}>
      <S.PasswordDialogBody onSubmit={event => void onSubmit(event)}>
        <S.PasswordDialogDescription>
          {groupName ? `${groupName} 그룹 비밀번호를 입력하세요.` : "그룹 비밀번호를 입력하세요."}
        </S.PasswordDialogDescription>
        <div>
          <S.PasswordInput
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="비밀번호를 입력하세요."
            autoFocus
          />
          {errorMessage && <S.PasswordErrorText>{errorMessage}</S.PasswordErrorText>}
        </div>
        <ModalActions
          onCancel={onClose}
          cancelDisabled={isJoining}
          confirmLabel={isJoining ? "가입 중..." : "가입"}
          confirmType="submit"
          confirmDisabled={isJoining}
          size="sm"
        />
      </S.PasswordDialogBody>
    </Dialog>
  );
};
