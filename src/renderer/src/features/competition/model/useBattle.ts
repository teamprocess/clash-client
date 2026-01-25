import { useState, useMemo, useEffect } from "react";
import { battleApi } from "@/entities/competition/api/rival-competition/battleApi";
import {
  BattleResponse,
  BattleDetailResponse,
  MatchValue,
  AnalyzeBattleResponse,
  AnalyzeCategory,
} from "@/entities/competition/model/rival-competition/battle.types";

// 드롭다운 키밸류
const analyzeCategoryOptions = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "Github" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const useBattle = () => {
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // battle target
  const [battleTargetId, setBattleTargetId] = useState<number | null>(null);

  const [isBattleSelected, setIsBattleSelected] = useState(false);

  const selectBattleTarget = (id: number) => {
    setBattleTargetId(id);
    setIsBattleSelected(true);
  };

  // API Data
  const [battleData, setBattleData] = useState<BattleResponse | null>(null);
  const [battleDetailData, setBattleDetailData] = useState<BattleDetailResponse | null>(null);

  useEffect(() => {
    const fetchBattle = async () => {
      try {
        const response = await battleApi.getBattleInfo();
        if (!response.data) return;
        setBattleData(response.data);
      } catch (error) {
        console.error("배틀 정보 조회 실패:", error);
      }
    };

    fetchBattle();
  }, []);

  const [analyzeData, setAnalyzeData] = useState<AnalyzeBattleResponse | null>(null);
  const [category, setCategory] = useState<AnalyzeCategory>("EXP");

  useEffect(() => {
    const fetchBattleDetail = async () => {
      if (!battleTargetId) {
        setBattleDetailData(null);
        return;
      }

      try {
        const response = await battleApi.getBattleDetailInfo(battleTargetId);
        if (!response.data) return;
        setBattleDetailData(response.data);
      } catch (error) {
        console.error("배틀 상세 정보 조회 실패:", error);
      }
    };

    fetchBattleDetail();
  }, [battleTargetId]);

  useEffect(() => {
    if (!battleDetailData) return;

    const fetchAnalyzeData = async () => {
      try {
        const response = await battleApi.getAnalyzeBattleData({
          id: battleDetailData.id,
          category,
        });

        if (!response.data) return;

        setAnalyzeData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("배틀 분석 정보 조회 실패:", error);
      }
    };

    fetchAnalyzeData();
  }, [battleDetailData, category]);

  // compare
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

  const myAnalyzePercent = useMemo(() => {
    if (!analyzeData) return 0;
    return analyzeData.myPoint;
  }, [analyzeData]);

  const rivalAnalyzePercent = useMemo(() => {
    if (!analyzeData) return 0;
    return analyzeData.enemyPoint;
  }, [analyzeData]);

  const AnalyzeRate = myAnalyzePercent + rivalAnalyzePercent;

  const diff = Math.abs(rivalAnalyzePercent - myAnalyzePercent);
  const isRivalHigher = rivalAnalyzePercent > myAnalyzePercent;

  // modal select
  const [rivalSelectedId, setRivalSelectedId] = useState<number | null>(null);

  const handleUserSelect = (id: number) => {
    setRivalSelectedId(prev => (prev === id ? null : id));
  };

  const detailTextTranslate = (category: AnalyzeCategory) => {
    if (category == "GITHUB") return "Contributes";
    if (category == "ACTIVE_TIME") return;
    return "EXP";
  };

  const getRemainDays = targetDate => {
    const today = new Date();
    const target = new Date(targetDate);

    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const remainDays = getRemainDays(battleDetailData?.expireDate);

  return {
    battle: {
      // modal
      isModalOpen,
      openModal,
      closeModal,

      // target
      selectBattleTarget,
      isBattleSelected,

      // compare
      judgeUpperHand,
      myPercent,
      rivalPercent,
      myAnalyzePercent,
      rivalAnalyzePercent,
      AnalyzeRate,
      diff,
      isRivalHigher,
      detailTextTranslate,
      remainDays,

      // modal select
      rivalSelectedId,
      handleUserSelect,

      // dropdown
      analyzeCategoryOptions,
      setCategory,
      category,

      // API data
      battleData,
      battleDetailData,
    },
  };
};
