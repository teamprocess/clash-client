import * as S from "../AuthPage.style";
import { ResetPasswordForm } from "@/features/auth";
import { useLocation } from "react-router-dom";

export const ResetPasswordPage = () => {
  const location = useLocation();

  return (
    <S.PageContainer>
      <S.FormWrapper>
        <S.ClashLogo />
        <ResetPasswordForm key={location.key} />
      </S.FormWrapper>
    </S.PageContainer>
  );
};
