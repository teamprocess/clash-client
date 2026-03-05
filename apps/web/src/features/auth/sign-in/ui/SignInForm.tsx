import * as S from "./SignInForm.style";
import { useLocation } from "react-router-dom";
import { useSignIn } from "../model/useSignIn";

export const SignInForm = () => {
  const location = useLocation();
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useSignIn();

  const search = location.search;

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.InputBox>
        <div>
          <S.Input placeholder="아이디를 입력하세요." {...register("id")} />
          {errors.id && <S.ErrorText>{errors.id.message}</S.ErrorText>}
        </div>
        <div>
          <S.Input placeholder="비밀번호를 입력하세요." type="password" {...register("password")} />
          {errors.password && <S.ErrorText>{errors.password.message}</S.ErrorText>}
        </div>
      </S.InputBox>
      <S.ButtonWrapper>
        <S.SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "로그인 중..." : "로그인"}
        </S.SubmitButton>
        {errors.root && <S.ErrorText>{errors.root.message}</S.ErrorText>}
        <S.HelpTextBox>
          <S.HelpText to={{ pathname: "/sign-up", search }}>회원가입</S.HelpText>
          <S.HelpText to={{ pathname: "/forgot-passwrod", search }}>비밀번호 찾기</S.HelpText>
        </S.HelpTextBox>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
