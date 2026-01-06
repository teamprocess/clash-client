import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  id: z.string().min(4, "아이디를 입력하세요."),
  password: z.string().min(8, "비밀번호를 입력하세요."),
});

type SignInForm = z.infer<typeof signInSchema>;

export const useSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      // 로그인 API 연동
      console.log("로그인:", data);
    } catch (error) {
      console.error("로그인 실패:", error);
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
