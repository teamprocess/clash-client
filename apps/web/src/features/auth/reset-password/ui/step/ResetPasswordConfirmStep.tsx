import * as S from "../../ResetPassword.style";
import type { ResetPasswordConfirmProps } from "../../model/useResetPassword";

export const ResetPasswordConfirmStep = ({
  authSearch,
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
}: ResetPasswordConfirmProps) => {
  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.Content>
        <S.Title>새 비밀번호를 입력하세요.</S.Title>
        <S.Description>비밀번호는 8자 이상이어야 합니다.</S.Description>
      </S.Content>
      <S.InputBox>
        <S.Input
          placeholder="새 비밀번호를 입력하세요."
          type="password"
          {...register("password")}
        />
        {errors.password && <S.ErrorText>{errors.password.message}</S.ErrorText>}
      </S.InputBox>
      <S.ButtonWrapper>
        <S.SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "비밀번호 변경 중..." : "비밀번호 변경"}
        </S.SubmitButton>
        {errors.root && <S.ErrorText>{errors.root.message}</S.ErrorText>}
        <S.HelpTextBox>
          <S.HelpText to={{ pathname: "/sign-in", search: authSearch }}>로그인</S.HelpText>
        </S.HelpTextBox>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
