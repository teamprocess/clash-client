import * as S from "./Section.style";
import JSIcon from "../assets/js.svg?url";
import TSIcon from "../assets/ts.svg?url";
import ReactIcon from "../assets/react.svg?url";
import NextIcon from "../assets/next.svg?url";
import { ChapterRanking } from "@/features/chapter-ranking";
import { useNavigate } from "react-router-dom";
import { SectionProgress } from "@/features/section-progress";
import { useState } from "react";
import { LockedModal } from "@/features/section/components/LockedModal";
import { TutorialModal } from "@/features/section/components/TutorialModal";

const sectionMock = {
  data: [
    {
      id: 1,
      category: "javascript",
      title: "자바스크립트 고급",
      imgUrl: JSIcon,
      completed: true,
      locked: false,
    },
    {
      id: 2,
      category: "javascript",
      title: "자바스크립트 중급",
      imgUrl: JSIcon,
      completed: true,
      locked: false,
    },
    {
      id: 3,
      category: "javascript",
      title: "자바스크립트 초급",
      imgUrl: JSIcon,
      completed: true,
      locked: false,
    },
    {
      id: 4,
      category: "react",
      title: "리액트 중급",
      imgUrl: ReactIcon,
      completed: false,
      locked: false,
    },
    {
      id: 5,
      category: "react",
      title: "리액트 초급",
      imgUrl: ReactIcon,
      completed: true,
      locked: false,
    },
    {
      id: 6,
      category: "typescript",
      title: "타입스크립트 고급",
      imgUrl: TSIcon,
      completed: false,
      locked: false,
    },
    {
      id: 7,
      category: "typescript",
      title: "타입스크립트 중급",
      imgUrl: TSIcon,
      completed: false,
      locked: false,
    },
    {
      id: 8,
      category: "typescript",
      title: "타입스크립트 초급",
      imgUrl: TSIcon,
      completed: false,
      locked: false,
    },
    {
      id: 9,
      category: "nextjs",
      title: "넥스트 초급",
      imgUrl: NextIcon,
      completed: false,
      locked: true,
    },
    {
      id: 10,
      category: "react-native",
      title: "rn 초급",
      imgUrl: NextIcon,
      completed: false,
      locked: true,
    },
    {
      id: 11,
      category: "electron",
      title: "electron 초급",
      imgUrl: NextIcon,
      completed: false,
      locked: true,
    },
  ],
  categories: ["javascript", "react", "typescript", "nextjs", "react-native", "electron"],
};

export const Section = () => {
  const navigate = useNavigate();
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);
  const [sectionTitle, setSectionTitle] = useState<string>("");

  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);

  const handleClick = (item: (typeof sectionMock.data)[number]) => {
    if (item.locked) {
      setSectionTitle(item.title);
      setIsLockedModalOpen(true);
      return;
    }

    setSectionTitle(item.title);
    setSelectedSectionId(item.id);
    setIsTutorialModalOpen(true);
  };

  return (
    <S.RoadmapContainer>
      <S.RoadmapScrollable>
        <S.SectionItemWrapper>
          {sectionMock.categories.map(category => (
            <S.SectionItemBox key={category}>
              {sectionMock.data
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
                      <S.SectionIcon src={item.imgUrl} />
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
        title={sectionTitle}
      />
    </S.RoadmapContainer>
  );
};
