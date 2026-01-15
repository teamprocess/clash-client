import { useState, useRef, useEffect } from "react";

// Transition
interface transitionData {
  yesterday: number;
  today: number;
}

const activeTransitionData: transitionData = {
  // 초단위 ~> 시간단위표기 함수사용 예정
  yesterday: 21522,
  today: 53608,
};

const commitTransitionData: transitionData = {
  yesterday: 27,
  today: 34,
};

// Active
export type UserStatus = "ONLINE" | "AWAY" | "OFFLINE";

type CommitDay = {
  id: number;
  count: number;
};

const commitDays: CommitDay[] = Array.from({ length: 365 }, (_, i) => ({
  id: i + 1,
  count: Math.floor(Math.random() * 10),
}));

const months: { id: number; commit_count: number }[] = [
  { id: 1, commit_count: 31 },
  { id: 2, commit_count: 41 },
  { id: 3, commit_count: 23 },
  { id: 4, commit_count: 12 },
  { id: 5, commit_count: 25 },
  { id: 6, commit_count: 7 },
  { id: 7, commit_count: 12 },
  { id: 8, commit_count: 9 },
  { id: 9, commit_count: 11 },
  { id: 10, commit_count: 12 },
  { id: 11, commit_count: 19 },
  { id: 12, commit_count: 21 },
];

// Rival

interface RivalUser {
  name: string;
  username: string;
  profile_image: string;
  active_time: number;
  using_app: string;
  status: UserStatus;
}

export interface RivalsProps {
  user: RivalUser;
  getStatus: (status: UserStatus) => string;
}

export interface RivalsResponse {
  data: {
    my_rivals: RivalUser[];
  };
}

const RivalsData: RivalsResponse = {
  data: {
    my_rivals: [
      {
        name: "멧돼지",
        username: "seunga_418",
        profile_image: "https://example.com/profile/seunga_418.png",
        active_time: 21522,
        using_app: "VSCode",
        status: "ONLINE",
      },
      {
        name: "채근영",
        username: "chaeyn",
        profile_image: "https://example.com/profile/chaeyn.png",
        active_time: 18340,
        using_app: "IntelliJ",
        status: "AWAY",
      },
      // {
      //   name: "한승환",
      //   username: "h.7xn",
      //   profile_image: "https://example.com/profile/h7xn.png",
      //   active_time: 9720,
      //   using_app: "Chrome",
      //   status: "OFFLINE",
      // },
      // {
      //   name: "권대형",
      //   username: "gorani",
      //   profile_image: "https://example.com/profile/gorani.png",
      //   active_time: 14380,
      //   using_app: "Notion",
      //   status: "ONLINE",
      // },
    ],
  },
};

// Ranking
type User = {
  id: number;
  name: string;
  mention: string;
  point: number;
};

export interface UserRankingProps {
  user: User;
  rank: number;
  isSticky?: boolean;
}

const CURRENT_USER_ID = 12;

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

export const useHome = () => {
  // Transition
  const transitionMaxCommit = Math.max(commitTransitionData.yesterday, commitTransitionData.today);
  const maxActive = Math.max(activeTransitionData.yesterday, activeTransitionData.today);

  // Rival
  const getStatus = (status: UserStatus) => {
    switch (status) {
      case "ONLINE":
        return "온라인";
      case "AWAY":
        return "자리비움";
      case "OFFLINE":
        return "오프라인";
      default:
        return "";
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setRivalSelectedId([]);
  };

  const [rivalSelectedId, setRivalSelectedId] = useState<string[]>([]);

  const handleUserSelect = (name: string) => {
    const currentRivalCount = RivalsData.data.my_rivals.length;

    const maxAvailableSlots = 4 - currentRivalCount;

    setRivalSelectedId(prev => {
      if (prev.includes(name)) {
        return prev.filter(item => item !== name);
      }

      if (prev.length < maxAvailableSlots) {
        return [...prev, name];
      } else {
        return prev;
      }
    });
  };

  const handleModalClose = () => {
    setRivalSelectedId([]); // 선택된 리스트 비우기
    handleClose(); // 기존 모달 닫기 로직 실행
  };

  // Active
  const activeMaxCommit = Math.max(...months.map(m => m.commit_count));

  const [ActiveDropdown, setActiveDropdown] = useState("Github");

  const MaxCommit = Math.max(...commitDays.map(d => d.count));

  const getLevel = (count: number): number => {
    if (count === 0) return 0;

    const ratio: number = count / MaxCommit;

    const ratioResult = ratio * 10;

    if (ratioResult >= 8) return 4;
    if (ratioResult >= 6) return 3;
    if (ratioResult >= 2) return 2;
    if (ratioResult > 0) return 1;
    return 0;
  };

  // Ranking
  const [RankingDropdown, setRankingDropdown] = useState("EXP");
  const [RankingPeriodDropdown, setRankingPeriodDropdown] = useState("이번주");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentUserRef = useRef<HTMLDivElement>(null);

  // Ranking - Sticky
  const [stickyState, setStickyState] = useState<"top" | "bottom" | "none">("none");

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

  return {
    transition: {
      activeTransitionData,
      commitTransitionData,
      transitionMaxCommit,
      maxActive,
    },
    rival: {
      RivalsData,
      getStatus,
      modalOpen,
      setModalOpen,
      handleOpen,
      handleClose,
      userList,
      rivalSelectedId,
      handleUserSelect,
      handleModalClose,
      // selectedCount: rivalSelectedId.length,
      // maxSelectableCount: 4 - RivalsData.data.my_rivals.length,
    },
    active: {
      commitDays,
      months,
      activeMaxCommit,
      ActiveDropdown,
      setActiveDropdown,
      getLevel,
    },
    ranking: {
      CURRENT_USER_ID,
      RankingDropdown,
      setRankingDropdown,
      RankingPeriodDropdown,
      setRankingPeriodDropdown,
      wrapperRef,
      currentUserRef,
      userList,
      stickyState,
      currentUser,
      currentUserRank,
    },
  };
};

export type UseHomeReturn = ReturnType<typeof useHome>;
export type TransitionProps = UseHomeReturn["transition"];
export type RivalProps = UseHomeReturn["rival"];
export type ActiveProps = UseHomeReturn["active"];
export type RankingProps = UseHomeReturn["ranking"];
