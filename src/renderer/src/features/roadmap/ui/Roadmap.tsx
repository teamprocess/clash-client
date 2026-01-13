import * as S from "./Roadmap.style";
import JSIcon from "../assets/js.svg?url";
import TSIcon from "../assets/ts.svg?url";
import ReactIcon from "../assets/react.svg?url";
import NextIcon from "../assets/next.svg?url";
import Profile from "../assets/profile.svg?url";
import React, { useEffect, useRef, useState } from "react";

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

const rankingResponse = {
  data: {
    myRanking: {
      rank: 12,
      id: 12,
      name: "배수아",
      completedChapterCount: 78,
    },
    allRankers: [
      { rank: 1, id: 1, name: "김민준", completedChapterCount: 100 },
      { rank: 2, id: 2, name: "이서연", completedChapterCount: 98 },
      { rank: 3, id: 3, name: "박지훈", completedChapterCount: 96 },
      { rank: 4, id: 4, name: "최유진", completedChapterCount: 94 },
      { rank: 5, id: 5, name: "정도현", completedChapterCount: 92 },
      { rank: 6, id: 6, name: "한예린", completedChapterCount: 90 },
      { rank: 7, id: 7, name: "오세훈", completedChapterCount: 88 },
      { rank: 8, id: 8, name: "윤지우", completedChapterCount: 86 },
      { rank: 9, id: 9, name: "장민수", completedChapterCount: 84 },
      { rank: 10, id: 10, name: "서하늘", completedChapterCount: 82 },
      { rank: 11, id: 11, name: "문준혁", completedChapterCount: 80 },
      { rank: 12, id: 12, name: "배수아", completedChapterCount: 78 },
      { rank: 13, id: 13, name: "신도윤", completedChapterCount: 76 },
      { rank: 14, id: 14, name: "김예은", completedChapterCount: 74 },
      { rank: 15, id: 15, name: "류현우", completedChapterCount: 72 },
      { rank: 16, id: 16, name: "조하린", completedChapterCount: 70 },
      { rank: 17, id: 17, name: "임재원", completedChapterCount: 68 },
      { rank: 18, id: 18, name: "노아린", completedChapterCount: 66 },
      { rank: 19, id: 19, name: "강도윤", completedChapterCount: 64 },
      { rank: 20, id: 20, name: "백지민", completedChapterCount: 62 },
    ],
  },
};

export const Roadmap = () => {
  const [isMyRankVisible, setIsMyRankVisible] = React.useState(true);
  const [stickyPosition, setStickyPosition] = useState<"top" | "bottom">("bottom");
  const myRankRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null); // 리스트 컨테이너 참조

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMyRankVisible(entry.isIntersecting);

        if (entry.rootBounds) {
          const entryCenter = entry.boundingClientRect.top + entry.boundingClientRect.height / 2;
          const rootCenter = entry.rootBounds.top + entry.rootBounds.height / 2;

          if (entryCenter < rootCenter) {
            setStickyPosition("top");
          } else {
            setStickyPosition("bottom");
          }
        }
      },
      {
        root: listRef.current,
        threshold: 1,
      }
    );

    if (myRankRef.current) {
      observer.observe(myRankRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const myData = rankingResponse.data.myRanking;

  return (
    <S.RoadmapContainer>
      <S.RoadmapScrollable>
        <S.SectionItemWrapper>
          {sectionMock.categories.map(category => (
            <S.SectionItemBox key={category}>
              {sectionMock.data
                .filter(item => item.category === category)
                .map(item => (
                  <S.SectionItem key={item.id}>
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
        <S.RankingContainer>
          <S.RankingLabel>챕터 랭킹</S.RankingLabel>
          <S.RankingBox>
            <S.RankingTop3Box>
              {rankingResponse.data.allRankers
                .filter(user => user.rank <= 3)
                .sort((a, b) => {
                  const order = { 2: 0, 1: 1, 3: 2 };
                  return order[a.rank] - order[b.rank];
                })
                .map(user => (
                  <S.Top3RankerCard key={user.id}>
                    <S.RankFrameWrapper $rank={user.rank}>
                      {user.rank === 1 && <S.FirstFrame />}
                      {user.rank === 2 && <S.SecondFrame />}
                      {user.rank === 3 && <S.ThirdFrame />}
                      <S.Top3ProfileImage src={Profile} $isFirst={user.rank === 1} />
                    </S.RankFrameWrapper>
                    <S.RankerBottom>
                      <S.RankerName>{user.name}</S.RankerName>
                      <S.RankerUserChapterLabel>
                        <S.CompletedChapterCount $countColor={user.rank}>
                          {user.completedChapterCount}
                        </S.CompletedChapterCount>
                        개 완료
                      </S.RankerUserChapterLabel>
                    </S.RankerBottom>
                  </S.Top3RankerCard>
                ))}
            </S.RankingTop3Box>
            <S.RankingList className="ranking-list-root" ref={listRef}>
              {rankingResponse.data.allRankers
                .filter(user => user.rank > 3)
                .map(user => {
                  const isMe = user.id === myData.id;
                  return (
                    <S.RankingItem key={user.id} ref={isMe ? myRankRef : null} $isMe={isMe}>
                      <S.ItemLeft>
                        <S.Ranking>{user.rank}</S.Ranking>
                        <S.UserBox>
                          <S.RankingUserProfile src={Profile} />
                          <S.RankingUsername>{user.name}</S.RankingUsername>
                        </S.UserBox>
                      </S.ItemLeft>
                      <S.ItemRight>
                        <S.RankingChapter>{user.completedChapterCount}</S.RankingChapter>개 완료
                      </S.ItemRight>
                    </S.RankingItem>
                  );
                })}
              {!isMyRankVisible && (
                <S.MyRankingItem $position={stickyPosition}>
                  <S.ItemLeft>
                    <S.Ranking>{myData.rank}</S.Ranking>
                    <S.UserBox>
                      <S.RankingUserProfile src={Profile} />
                      <S.RankingUsername>{myData.name}</S.RankingUsername>
                    </S.UserBox>
                  </S.ItemLeft>
                  <S.ItemRight>
                    <S.RankingChapter>{myData.completedChapterCount}</S.RankingChapter>개 완료
                  </S.ItemRight>
                </S.MyRankingItem>
              )}
            </S.RankingList>
          </S.RankingBox>
        </S.RankingContainer>
        <S.SectionProgressContainer>
          <S.ProgressInfoBox>
            <S.RoadmapIcon />
            <S.StepCount>
              <span style={{ color: "red" }}>3</span> / 50
            </S.StepCount>
          </S.ProgressInfoBox>
          <S.ProgressBarWrapper>
            <S.BarBackground>
              <S.BarActive $fill={40} />
            </S.BarBackground>
            <S.PercentText>40%</S.PercentText>
          </S.ProgressBarWrapper>
        </S.SectionProgressContainer>
      </S.RoadmapScrollable>
    </S.RoadmapContainer>
  );
};
