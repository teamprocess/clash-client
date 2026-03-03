import * as S from "./SignUp.style";
import { SignUpForm } from "@/features/auth";

export const SignUpPage = () => {
  return (
    <S.SignUpContainer>
      <S.LeftContainer>
        <S.ClashLogo />
        <SignUpForm />
      </S.LeftContainer>
      <S.RightContainer></S.RightContainer>
    </S.SignUpContainer>
  );
};
