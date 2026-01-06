import * as S from "../SignUpForm.style";
import { Step2Props } from "@/features/auth/sign-up/model/useSignUp";

export const Step2 = ({ register, handleSubmit, errors, isSubmitting, onSubmit }: Step2Props) => {
  return (
    <>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.InputBox>
          <div>
            <S.Input
              placeholder="비밀번호를 입력하세요."
              type="password"
              {...register("password")}
            />
            {errors.password && <S.ErrorText>{errors.password.message}</S.ErrorText>}
          </div>
          <div>
            <S.Input
              placeholder="비밀번호를 다시 입력하세요."
              type="password"
              {...register("passwordConfirm")}
            />
            {errors.passwordConfirm && <S.ErrorText>{errors.passwordConfirm.message}</S.ErrorText>}
          </div>
        </S.InputBox>
        <S.ButtonWrapper>
          <S.SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "회원가입 중..." : "회원가입"}
          </S.SubmitButton>
          <S.HelpTextBox>
            <S.HelpText to="/sign-in">로그인</S.HelpText>
          </S.HelpTextBox>
        </S.ButtonWrapper>
      </S.FormContainer>
    </>
  );
};
