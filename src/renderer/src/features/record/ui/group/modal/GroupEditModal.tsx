import { Modal } from "@/shared/ui/modal/Modal";
import { GROUP_TYPE } from "@/features/record/model/useGroup";
import type { GroupEditModalProps } from "@/features/record/model/useGroup";
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
                <S.Input
                  id="group-password-input"
                  type="password"
                  placeholder="그룹 비밀번호를 입력하세요."
                  {...register("password")}
                />
                {errors.password && <S.ErrorText>{errors.password.message}</S.ErrorText>}
              </S.InputBox>
            </S.InputWrapper>
            <S.InputWrapper>
              <S.InputBox>
                <S.Label htmlFor="group-type">그룹 유형</S.Label>
                <S.SlideButtonBox>
                  <S.SlideButton
                    type="button"
                    $isActive={selectedType === GROUP_TYPE.CLUB}
                    onClick={() => onTypeSelect(GROUP_TYPE.CLUB)}
                  >
                    {GROUP_TYPE.CLUB}
                  </S.SlideButton>
                  <S.SlideButton
                    type="button"
                    $isActive={selectedType === GROUP_TYPE.CLASS}
                    onClick={() => onTypeSelect(GROUP_TYPE.CLASS)}
                  >
                    {GROUP_TYPE.CLASS}
                  </S.SlideButton>
                  <S.SlideButton
                    type="button"
                    $isActive={selectedType === GROUP_TYPE.TEAM}
                    onClick={() => onTypeSelect(GROUP_TYPE.TEAM)}
                  >
                    {GROUP_TYPE.TEAM}
                  </S.SlideButton>
                  <S.SlideButton
                    type="button"
                    $isActive={selectedType === GROUP_TYPE.NARSHA}
                    onClick={() => onTypeSelect(GROUP_TYPE.NARSHA)}
                  >
                    {GROUP_TYPE.NARSHA}
                  </S.SlideButton>
                  <S.SlideButton
                    type="button"
                    $isActive={selectedType === GROUP_TYPE.ETC}
                    onClick={() => onTypeSelect(GROUP_TYPE.ETC)}
                  >
                    {GROUP_TYPE.ETC}
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
            <S.Button type="button" $type="CANCEL" onClick={onClose}>
              취소
            </S.Button>
            <S.Button type="submit" $type="SAVE" disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : "저장"}
            </S.Button>
          </S.ButtonBox>
        </S.GroupEditContainer>
      </S.ModalContent>
    </Modal>
  );
};
