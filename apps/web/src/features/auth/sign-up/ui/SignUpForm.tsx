import { EmailVerify } from "@/features/auth/sign-up/ui/step/EmailVerify";
import { useSignUp } from "../model/useSignUp";
import { SignUp } from "@/features/auth/sign-up/ui/step/SignUp";

export const SignUpForm = () => {
  const { step, signUp, emailVerify } = useSignUp();

  return (
    <>
      {step === "SIGNUP" && <SignUp {...signUp} />}
      {step === "EMAIL_VERIFY" && <EmailVerify {...emailVerify} />}
    </>
  );
};
