import * as S from "./Section.style";
import { ChapterRanking } from "@/features/chapter-ranking";
import { useNavigate } from "react-router-dom";
import { SectionProgress } from "@/features/section-progress";
import { useEffect, useState } from "react";
import { PreviewModal } from "@/features/section/components/PreviewModal";
import { useMajorSectionQuery } from "@/entities/roadmap/section/api/query/useMajorSection.query";
import { MajorEnum, section } from "@/entities/roadmap/section/model/section.types";
import { useGetMyProfile } from "@/entities/user";
import { SectionItemBox } from "../components/SectionItemBox";
import { useDragScroll } from "@/shared/lib/useDragScroll";

export const Section = () => {
  const navigate = useNavigate();
  const roadmapScrollProps = useDragScroll<HTMLDivElement>();

  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
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
    navigate("/roadmap/major-choice");
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
    </S.RoadmapContainer>
  );
};
