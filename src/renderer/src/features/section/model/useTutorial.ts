import { useEffect, useState } from "react";
import { TutorialData } from "../mocks/tutorialData";
import { useNavigate } from "react-router-dom";

export const useTutorial = (tutorial: TutorialData) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/roadmap");
  }, [navigate]);

  const [currentStep, setCurrentStep] = useState(1);

  const activeStep = tutorial.steps.find(step => step.id === currentStep);
  const totalSteps = tutorial.steps.length;

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
