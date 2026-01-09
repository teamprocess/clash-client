import * as S from "./Roadmap.style";
import JSIcon from "../assets/js.svg?url";
import TSIcon from "../assets/ts.svg?url";
import ReactIcon from "../assets/react.svg?url";
import NextIcon from "../assets/next.svg?url";
import Profile from "../assets/profile.svg?url";

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
      completed: true,
      locked: false,
    },
    {
      id: 5,
      category: "react",
      title: "리액트 초급",
      imgUrl: ReactIcon,
      completed: false,
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

const userList = [
  { id: 1, ranking: 1, username: "김민준", completedChapterCount: 100 },
  { id: 2, ranking: 2, username: "이서연", completedChapterCount: 98 },
  { id: 3, ranking: 3, username: "박지훈", completedChapterCount: 96 },
  { id: 4, ranking: 4, username: "최유진", completedChapterCount: 94 },
  { id: 5, ranking: 5, username: "정도현", completedChapterCount: 92 },
  { id: 6, ranking: 6, username: "한예린", completedChapterCount: 90 },
  { id: 7, ranking: 7, username: "오세훈", completedChapterCount: 88 },
  { id: 8, ranking: 8, username: "윤지우", completedChapterCount: 86 },
  { id: 9, ranking: 9, username: "장민수", completedChapterCount: 84 },
  { id: 10, ranking: 10, username: "서하늘", completedChapterCount: 82 },
  { id: 11, ranking: 11, username: "문준혁", completedChapterCount: 80 },
  { id: 12, ranking: 12, username: "배수아", completedChapterCount: 78 },
  { id: 13, ranking: 13, username: "신도윤", completedChapterCount: 76 },
  { id: 14, ranking: 14, username: "김예은", completedChapterCount: 74 },
  { id: 15, ranking: 15, username: "류현우", completedChapterCount: 72 },
  { id: 16, ranking: 16, username: "조하린", completedChapterCount: 70 },
  { id: 17, ranking: 17, username: "임재원", completedChapterCount: 68 },
  { id: 18, ranking: 18, username: "노아린", completedChapterCount: 66 },
  { id: 19, ranking: 19, username: "강도윤", completedChapterCount: 64 },
  { id: 20, ranking: 20, username: "백지민", completedChapterCount: 62 },
];

export const Roadmap = () => {
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
              {userList
                .filter(user => user.ranking <= 3)
                .map(user => (
                  <S.RankingUser key={user.id}>{user.username}</S.RankingUser>
                ))}
            </S.RankingTop3Box>
            <S.RankingList>
              {userList
                .filter(user => user.ranking > 3)
                .map(user => (
                  <S.RankingItem key={user.id}>
                    <S.ItemLeft>
                      <S.Ranking>{user.ranking}</S.Ranking>
                      <S.UserBox>
                        <S.RankingUserProfile src={Profile} />
                        <S.RankingUsername>{user.username}</S.RankingUsername>
                      </S.UserBox>
                    </S.ItemLeft>
                    <S.ItemRight>
                      <S.RankingChapter>{user.completedChapterCount}</S.RankingChapter>개 완료
                    </S.ItemRight>
                  </S.RankingItem>
                ))}
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
