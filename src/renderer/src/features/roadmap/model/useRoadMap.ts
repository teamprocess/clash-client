import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type FeatureItem = "TEST" | "CHOICE" | null;
export type MajorItem = "WEB" | "APP" | "SERVER" | "AI" | "GAME" | null;

export const useRoadMap = () => {
  // 로드맵 페이지 컴포넌트 step useState
  const [step, setStep] = useState("FEATURE");

  // Feature Choice 컴포넌트
  const [selected, setSelected] = useState<FeatureItem>(null);
  const select = (path: FeatureItem) => setSelected(path);

  // Major Choice 컴포넌트
  const navigate = useNavigate();

  const [major, setMajor] = useState<MajorItem>(null);

  const selectedMajor = (path: MajorItem) => setMajor(path);

  const submit = () => {
    navigate("/");
  };

  return {
    feature: {
      selected,
      select,
      username: "조상철",
      isValid: selected !== null,
    },
    step,
    setStep,
    major: {
      selectedMajor,
      isValid: major !== null,
      submit,
      major,
    },
  };
};
