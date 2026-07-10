import * as S from "./SignInForm.style";
import { Button, FieldMessage, TextField } from "@clash/ui";
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
          <TextField
            inputSize="lg"
            placeholder="아이디를 입력하세요."
            invalid={!!errors.id}
            {...register("id")}
          />
          {errors.id && <FieldMessage role="alert">{errors.id.message}</FieldMessage>}
        </div>
        <div>
          <TextField
            inputSize="lg"
            placeholder="비밀번호를 입력하세요."
            type="password"
            invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && <FieldMessage role="alert">{errors.password.message}</FieldMessage>}
        </div>
      </S.InputBox>
      <S.ButtonWrapper>
        <Button
          type="submit"
          variant="primary"
          size="xl"
          interaction="responsive"
          fullWidth
          isLoading={isSubmitting}
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </Button>
        {errors.root && <FieldMessage role="alert">{errors.root.message}</FieldMessage>}
        <S.HelpTextBox>
          <S.HelpText to={{ pathname: "/sign-up", search }}>회원가입</S.HelpText>
          <S.HelpText to={{ pathname: "/reset-password", search }}>비밀번호 찾기</S.HelpText>
        </S.HelpTextBox>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
