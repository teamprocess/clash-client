import { FeatureChoice } from "@/features/roadmap";
import { useRoadMap } from "@/features/roadmap/model/useRoadMap";
import { ChoicePage } from "@/pages/roadmap/choice";

export const RoadMapPage = () => {
  const { step, setStep, feature } = useRoadMap();

  return (
    <>
      {step === "FEATURE" && <FeatureChoice {...feature} setStep={setStep} />}
      {step === "TEST" && <div>test</div>}
      {step === "CHOICE" && <ChoicePage />}
    </>
  );
};
