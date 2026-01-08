import * as S from "./Ranking.style";
import { useState, useEffect, useRef, forwardRef } from "react";

type User = {
  id: number;
  name: string;
  mention: string;
  point: number;
};

type UserRankingProps = {
  user: User;
  rank: number;
  isSticky?: boolean;
};

const CURRENT_USER_ID = 12;

export const Ranking = () => {
  const [selectedSort, setSelectedSort] = useState("EXP");
  const [selectedPeriod, setSelectedPeriod] = useState("이번주");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentUserRef = useRef<HTMLDivElement>(null);

  const [stickyState, setStickyState] = useState<"top" | "bottom" | "none">("none");

  const userList: User[] = [
    { id: 1, name: "멧돼지", mention: "seunga_418", point: 4219 },
    { id: 2, name: "채근영", mention: "chaeyn", point: 2147483647 },
    { id: 3, name: "한승환", mention: "h.7xn", point: 3074 },
    { id: 4, name: "권대형", mention: "gorani", point: 2126 },
    { id: 5, name: "김민수", mention: "mins_k", point: 1980 },
    { id: 6, name: "박지훈", mention: "park.jh", point: 1875 },
    { id: 7, name: "이서연", mention: "seoyeon_lee", point: 1760 },
    { id: 8, name: "정우진", mention: "wj_jung", point: 1698 },
    { id: 9, name: "최윤아", mention: "yuna_c", point: 1584 },
    { id: 10, name: "오현준", mention: "ohj_dev", point: 1490 },
    { id: 11, name: "강도윤", mention: "doyoon_k", point: 1375 },
    { id: 12, name: "조상철", mention: "sir0n", point: -2147483648 },
    { id: 13, name: "문태현", mention: "taehyun_m", point: 1190 },
    { id: 14, name: "유지호", mention: "jiho_y", point: 1085 },
    { id: 15, name: "유지호", mention: "jiho_y", point: 1085 },
    { id: 16, name: "유지호", mention: "jiho_y", point: 1085 },
    { id: 17, name: "유지호", mention: "jiho_y", point: 1085 },
    { id: 18, name: "유지호", mention: "jiho_y", point: 1085 },
    { id: 19, name: "유지호", mention: "jiho_y", point: 1085 },
  ];

  const currentUser = userList.find(u => u.id === CURRENT_USER_ID)!;
  const currentUserRank = userList.findIndex(u => u.id === CURRENT_USER_ID) + 1;

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current || !currentUserRef.current) return;

      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const userRect = currentUserRef.current.getBoundingClientRect();

      if (userRect.bottom < wrapperRect.top) {
        setStickyState("top");
      } else if (userRect.top > wrapperRect.bottom) {
        setStickyState("bottom");
      } else {
        setStickyState("none");
      }
    };

    const wrapper = wrapperRef.current;
    wrapper?.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      wrapper?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.RankingContainer>
      <S.TitleBox>
        <S.Title>우리 학교 랭킹</S.Title>
        <S.DropDownBox>
          <S.SelectWrapper>
            <S.Select value={selectedSort} onChange={e => setSelectedSort(e.target.value)}>
              {["EXP", "Github", "solved.ac", "총 학습 시간"].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>
          <S.SelectWrapper>
            <S.Select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)}>
              {["이번주", "이번달", "이번 시즌"].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>
        </S.DropDownBox>
      </S.TitleBox>

      <S.Line />

      <S.UserWrapper ref={wrapperRef}>
        {userList.map((user, index) => (
          <UserRanking
            key={user.id}
            user={user}
            rank={index + 1}
            ref={user.id === CURRENT_USER_ID ? currentUserRef : null}
          />
        ))}
      </S.UserWrapper>

      {stickyState !== "none" && (
        <S.StickyUser $position={stickyState}>
          <UserRanking user={currentUser} rank={currentUserRank} isSticky />
        </S.StickyUser>
      )}
    </S.RankingContainer>
  );
};

export const UserRanking = forwardRef<HTMLDivElement, UserRankingProps>(
  ({ user, rank, isSticky }, ref) => {
    return (
      <S.UserContainer ref={ref} $sticky={isSticky}>
        <S.Content>
          <S.Rank $rank={rank}>{rank}</S.Rank>

          <S.ProfileContent>
            <S.ProfileIcon />
            <S.NameBox>
              <S.ProfileName>{user.name}</S.ProfileName>
              <S.ProfileMention>(@{user.mention})</S.ProfileMention>
            </S.NameBox>
            {rank <= 3 && <S.RivalMention>RIVAL</S.RivalMention>}
          </S.ProfileContent>
        </S.Content>

        <S.Point>{user.point.toLocaleString()} 포인트</S.Point>
      </S.UserContainer>
    );
  }
);

UserRanking.displayName = "UserRanking";
