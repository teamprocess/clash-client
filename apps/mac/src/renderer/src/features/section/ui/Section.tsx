import * as S from "./Section.style";
import { ChapterRanking } from "@/features/chapter-ranking";
import { useNavigate } from "react-router-dom";
import { SectionProgress } from "@/features/section-progress";
import { useEffect, useState } from "react";
import { PreviewModal } from "@/features/section/components/PreviewModal";
import { useMajorSectionQuery } from "@/entities/roadmap/section/api/query/useMajorSection.query";
import { MajorEnum, section } from "@/entities/roadmap/section/model/section.types";
import { useGetMyProfile } from "@/entities/user";
import { ConfirmDialog } from "@/shared/ui";
import { SectionItemBox } from "../components/SectionItemBox";
import { majorApi, Major } from "@/entities/major";
import { useQueryClient } from "@tanstack/react-query";
import { useDragScroll } from "@/shared/lib/useDragScroll";

export const Section = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const roadmapScrollProps = useDragScroll<HTMLDivElement>();

  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [isChangeMajorModalOpen, setIsChangeMajorModalOpen] = useState(false);
  const [isChangingMajor, setIsChangingMajor] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [isSelectedSectionLocked, setIsSelectedSectionLocked] = useState(false);
  const { data: myProfile } = useGetMyProfile();
  const major = myProfile?.major as MajorEnum;
  const { data: sectionData } = useMajorSectionQuery(major);

  const majorLabelMap: Partial<Record<MajorEnum, string>> = {
    [MajorEnum.WEB]: "웹",
    [MajorEnum.SERVER]: "서버",
    [MajorEnum.APP]: "앱",
    [MajorEnum.AI]: "AI",
    [MajorEnum.GAME]: "게임",
  };
  const roadmapTitle = majorLabelMap[major] ? `${majorLabelMap[major]} 로드맵` : "로드맵";

  const handleChangeMajor = () => {
    setIsChangeMajorModalOpen(true);
  };

  const handleCloseChangeMajorModal = () => {
    if (isChangingMajor) {
      return;
    }

    setIsChangeMajorModalOpen(false);
  };

  const handleConfirmChangeMajor = async () => {
    setIsChangingMajor(true);

    try {
      await majorApi.postMyMajor({ major: Major.NONE });
      setIsChangeMajorModalOpen(false);
      void queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/roadmap/major-choice");
    } catch (error) {
      console.error("Failed to reset major", error);
    } finally {
      setIsChangingMajor(false);
    }
  };

  const handleClick = (item: section) => {
    setSelectedSectionId(item.id);
    setIsSelectedSectionLocked(item.locked);
    setIsTutorialModalOpen(true);
  };

  const handleStart = () => {
    if (isSelectedSectionLocked) {
      return;
    }

    if (selectedSectionId !== null) {
      navigate(`/roadmap/${selectedSectionId}`);
    }
  };

  useEffect(() => {
    if (major == MajorEnum.NONE) navigate("/roadmap/major-choice");
  }, [major, navigate]);

  return (
    <S.RoadmapContainer>
      <S.RoadmapScrollable {...roadmapScrollProps}>
        <S.SectionItemWrapper>
          {sectionData?.categories.map(category => (
            <SectionItemBox
              key={category}
              category={category}
              sections={sectionData.sections}
              onItemClick={handleClick}
            />
          ))}
        </S.SectionItemWrapper>
      </S.RoadmapScrollable>

      <S.RoadmapTitleBox>
        <S.RoadmapTitle>{roadmapTitle}</S.RoadmapTitle>
        <S.ChangeButton type="button" onClick={handleChangeMajor} aria-label="전공 변경">
          <S.RoadmapTitleArrowIcon />
        </S.ChangeButton>
      </S.RoadmapTitleBox>
      <ChapterRanking page="chapter" />
      <SectionProgress />

      {selectedSectionId !== null && (
        <PreviewModal
          isOpen={isTutorialModalOpen}
          onClose={() => setIsTutorialModalOpen(false)}
          onStart={handleStart}
          isLocked={isSelectedSectionLocked}
          sectionId={selectedSectionId}
        />
      )}
      <ConfirmDialog
        isOpen={isChangeMajorModalOpen}
        title="전공 변경"
        description={
          <>
            전공을 변경하면 전공 선택 페이지로 이동합니다.
            <br />
            지금까지의 로드맵 진행 상황은 저장된 상태로 유지됩니다.
          </>
        }
        confirmMessage="변경을 진행하면 현재 전공을 잃게 됩니다."
        confirmLabel="전공 변경"
        isConfirming={isChangingMajor}
        width={28}
        height={15}
        onClose={handleCloseChangeMajorModal}
        onConfirm={handleConfirmChangeMajor}
      />
    </S.RoadmapContainer>
  );
};
