import * as S from "./ResetPassword.style";
import { ResetPasswordForm } from "@/features/auth/reset-password/ResetPasswordForm.tsx";
import { useLocation } from "react-router-dom";

export const ResetPasswordPage = () => {
  const location = useLocation();

  return (
    <S.ResetPasswordContainer>
      <S.ResetPasswordFormWrapper>
        <S.ClashLogo />
        <ResetPasswordForm key={location.key} />
      </S.ResetPasswordFormWrapper>
    </S.ResetPasswordContainer>
  );
};
