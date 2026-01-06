import { Step1 } from "@/features/auth/sign-up/ui/step/Step1";
import { Step2 } from "@/features/auth/sign-up/ui/step/Step2";
import { useSignUp } from "../model/useSignUp";

export const SignUpForm = () => {
  const { step, step1, step2 } = useSignUp();

  return (
    <>
      {step === 1 && <Step1 {...step1} />}
      {step === 2 && <Step2 {...step2} />}
    </>
  );
};
