import * as S from "./Section.style";
import { ChapterRanking } from "@/features/chapter-ranking";
import { useNavigate } from "react-router-dom";
import { SectionProgress } from "@/features/section-progress";
import { useEffect, useState } from "react";
import { LockedModal } from "@/features/section/components/LockedModal";
import { TutorialModal } from "@/features/section/components/TutorialModal";
import { sectionApi } from "@/entities/roadmap/section/api/sectionApi";
import {
  getAllSectionsResponse,
  MajorEnum,
  section,
} from "@/entities/roadmap/section/model/section.types";

export const Section = () => {
  const navigate = useNavigate();
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);
  const [sectionTitle, setSectionTitle] = useState<string>("");

  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);

  const handleClick = (item: section) => {
    if (item.locked) {
      setSectionTitle(item.title);
      setIsLockedModalOpen(true);
      return;
    }

    setSectionTitle(item.title);
    setSelectedSectionId(+item.id);
    setIsTutorialModalOpen(true);
  };

  const [sectionData, setSectionData] = useState<getAllSectionsResponse | null>();

  const fetchData = async () => {
    const myProfile = await sectionApi.getMyProfile();
    const myMajor = myProfile.data?.major as MajorEnum;

    if (!myMajor) {
      console.error("내 전공 정보가 없습니다.");
    }

    const section = await sectionApi.getMajorSection({ major: myMajor });

    return section.data;
  };

  useEffect(() => {
    fetchData().then(data => {
      setSectionData(data);
    });
  }, []);

  return (
    <S.RoadmapContainer>
      <S.RoadmapScrollable>
        <S.SectionItemWrapper>
          {sectionData?.categories.map(category => (
            <S.SectionItemBox key={category}>
              {sectionData?.sections
                .filter(item => item.category === category)
                .map(item => (
                  <S.SectionItem
                    key={item.id}
                    onClick={() => handleClick(item)}
                    style={{
                      cursor: item.locked ? "not-allowed" : "pointer",
                      opacity: item.locked ? 0.5 : 1,
                    }}
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

      <LockedModal
        isOpen={isLockedModalOpen}
        onClose={() => setIsLockedModalOpen(false)}
        roadmapName={sectionTitle}
      />

      <TutorialModal
        isOpen={isTutorialModalOpen}
        onClose={() => setIsTutorialModalOpen(false)}
        onStart={() => {
          if (selectedSectionId !== null) {
            navigate(`/roadmap/${selectedSectionId}`);
          }
        }}
      />
    </S.RoadmapContainer>
  );
};
