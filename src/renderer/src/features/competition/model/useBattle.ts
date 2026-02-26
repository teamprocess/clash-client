import { useState, useMemo, useRef } from "react";
import {
  battleApi,
  useBattleInfoQuery,
  useBattleDetailQuery,
  useAnalyzeBattleQuery,
  useBattleListQuery,
  BattleResponse,
  BattleDetailResponse,
  AnalyzeBattleResponse,
  AnalyzeCategory,
  BattleListResponse,
  PeriodDay,
  MATCHVALUE,
} from "@/entities/competition";
import { getErrorMessage } from "@/shared/lib";

const analyzeCategoryOptions: { key: AnalyzeCategory; label: string }[] = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "Github" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const useBattle = () => {
  const [battleTargetId, setBattleTargetId] = useState<number | null>(null);
  const [isBattleSelected, setIsBattleSelected] = useState(false);
  const [category, setCategory] = useState<AnalyzeCategory>("EXP");

  const selectBattleTarget = (id: number) => {
    setBattleTargetId(prevId => {
      if (prevId === id) {
        setIsBattleSelected(prev => !prev);
        return prevId;
      }

      setIsBattleSelected(true);
      return id;
    });
  };

  const { data: battleInfoRes } = useBattleInfoQuery();
  const { data: battleDetailRes } = useBattleDetailQuery(battleTargetId ?? 0);
  const { data: analyzeRes } = useAnalyzeBattleQuery(battleDetailRes?.data?.id ?? 0, category);
  const { data: battleListRes } = useBattleListQuery();

  const battleData: BattleResponse | null = battleInfoRes?.data ?? null;
  const battleDetailData: BattleDetailResponse | null = battleDetailRes?.data ?? null;
  const analyzeData: AnalyzeBattleResponse | null = analyzeRes?.data ?? null;
  const battleList: BattleListResponse | null = battleListRes?.data ?? null;

  const raw = battleDetailData?.myOverallPercentage;

  const myPercent = raw == null || raw === 0 ? 50 : raw;
  const rivalPercent = 100 - myPercent;

  const judgeUpperHand = (result: string) => {
    if (result === MATCHVALUE.LOSING) return "우세";
    if (result === MATCHVALUE.WINNING) return "열세";
    if (result === MATCHVALUE.LOST) return "패배";
    if (result === MATCHVALUE.WON) return "승리";
    if (result === MATCHVALUE.DRAW) return "무승부";
    return "동률";
  };

  const myAnalyzePoint = useMemo(() => {
    if (!analyzeData) return 0;
    return analyzeData.myPoint;
  }, [analyzeData]);

  const rivalAnalyzePoint = useMemo(() => {
    if (!analyzeData) return 0;
    return analyzeData.enemyPoint;
  }, [analyzeData]);

  const analyzeTotal = myAnalyzePoint + rivalAnalyzePoint;

  const myAnalyzeRate = analyzeTotal > 0 ? (myAnalyzePoint / analyzeTotal) * 100 : null;

  const rivalAnalyzeRate = analyzeTotal > 0 ? (rivalAnalyzePoint / analyzeTotal) * 100 : null;

  const diff = useMemo(() => {
    const max = Math.max(myAnalyzePoint, rivalAnalyzePoint);
    if (max <= 0) return 0;

    const percent = (Math.abs(myAnalyzePoint - rivalAnalyzePoint) / max) * 100;
    return Math.round(percent);
  }, [myAnalyzePoint, rivalAnalyzePoint]);

  const isRivalHigher =
    myAnalyzeRate !== null && rivalAnalyzeRate !== null ? rivalAnalyzeRate > myAnalyzeRate : false;

  const [rivalSelectedId, setRivalSelectedId] = useState<number | null>(null);

  const handleUserSelect = (id: number) => {
    setRivalSelectedId(prev => (prev === id ? null : id));
  };

  const detailTextTranslate = (category: AnalyzeCategory) => {
    if (category === "GITHUB") return "Contributes";
    if (category === "ACTIVE_TIME") return;
    return "EXP";
  };

  const getRemainDays = (targetDate?: string) => {
    if (!targetDate) return null;

    const today = new Date();
    const target = new Date(targetDate);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const remainDays = getRemainDays(battleDetailData?.expireDate);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  const [duration, setDuration] = useState<PeriodDay>(3);
  const periodOptions: PeriodDay[] = [3, 5, 7];
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => {
    if (submittingRef.current) return;

    setIsModalOpen(false);
    setRivalSelectedId(null);
    setDuration(3);
    setSelectedDay(null);

    setIsSubmitting(false);
  };

  const createBattle = async () => {
    if (!rivalSelectedId) return;

    if (submittingRef.current) return;

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      await battleApi.postCreateBattle({
        id: rivalSelectedId,
        duration,
      });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "배틀 신청 중 오류가 발생했습니다.");
      console.error("배틀 신청 실패", errorMessage, error);
    } finally {
      submittingRef.current = false;
      closeModal();
    }
  };

  return {
    isModalOpen,
    openModal,
    isSubmitting,
    closeModal,
    duration,
    setDuration,
    periodOptions,
    createBattle,
    selectedDay,
    setSelectedDay,

    selectBattleTarget,
    isBattleSelected,

    judgeUpperHand,
    myPercent,
    rivalPercent,

    myAnalyzePoint,
    rivalAnalyzePoint,
    analyzeTotal,
    myAnalyzeRate,
    rivalAnalyzeRate,
    diff,
    isRivalHigher,

    detailTextTranslate,
    remainDays,

    rivalSelectedId,
    handleUserSelect,

    analyzeCategoryOptions,
    setCategory,
    category,

    battleData,
    battleDetailData,
    battleList,
  };
};
