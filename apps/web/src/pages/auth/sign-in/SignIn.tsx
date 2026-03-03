import * as S from "./SignIn.style";
import { SignInForm } from "@/features/auth";

export const SignInPage = () => {
  return (
    <S.SignInContainer>
      <S.SignInformWrapper>
        <S.ClashLogo />
        <SignInForm />
      </S.SignInformWrapper>
    </S.SignInContainer>
  );
};
