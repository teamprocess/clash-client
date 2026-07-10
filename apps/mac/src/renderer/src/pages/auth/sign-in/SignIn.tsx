import * as S from "./SignIn.style";
import { DevelopSignInForm, WebSignInForm } from "@/features/auth";
import { appRuntimeProfile } from "@/shared/config/appRuntime";

export const SignInPage = () => {
  return (
    <S.SignInContainer>
      <S.LeftContainer>
        <S.ClashLogo />
        {appRuntimeProfile.channel === "dev" ? <DevelopSignInForm /> : <WebSignInForm />}
      </S.LeftContainer>
      <S.RightContainer></S.RightContainer>
    </S.SignInContainer>
  );
};
