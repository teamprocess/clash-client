import * as S from "./SignIn.style";
import { SignInForm } from "@/features/auth";

export const SignInPage = () => {
  return (
    <S.SignInContainer>
      <S.LeftContainer>
        <S.ClashLogo />
        <SignInForm />
      </S.LeftContainer>
      <S.RightContainer></S.RightContainer>
    </S.SignInContainer>
  );
};
