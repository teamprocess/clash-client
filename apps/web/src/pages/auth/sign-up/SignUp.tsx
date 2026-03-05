import * as S from "./SignUp.style";
import { SignUpForm } from "@/features/auth";

export const SignUpPage = () => {
  return (
    <S.SignUpContainer>
      <S.SignUpFormWrapper>
        <S.ClashLogo />
        <SignUpForm />
      </S.SignUpFormWrapper>
    </S.SignUpContainer>
  );
};
