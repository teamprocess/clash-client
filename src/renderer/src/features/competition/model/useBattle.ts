import { useState, useMemo } from "react";

type UpperHand = "우세" | "열세" | "동률";

interface Rival {
  name: string;
  username: string;
  totalRate: number;
}

/** ================== 더미 데이터 ================== */
const RIVAL_DUMMY_DATA: Rival[] = [
  { name: "나", username: "me", totalRate: 120 },
  { name: "철수", username: "chulsoo", totalRate: 80 },
  { name: "영희", username: "younghee", totalRate: 150 },
  { name: "민수", username: "minsoo", totalRate: 100 },
];

/** ================== 드롭다운 ================== */
const competitionDropDownValue = [
  { key: "YesterDay", label: "어제" },
  { key: "LastWeek", label: "일주일 전" },
  { key: "LastMonth", label: "한달 전" },
  { key: "LastSeason", label: "전 시즌" },
];

const competitionPeriodDropDownValue = [
  { key: "EXP", label: "EXP" },
  { key: "Github", label: "Github" },
  { key: "Solved.Ac", label: "solved.ac" },
  { key: "StudyTime", label: "총 학습 시간" },
];

export const useBattle = () => {
  /** ================== modal ================== */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /** ================== battle target ================== */
  const [battleTargetUsername, setBattleTargetUsername] = useState<string | null>(null);

  const selectBattleTarget = (username: string) => {
    setBattleTargetUsername(username);
  };

  /** ================== rivals ================== */
  const rivals = RIVAL_DUMMY_DATA;

  const me = useMemo(() => rivals.find(r => r.username === "me"), [rivals]);

  const battleRivals = useMemo(() => rivals.filter(r => r.username !== "me"), [rivals]);

  const selectedRival = useMemo(
    () => rivals.find(r => r.username === battleTargetUsername),
    [rivals, battleTargetUsername]
  );

  const rivalValue = selectedRival?.totalRate ?? 0;
  const myValue = me?.totalRate ?? 0;

  const total = rivalValue + myValue;

  const rivalPercent = total === 0 ? 50 : (rivalValue / total) * 100;
  const myPercent = 100 - rivalPercent;

  const judgeUpperHand = (rivalUsername: string): UpperHand => {
    const rival = rivals.find(r => r.username === rivalUsername);
    if (!rival || !me) return "동률";

    if (me.totalRate > rival.totalRate) return "우세";
    if (me.totalRate < rival.totalRate) return "열세";
    return "동률";
  };

  const [rivalSelectedId, setRivalSelectedId] = useState<string | null>(null);

  const handleUserSelect = (username: string) => {
    setRivalSelectedId(prev => (prev === username ? null : username));
  };

  /** ================== dropdown ================== */
  const [competitionDropdown, setCompetitionDropdown] = useState("어제");

  return {
    battle: {
      // modal
      isModalOpen,
      openModal,
      closeModal,

      // target
      battleTargetUsername,
      selectBattleTarget,

      // rivals
      rivals,
      battleRivals,
      selectedRival,
      me,

      // compare
      rivalValue,
      myValue,
      rivalPercent,
      myPercent,
      judgeUpperHand,

      // modal select
      rivalSelectedId,
      handleUserSelect,

      // dropdown
      competitionDropdown,
      setCompetitionDropdown,
      competitionDropDownValue,
      competitionPeriodDropDownValue,
    },
  };
};
