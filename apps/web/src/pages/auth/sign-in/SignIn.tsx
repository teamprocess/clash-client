import * as S from "../AuthPage.style";
import { SignInForm } from "@/features/auth";

export const SignInPage = () => {
  return (
    <S.PageContainer>
      <S.FormWrapper>
        <S.ClashLogo />
        <SignInForm />
      </S.FormWrapper>
    </S.PageContainer>
  );
};
