import * as S from "../../ResetPassword.style";
import { Button, FieldMessage, TextField } from "@clash/ui";
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
        <TextField
          inputSize="lg"
          placeholder="새 비밀번호를 입력하세요."
          type="password"
          invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && <FieldMessage role="alert">{errors.password.message}</FieldMessage>}
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
          {isSubmitting ? "비밀번호 변경 중..." : "비밀번호 변경"}
        </Button>
        {errors.root && <FieldMessage role="alert">{errors.root.message}</FieldMessage>}
        <S.HelpTextBox>
          <S.HelpText to={{ pathname: "/sign-in", search: authSearch }}>로그인</S.HelpText>
        </S.HelpTextBox>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
