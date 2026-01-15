import * as S from "./Section.style";
import JSIcon from "../assets/js.svg?url";
import TSIcon from "../assets/ts.svg?url";
import ReactIcon from "../assets/react.svg?url";
import NextIcon from "../assets/next.svg?url";
import { ChapterRanking } from "@/features/chapter-ranking";
import { Link } from "react-router-dom";
import { SectionProgress } from "@/features/section-progress";

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
  return (
    <S.RoadmapContainer>
      <S.RoadmapScrollable>
        <S.SectionItemWrapper>
          {sectionMock.categories.map(category => (
            <S.SectionItemBox key={category}>
              {sectionMock.data
                .filter(item => item.category === category)
                .map(item => (
                  <Link to={`/roadmap/${item.id}`} key={item.id}>
                    <S.SectionItem>
                      <S.SectionIconWrapper>
                        <S.SectionIcon src={item.imgUrl} />
                        {item.completed && <S.SectionComplete />}
                        {item.locked && <S.SectionLock />}
                      </S.SectionIconWrapper>
                      <S.SectionTitle>{item.title}</S.SectionTitle>
                    </S.SectionItem>
                  </Link>
                ))}
            </S.SectionItemBox>
          ))}
        </S.SectionItemWrapper>
        <ChapterRanking page={"section"} />
        <SectionProgress />
      </S.RoadmapScrollable>
    </S.RoadmapContainer>
  );
};
