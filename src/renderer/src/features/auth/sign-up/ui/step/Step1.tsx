import * as S from "../SignUpForm.style";
import { Step1Props } from "@/features/auth/sign-up/model/useSignUp";

export const Step1 = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  idChecked,
  idAvailable,
  handleIdCheck,
  emailSent,
  handleEmailVerify,
  emailVerified,
  handleEmailCodeVerify,
}: Step1Props) => {
  return (
    <>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.InputBox>
          <div>
            <S.InputWrapper>
              <S.Input placeholder="아이디를 입력하세요." {...register("id")} />
              <S.VerifyButton
                type="button"
                onClick={handleIdCheck}
                disabled={idChecked && idAvailable}
              >
                {idChecked && idAvailable ? "확인완료" : "중복확인"}
              </S.VerifyButton>
            </S.InputWrapper>
            {errors.id && <S.ErrorText>{errors.id.message}</S.ErrorText>}
            {idChecked && idAvailable && (
              <S.SuccessMessage>사용 가능한 아이디입니다.</S.SuccessMessage>
            )}
            {idChecked && !idAvailable && <S.ErrorText>이미 사용 중인 아이디입니다.</S.ErrorText>}
          </div>
          <div>
            <S.Input placeholder="이름을 입력하세요." {...register("name")} />
            {errors.name && <S.ErrorText>{errors.name.message}</S.ErrorText>}
          </div>
          <div>
            <S.InputWrapper>
              <S.Input placeholder="이메일 주소를 입력하세요." {...register("email")} />
              <S.VerifyButton type="button" onClick={handleEmailVerify} disabled={emailSent}>
                {emailSent ? "전송완료" : "인증"}
              </S.VerifyButton>
            </S.InputWrapper>
            {errors.email && <S.ErrorText>{errors.email.message}</S.ErrorText>}
            {emailSent && <S.SuccessMessage>인증 코드가 전송되었습니다.</S.SuccessMessage>}
          </div>
          <div>
            <S.InputWrapper>
              <S.Input placeholder="이메일 인증 코드를 입력하세요." {...register("emailCode")} />
              <S.VerifyButton
                type="button"
                onClick={handleEmailCodeVerify}
                disabled={emailVerified}
              >
                {emailVerified ? "확인완료" : "확인"}
              </S.VerifyButton>
            </S.InputWrapper>
            {errors.emailCode && <S.ErrorText>{errors.emailCode.message}</S.ErrorText>}
            {emailVerified && <S.SuccessMessage>이메일 인증이 완료되었습니다.</S.SuccessMessage>}
          </div>
        </S.InputBox>
        <S.ButtonWrapper>
          <S.SubmitButton type="submit">다음</S.SubmitButton>
          <S.HelpTextBox>
            <S.HelpText to="/sign-in">로그인</S.HelpText>
          </S.HelpTextBox>
        </S.ButtonWrapper>
      </S.FormContainer>
    </>
  );
};
