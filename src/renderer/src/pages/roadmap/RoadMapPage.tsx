import { useMajorChoice } from "@/features/major-choice/model/useMajorChoice";
import { FeatureChoice, Test, TestResult, MajorChoice, Loading } from "@/features/major-choice";

export const RoadMapPage = () => {
  const { step, setStep, feature, major, test, result } = useMajorChoice();

  return (
    <>
      {step === "FEATURE" && <FeatureChoice {...feature} setStep={setStep} />}
      {step === "TEST" && <Test {...test} />}
      {step === "LOADING" && <Loading />}
      {step === "RESULT" && <TestResult {...result} />}
      {step === "CHOICE" && <MajorChoice {...major} />}
    </>
  );
};
