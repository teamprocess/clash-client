import * as S from "../../ResetPassword.style";
import { Button, FieldMessage, TextField } from "@clash/ui";
import type { ResetPasswordRequestProps } from "../../model/useResetPassword";

export const ResetPasswordRequestStep = ({
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
          <TextField
            inputSize="lg"
            placeholder="이메일 주소를 입력하세요."
            invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <FieldMessage role="alert">{errors.email.message}</FieldMessage>}
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
          {isSubmitting ? "이메일 전송 중..." : "이메일 전송"}
        </Button>
        {errors.root && <FieldMessage role="alert">{errors.root.message}</FieldMessage>}
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
