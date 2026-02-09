import * as S from "./Section.style";
import { ChapterRanking } from "@/features/chapter-ranking";
import { useNavigate } from "react-router-dom";
import { SectionProgress } from "@/features/section-progress";
import { useEffect, useState } from "react";
import { PreviewModal } from "@/features/section/components/PreviewModal";
import { useMajorSectionQuery } from "@/entities/roadmap/section/api/query/useMajorSection.query";
import { MajorEnum, section } from "@/entities/roadmap/section/model/section.types";
import { useGetMyProfile } from "@/entities/user";

export const Section = () => {
  const navigate = useNavigate();

  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [isSelectedSectionLocked, setIsSelectedSectionLocked] = useState(false);
  const { data: myProfile } = useGetMyProfile();
  const major = myProfile?.major as MajorEnum | undefined;
  const { data: sectionResponse } = useMajorSectionQuery(major);
  const sectionData = sectionResponse?.data ?? undefined;

  const handleClick = (item: section) => {
    setSelectedSectionId(+item.id);
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
      <S.RoadmapScrollable>
        <S.SectionItemWrapper>
          {sectionData?.categories.map(category => (
            <S.SectionItemBox key={category}>
              {sectionData.sections
                .filter(item => item.category === category)
                .map(item => (
                  <S.SectionItem
                    key={item.id}
                    onClick={() => handleClick(item)}
                    style={{ opacity: item.locked ? 0.5 : 1 }}
                  >
                    <S.SectionIconWrapper>
                      {/*서버로부터 사진 연결 전 임시로 null*/}
                      <S.SectionIcon src={"null"} />
                      {item.completed && <S.SectionComplete />}
                      {item.locked && <S.SectionLock />}
                    </S.SectionIconWrapper>
                    <S.SectionTitle>{item.title}</S.SectionTitle>
                  </S.SectionItem>
                ))}
            </S.SectionItemBox>
          ))}
        </S.SectionItemWrapper>

        <ChapterRanking page="section" />
        <SectionProgress />
      </S.RoadmapScrollable>

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
