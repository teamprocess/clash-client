import { GROUP_CATEGORIES, GROUP_CATEGORY_LABELS, type GroupCategory } from "@/entities/group";
import type { GroupEditFormData } from "../../../model/useGroup";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import * as S from "./GroupFormFields.style";

interface GroupFormFieldsProps {
  register: UseFormRegister<GroupEditFormData>;
  errors: FieldErrors<GroupEditFormData>;
  selectedType?: GroupCategory;
  onTypeSelect: (type: GroupCategory) => void;
  typeLabel: string;
  maxMembersLabel: string;
  descriptionPlaceholder: string;
  passwordPlaceholder: string;
  idPrefix?: string;
  passwordReadOnly?: boolean;
  showPasswordChangeButton?: boolean;
  isPasswordChangeEnabled?: boolean;
  onPasswordChangeClick?: () => void;
  variant?: "default" | "createPanel";
  namePlaceholder?: string;
  maxMembersPlaceholder?: string;
  showDescriptionLabel?: boolean;
}

export const GroupFormFields = ({
  register,
  errors,
  selectedType,
  onTypeSelect,
  typeLabel,
  maxMembersLabel,
  descriptionPlaceholder,
  passwordPlaceholder,
  idPrefix = "group",
  passwordReadOnly = false,
  showPasswordChangeButton = false,
  isPasswordChangeEnabled = false,
  onPasswordChangeClick,
  variant = "default",
  namePlaceholder = "그룹명을 입력하세요",
  maxMembersPlaceholder = "최대 인원을 입력하세요.",
  showDescriptionLabel = true,
}: GroupFormFieldsProps) => {
  const nameInputId = `${idPrefix}-name-input`;
  const passwordInputId = `${idPrefix}-password-input`;
  const typeInputId = `${idPrefix}-type-input`;
  const maxMembersInputId = `${idPrefix}-max-members-input`;
  const descriptionInputId = `${idPrefix}-description-input`;
  const activeCategory = selectedType ?? GROUP_CATEGORIES[0];
  const categoryOptions = GROUP_CATEGORIES.map(category => ({
    key: category,
    label: GROUP_CATEGORY_LABELS[category],
  }));
  const isCreatePanel = variant === "createPanel";

  return (
    <S.FieldsContainer $variant={variant}>
      <S.InputWrapper>
        <S.InputBox>
          <S.Label htmlFor={nameInputId}>그룹 이름</S.Label>
          <S.Input
            id={nameInputId}
            type="text"
            placeholder={namePlaceholder}
            {...register("name")}
          />
          {errors.name && <S.ErrorText>{errors.name.message}</S.ErrorText>}
        </S.InputBox>
        <S.InputBox>
          <S.Label htmlFor={passwordInputId}>비밀번호 (선택사항)</S.Label>
          <S.PasswordInputWrapper $hasAction={showPasswordChangeButton}>
            <S.Input
              id={passwordInputId}
              type="password"
              placeholder={passwordPlaceholder}
              readOnly={passwordReadOnly}
              {...register("password")}
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

      {isCreatePanel ? (
        <>
          <S.InputBox>
            <S.Label htmlFor={typeInputId}>{typeLabel}</S.Label>
            <S.SlideButtonBox id={typeInputId}>
              <S.SlideActiveIndicator
                $activeIndex={Math.max(0, GROUP_CATEGORIES.indexOf(activeCategory))}
                $count={GROUP_CATEGORIES.length}
              />
              {categoryOptions.map(option => (
                <S.SlideButton
                  key={option.key}
                  type="button"
                  $isActive={activeCategory === option.key}
                  onClick={() => onTypeSelect(option.key)}
                >
                  {option.label}
                </S.SlideButton>
              ))}
            </S.SlideButtonBox>
            {errors.type && <S.ErrorText>{errors.type.message}</S.ErrorText>}
          </S.InputBox>

          <S.InputBox>
            <S.Label htmlFor={maxMembersInputId}>{maxMembersLabel}</S.Label>
            <S.NumberInputWrapper>
              <S.NumberInput
                id={maxMembersInputId}
                type="number"
                placeholder={maxMembersPlaceholder}
                {...register("maxMembers", { valueAsNumber: true })}
              />
            </S.NumberInputWrapper>
            {errors.maxMembers && <S.ErrorText>{errors.maxMembers.message}</S.ErrorText>}
          </S.InputBox>
        </>
      ) : (
        <S.InputWrapper>
          <S.InputBox>
            <S.Label htmlFor={typeInputId}>{typeLabel}</S.Label>
            <S.SlideButtonBox id={typeInputId}>
              <S.SlideActiveIndicator
                $activeIndex={Math.max(0, GROUP_CATEGORIES.indexOf(activeCategory))}
                $count={GROUP_CATEGORIES.length}
              />
              {categoryOptions.map(option => (
                <S.SlideButton
                  key={option.key}
                  type="button"
                  $isActive={activeCategory === option.key}
                  onClick={() => onTypeSelect(option.key)}
                >
                  {option.label}
                </S.SlideButton>
              ))}
            </S.SlideButtonBox>
            {errors.type && <S.ErrorText>{errors.type.message}</S.ErrorText>}
          </S.InputBox>

          <S.InputBox>
            <S.Label htmlFor={maxMembersInputId}>{maxMembersLabel}</S.Label>
            <S.Input
              id={maxMembersInputId}
              type="number"
              placeholder={maxMembersPlaceholder}
              {...register("maxMembers", { valueAsNumber: true })}
            />
            {errors.maxMembers && <S.ErrorText>{errors.maxMembers.message}</S.ErrorText>}
          </S.InputBox>
        </S.InputWrapper>
      )}

      <S.InputBox>
        {showDescriptionLabel ? <S.Label htmlFor={descriptionInputId}>그룹 설명</S.Label> : null}
        <S.TextArea
          id={descriptionInputId}
          rows={isCreatePanel ? 7 : 5}
          placeholder={descriptionPlaceholder}
          {...register("description")}
        />
        {errors.description && <S.ErrorText>{errors.description.message}</S.ErrorText>}
      </S.InputBox>
    </S.FieldsContainer>
  );
};
