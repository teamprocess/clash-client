import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/entities/user";
import { getErrorMessage, resetSession } from "@/shared/lib";

export const useSignOut = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 서버에 로그아웃 요청
      await authApi.signOut();
    } catch (error: unknown) {
      console.error("로그아웃 실패:", error);
      setError(getErrorMessage(error, "로그아웃에 실패했습니다."));
    } finally {
      await resetSession();

      // 로그인 페이지로 이동
      navigate("/sign-in", { replace: true });
      setIsLoading(false);
    }
  };

  return {
    signOut,
    isLoading,
    error,
  };
};
