import {
  FeatureChoice,
  Loading,
  MajorChoice,
  Test,
  TestResult,
  useMajorChoice,
} from "@/features/major-choice";

export const RoadmapMajorChoicePage = () => {
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
