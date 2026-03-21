import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { authApi, startUserProfileSyncWindow } from "@/entities/user";
import { getErrorMessage } from "@/shared/lib";
import { useElectronAuthFlow } from "./useElectronAuthFlow";

export const useDevelopSignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearError, error, finishRequest, isStarting, setError, startRequest } =
    useElectronAuthFlow();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    clearError();
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    clearError();
  };

  const signIn = async () => {
    const trimmedUsername = username.trim();

    try {
      if (!trimmedUsername) {
        setError("아이디를 입력하세요.");
        return;
      }

      if (!password) {
        setError("비밀번호를 입력하세요.");
        return;
      }

      startRequest();

      const loginResult = await authApi.noRecaptchaSignIn({
        username: trimmedUsername,
        password,
      });

      if (!loginResult.success) {
        setError(loginResult.message || "로그인에 실패했습니다.");
        return;
      }

      startUserProfileSyncWindow();
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    } catch (error: unknown) {
      console.error("Embedded sign in failed:", error);
      setError(getErrorMessage(error, "로그인에 실패했습니다."));
    } finally {
      finishRequest();
    }
  };

  const handleSignInSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signIn();
  };

  return {
    error,
    handlePasswordChange,
    handleSignInSubmit,
    handleUsernameChange,
    isStarting,
    password,
    username,
  };
};
