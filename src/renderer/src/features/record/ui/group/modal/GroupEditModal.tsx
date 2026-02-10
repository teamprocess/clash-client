import { Dialog, Button } from "@/shared/ui";
import type { GroupEditModalProps } from "../../../model/useGroup";
import { GroupFormFields } from "./GroupFormFields";
import * as S from "./GroupEditModal.style";

export const GroupEditModal = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
  isSubmitting,
  selectedType,
  onTypeSelect,
  onPasswordChangeClick,
  isPasswordChangeEnabled,
  showPasswordChangeButton,
}: GroupEditModalProps) => {
  return (
    <Dialog width={64} height={42} isOpen={isOpen} onClose={onClose} gap={3}>
      <S.ModalContent>
        <S.Tabs>
          <S.Tab $isActive={true}>그룹 수정</S.Tab>
        </S.Tabs>
        <S.Hr />
        <S.GroupEditContainer as="form" onSubmit={onSubmit}>
          <GroupFormFields
            idPrefix="edit-group"
            register={register}
            errors={errors}
            selectedType={selectedType}
            onTypeSelect={onTypeSelect}
            typeLabel="그룹 유형"
            maxMembersLabel="최대 인원 (명)"
            descriptionPlaceholder="저희는 이런 분을 원해요!"
            passwordPlaceholder={
              showPasswordChangeButton && !isPasswordChangeEnabled
                ? "비밀번호 변경을 눌러주세요."
                : "새 비밀번호를 입력하세요."
            }
            passwordReadOnly={showPasswordChangeButton && !isPasswordChangeEnabled}
            showPasswordChangeButton={showPasswordChangeButton}
            isPasswordChangeEnabled={isPasswordChangeEnabled}
            onPasswordChangeClick={onPasswordChangeClick}
          />
          <S.ButtonBox>
            <Button type="button" variant="secondary" size="md" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : "저장"}
            </Button>
          </S.ButtonBox>
        </S.GroupEditContainer>
      </S.ModalContent>
    </Dialog>
  );
};
