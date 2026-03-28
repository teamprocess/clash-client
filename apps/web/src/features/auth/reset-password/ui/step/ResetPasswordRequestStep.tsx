import * as S from "../../ResetPassword.style";
import type { ResetPasswordRequestProps } from "../../model/useResetPassword";

export const ResetPasswordRequestStep = ({
  authSearch,
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
}: ResetPasswordRequestProps) => {
  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.Content>
        <S.Title>비밀번호를 재설정</S.Title>
        <S.Description>입력한 이메일로 비밀번호 재설정 링크를 전송합니다.</S.Description>
      </S.Content>
      <S.InputBox>
        <div>
          <S.Input placeholder="이메일 주소를 입력하세요." {...register("email")} />
          {errors.email && <S.ErrorText>{errors.email.message}</S.ErrorText>}
        </div>
      </S.InputBox>
      <S.ButtonWrapper>
        <S.SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "이메일 전송 중..." : "이메일 전송"}
        </S.SubmitButton>
        {errors.root && <S.ErrorText>{errors.root.message}</S.ErrorText>}
        <S.HelpTextBox>
          <S.HelpText to={{ pathname: "/sign-in", search: authSearch }}>로그인</S.HelpText>
          <S.HelpText to={{ pathname: "/sign-up", search: authSearch }}>회원가입</S.HelpText>
        </S.HelpTextBox>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
