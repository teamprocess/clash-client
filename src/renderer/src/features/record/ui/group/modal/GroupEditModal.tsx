import { Modal } from "@/shared/ui/modal/Modal";
import { Button } from "@/shared/ui";
import { GROUP_CATEGORY_LABELS } from "@/entities/group";
import type { GroupEditModalProps } from "../../../model/useGroup";
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
    <Modal width={64} height={42} isOpen={isOpen} onClose={onClose} gap={3}>
      <S.ModalContent>
        <S.Tabs>
          <S.Tab $isActive={true}>그룹 수정</S.Tab>
        </S.Tabs>
        <S.Hr />
        <S.GroupEditContainer as="form" onSubmit={onSubmit}>
          <S.InputContainer>
            <S.InputWrapper>
              <S.InputBox>
                <S.Label htmlFor="group-name-input">그룹 이름</S.Label>
                <S.Input
                  id="group-name-input"
                  type="text"
                  placeholder="그룹 이름을 입력하세요."
                  {...register("name")}
                />
                {errors.name && <S.ErrorText>{errors.name.message}</S.ErrorText>}
              </S.InputBox>
              <S.InputBox>
                <S.Label htmlFor="group-password-input">비밀번호 (선택사항)</S.Label>
                <S.PasswordInputWrapper>
                  <S.Input
                    id="group-password-input"
                    type="password"
                    placeholder={
                      showPasswordChangeButton && !isPasswordChangeEnabled
                        ? "비밀번호 변경을 눌러주세요."
                        : "새 비밀번호를 입력하세요."
                    }
                    {...register("password")}
                    readOnly={showPasswordChangeButton && !isPasswordChangeEnabled}
                  />
                  {showPasswordChangeButton && (
                    <S.PasswordChangeButtonInside
                      type="button"
                      onClick={onPasswordChangeClick}
                      disabled={isPasswordChangeEnabled}
                    >
                      비밀번호 변경
                    </S.PasswordChangeButtonInside>
                  )}
                </S.PasswordInputWrapper>
                {errors.password && <S.ErrorText>{errors.password.message}</S.ErrorText>}
              </S.InputBox>
            </S.InputWrapper>
            <S.InputWrapper>
              <S.InputBox>
                <S.Label htmlFor="group-type">그룹 유형</S.Label>
                <S.SlideButtonBox>
                  <S.SlideButton
                    type="button"
                    $isActive={selectedType === "CLUB"}
                    onClick={() => onTypeSelect("CLUB")}
                  >
                    {GROUP_CATEGORY_LABELS.CLUB}
                  </S.SlideButton>
                  <S.SlideButton
                    type="button"
                    $isActive={selectedType === "CLASS"}
                    onClick={() => onTypeSelect("CLASS")}
                  >
                    {GROUP_CATEGORY_LABELS.CLASS}
                  </S.SlideButton>
                  <S.SlideButton
                    type="button"
                    $isActive={selectedType === "TEAM"}
                    onClick={() => onTypeSelect("TEAM")}
                  >
                    {GROUP_CATEGORY_LABELS.TEAM}
                  </S.SlideButton>
                  <S.SlideButton
                    type="button"
                    $isActive={selectedType === "NARSHA"}
                    onClick={() => onTypeSelect("NARSHA")}
                  >
                    {GROUP_CATEGORY_LABELS.NARSHA}
                  </S.SlideButton>
                  <S.SlideButton
                    type="button"
                    $isActive={selectedType === "ETC"}
                    onClick={() => onTypeSelect("ETC")}
                  >
                    {GROUP_CATEGORY_LABELS.ETC}
                  </S.SlideButton>
                </S.SlideButtonBox>
                {errors.type && <S.ErrorText>{errors.type.message}</S.ErrorText>}
              </S.InputBox>
              <S.InputBox>
                <S.Label htmlFor="group-max-members">최대 인원 (명)</S.Label>
                <S.Input
                  id="group-max-members"
                  type="number"
                  placeholder="최대 인원을 입력하세요."
                  {...register("maxMembers", { valueAsNumber: true })}
                />
                {errors.maxMembers && <S.ErrorText>{errors.maxMembers.message}</S.ErrorText>}
              </S.InputBox>
            </S.InputWrapper>
            <S.InputBox>
              <S.Label htmlFor="group-description">그룹 설명</S.Label>
              <S.TextArea
                id="group-description"
                rows={5}
                placeholder="저희는 이런 분을 원해요!"
                {...register("description")}
              />
              {errors.description && <S.ErrorText>{errors.description.message}</S.ErrorText>}
            </S.InputBox>
          </S.InputContainer>
          <S.ButtonBox>
            <Button type="button" variant="secondary" size="lg" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : "저장"}
            </Button>
          </S.ButtonBox>
        </S.GroupEditContainer>
      </S.ModalContent>
    </Modal>
  );
};
