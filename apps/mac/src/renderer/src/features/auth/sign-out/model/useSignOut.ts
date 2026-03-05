import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/entities/user";
import { getErrorMessage } from "@/shared/lib";

export const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
      // 재실행 시 세션 복원을 막기 위해 Electron 쿠키를 강제로 비움
      if (typeof window !== "undefined" && window.api?.clearAuthSession) {
        try {
          await window.api.clearAuthSession();
        } catch (error) {
          console.error("세션 쿠키 정리에 실패했습니다:", error);
        }
      }

      // 모든 캐시 제거
      queryClient.clear();

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
