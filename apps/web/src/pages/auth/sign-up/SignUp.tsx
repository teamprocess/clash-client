import * as S from "../AuthPage.style";
import { SignUpForm } from "@/features/auth";

export const SignUpPage = () => {
  return (
    <S.PageContainer>
      <S.FormWrapper>
        <S.ClashLogo />
        <SignUpForm />
      </S.FormWrapper>
    </S.PageContainer>
  );
};
