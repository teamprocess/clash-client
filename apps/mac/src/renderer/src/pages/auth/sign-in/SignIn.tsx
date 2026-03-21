import * as S from "./SignIn.style";
import { DevelopSignInForm } from "@/features/auth/sign-in/ui/DevelopSignInForm";
import { WebSignInForm } from "@/features/auth/sign-in/ui/WebSignInForm";

export const SignInPage = () => {
  return (
    <S.SignInContainer>
      <S.LeftContainer>
        <S.ClashLogo />
        {import.meta.env.DEV ? <DevelopSignInForm /> : <WebSignInForm />}
      </S.LeftContainer>
      <S.RightContainer></S.RightContainer>
    </S.SignInContainer>
  );
};
