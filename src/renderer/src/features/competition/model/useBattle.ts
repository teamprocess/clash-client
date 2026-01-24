import { useState, useMemo, useEffect } from "react";
import { battleApi } from "@/entities/competition/api/rival-competition/battleApi";
import {
  BattleResponse,
  BattleDetailResponse,
  MatchValue,
} from "@/entities/competition/model/rival-competition/battle.types";

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
  const [battleTargetId, setBattleTargetId] = useState<number | null>(null);

  const [isBattleSelected, setIsBattleSelected] = useState(false);

  const selectBattleTarget = (id: number) => {
    setBattleTargetId(id);
    setIsBattleSelected(true);
  };

  /** ================== API Data ================== */
  const [battleData, setBattleData] = useState<BattleResponse | null>(null);
  const [battleDetailData, setBattleDetailData] = useState<BattleDetailResponse | null>(null);

  useEffect(() => {
    const fetchBattle = async () => {
      try {
        const response = await battleApi.getBattleInfo();
        if (!response.data) return;
        setBattleData(response.data);
        console.log("battle", response);
      } catch (error) {
        console.error("배틀 정보 조회 실패:", error);
      }
    };

    fetchBattle();
  }, []);

  useEffect(() => {
    const fetchBattleDetail = async () => {
      if (!battleTargetId) {
        setBattleDetailData(null);
        return;
      }

      const targetBattle = battleData?.battles.find(battle => battle.id === battleTargetId);

      if (!targetBattle) return;

      try {
        const response = await battleApi.getBattleDetailInfo(targetBattle.id);
        if (!response.data) return;
        setBattleDetailData(response.data);
        console.log(response);
      } catch (error) {
        console.error("배틀 상세 정보 조회 실패:", error);
      }
    };

    fetchBattleDetail();
  }, [battleTargetId, battleData]);

  /** ================== battles ================== */
  const battleRivals = useMemo(() => {
    if (!battleData?.battles) return [];

    return battleData?.battles.map(battle => ({
      name: battle.enemy.name,
      username: battle.enemy.name,
      totalRate: 0,
      profileImage: battle.enemy.profileImage,
      battleId: battle.id,
      enemyId: battle.enemy.id,
      expireDate: battle.expireDate,
      result: battle.result,
    }));
  }, [battleData]);

  const me = useMemo(() => {
    if (!battleDetailData) {
      return { name: "나", username: "me", totalRate: 0 };
    }

    return {
      name: "나",
      username: "me",
      totalRate: battleDetailData.myOverallPercentage,
    };
  }, [battleDetailData]);

  /** ================== compare ================== */
  const myPercent = battleDetailData?.myOverallPercentage ?? 50;
  const rivalPercent = 100 - myPercent;

  const judgeUpperHand = (result: string) => {
    if (result == MatchValue.LOSING) return "우세";
    if (result == MatchValue.WINNING) return "열세";
    if (result == MatchValue.LOST) return "패배";
    if (result == MatchValue.WON) return "승리";
    if (result == MatchValue.DRAW) return "무승부";
    return "동률";
  };

  /** ================== modal select ================== */
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
      battleTargetId,
      selectBattleTarget,
      isBattleSelected,

      // rivals
      battleRivals,
      me,

      // compare
      judgeUpperHand,
      myPercent,
      rivalPercent,

      // modal select
      rivalSelectedId,
      handleUserSelect,

      // dropdown
      competitionDropdown,
      setCompetitionDropdown,
      competitionDropDownValue,
      competitionPeriodDropDownValue,

      // API data
      battleData,
      battleDetailData,
    },
  };
};
