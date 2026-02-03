import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/entities/user";

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

      // 모든 캐시 제거
      queryClient.clear();

      // 로그인 페이지로 이동
      navigate("/sign-in", { replace: true });
    } catch (err) {
      console.error("로그아웃 실패:", err);
      setError("로그아웃에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signOut,
    isLoading,
    error,
  };
};
