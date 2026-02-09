import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PreviewData,
  GetSectionPreviewResponse,
} from "@/entities/roadmap/section/preview/model/preview.types";
import { previewApi } from "@/entities/roadmap/section/preview/api/previewApi";

const transformPreviewData = (serverData: GetSectionPreviewResponse): PreviewData => {
  return {
    id: serverData.id,
    title: serverData.title,
    intro: serverData.description,
    steps: serverData.chapters.map((chapter, index) => ({
      id: index + 1,
      tooltip: chapter.title,
      description: chapter.description,
    })),
    targets: serverData.keyPoints,
  };
};

export const usePreview = (sectionId: number) => {
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    navigate("/roadmap");
  }, [navigate]);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await previewApi.getSectionPreview(sectionId);

        if (response.success && response.data) {
          const transformed = transformPreviewData(response.data);
          setPreviewData(transformed);
        } else {
          setError(response.message || "Failed to load preview");
        }
      } catch (error: unknown) {
        console.error("섹션 미리보기를 불러오는데 실패했습니다:", error);
        setError(
          error instanceof Error ? error.message : "섹션 미리보기를 불러오는데 실패했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [sectionId]);

  const activeStep = previewData?.steps.find(step => step.id === currentStep);
  const totalSteps = previewData?.steps.length || 0;

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
    previewData,
    loading,
    error,
    currentStep,
    activeStep,
    totalSteps,
    handlePrev,
    handleNext,
  };
};
