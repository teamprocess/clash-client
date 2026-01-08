import { useRoadMap } from "@/features/roadmap/model/useRoadMap";
import { FeatureChoice, Test, TestResult, MajorChoice, Loading } from "@/features/roadmap";

export const RoadMapPage = () => {
  const { step, setStep, feature, major, test, result } = useRoadMap();

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
