import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/entities/user";
import axios from "axios";

const signInSchema = z.object({
  id: z.string().min(4, "아이디를 입력하세요."),
  password: z.string().min(8, "비밀번호를 입력하세요."),
});

type SignInForm = z.infer<typeof signInSchema>;

export const useSignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      const result = await authApi.signIn({
        username: data.id,
        password: data.password,
        rememberMe: true,
      });

      if (result.success && result.data) {
        navigate("/");
      } else {
        setError("root", {
          type: "manual",
          message: result.message || "로그인에 실패했습니다.",
        });
      }
    } catch (error: unknown) {
      console.error("로그인 실패:", error);

      let errorMessage = "로그인 중 오류가 발생했습니다.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error?.message || error.response?.data?.message || errorMessage;
      }

      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
};
