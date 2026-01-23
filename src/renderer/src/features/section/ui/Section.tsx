import * as S from "./Section.style";
import { ChapterRanking } from "@/features/chapter-ranking";
import { useNavigate } from "react-router-dom";
import { SectionProgress } from "@/features/section-progress";
import { useEffect, useState } from "react";
import { PreviewModal } from "@/features/section/components/PreviewModal";
import { sectionApi } from "@/entities/roadmap/section/api/sectionApi";
import {
  getAllSectionsResponse,
  MajorEnum,
  section,
} from "@/entities/roadmap/section/model/section.types";

export const Section = () => {
  const navigate = useNavigate();

  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [isSelectedSectionLocked, setIsSelectedSectionLocked] = useState(false);

  const [sectionData, setSectionData] = useState<getAllSectionsResponse | null>();

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

  const fetchData = async () => {
    const myProfile = await sectionApi.getMyProfile();
    const myMajor = myProfile.data?.major as MajorEnum;
    const section = await sectionApi.getMajorSection({ major: myMajor });
    return section.data;
  };

  useEffect(() => {
    fetchData().then(data => setSectionData(data));
  }, []);

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

      <PreviewModal
        isOpen={isTutorialModalOpen}
        onClose={() => setIsTutorialModalOpen(false)}
        onStart={handleStart}
        isLocked={isSelectedSectionLocked}
      />
    </S.RoadmapContainer>
  );
};
