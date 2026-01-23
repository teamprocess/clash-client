import { useEffect, useState } from "react";
import { PreviewData } from "../mocks/PreviewData";
import { useNavigate } from "react-router-dom";

export const usePreview = (preview: PreviewData) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/roadmap");
  }, [navigate]);

  const [currentStep, setCurrentStep] = useState(1);

  const activeStep = preview.steps.find(step => step.id === currentStep);
  const totalSteps = preview.steps.length;

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return {
    currentStep,
    activeStep,
    totalSteps,
    handlePrev,
    handleNext,
  };
};
