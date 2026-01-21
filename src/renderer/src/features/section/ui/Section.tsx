import * as S from "./Section.style";
import { ChapterRanking } from "@/features/chapter-ranking";
import { useNavigate } from "react-router-dom";
import { SectionProgress } from "@/features/section-progress";
import { useEffect, useState } from "react";
import { LockedModal } from "@/features/section/components/LockedModal";
import { TutorialModal } from "@/features/section/components/TutorialModal";
import {
  getAllSectionsResponse,
  MajorEnum,
  section,
  sectionApi,
} from "@/entities/roadmap/section/api/sectionApi";

// const sectionMock = {
//   data: [
//     {
//       id: 1,
//       category: "javascript",
//       title: "자바스크립트 고급",
//       imgUrl: JSIcon,
//       completed: true,
//       locked: false,
//     },
//     {
//       id: 2,
//       category: "javascript",
//       title: "자바스크립트 중급",
//       imgUrl: JSIcon,
//       completed: true,
//       locked: false,
//     },
//     {
//       id: 3,
//       category: "javascript",
//       title: "자바스크립트 초급",
//       imgUrl: JSIcon,
//       completed: true,
//       locked: false,
//     },
//     {
//       id: 4,
//       category: "react",
//       title: "리액트 중급",
//       imgUrl: ReactIcon,
//       completed: false,
//       locked: false,
//     },
//     {
//       id: 5,
//       category: "react",
//       title: "리액트 초급",
//       imgUrl: ReactIcon,
//       completed: true,
//       locked: false,
//     },
//     {
//       id: 6,
//       category: "typescript",
//       title: "타입스크립트 고급",
//       imgUrl: TSIcon,
//       completed: false,
//       locked: false,
//     },
//     {
//       id: 7,
//       category: "typescript",
//       title: "타입스크립트 중급",
//       imgUrl: TSIcon,
//       completed: false,
//       locked: false,
//     },
//     {
//       id: 8,
//       category: "typescript",
//       title: "타입스크립트 초급",
//       imgUrl: TSIcon,
//       completed: false,
//       locked: false,
//     },
//     {
//       id: 9,
//       category: "nextjs",
//       title: "넥스트 초급",
//       imgUrl: NextIcon,
//       completed: false,
//       locked: true,
//     },
//     {
//       id: 10,
//       category: "react-native",
//       title: "rn 초급",
//       imgUrl: NextIcon,
//       completed: false,
//       locked: true,
//     },
//     {
//       id: 11,
//       category: "electron",
//       title: "electron 초급",
//       imgUrl: NextIcon,
//       completed: false,
//       locked: true,
//     },
//   ],
//   categories: ["javascript", "react", "typescript", "nextjs", "react-native", "electron"],
// };

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
  console.log(sectionData);

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
