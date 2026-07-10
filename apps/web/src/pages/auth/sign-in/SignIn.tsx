import * as S from "./SignIn.style";
import { SignInForm } from "@/features/auth";

export const SignInPage = () => {
  return (
    <S.SignInContainer>
      <S.SignInFormWrapper>
        <S.ClashLogo />
        <SignInForm />
      </S.SignInFormWrapper>
    </S.SignInContainer>
  );
};
