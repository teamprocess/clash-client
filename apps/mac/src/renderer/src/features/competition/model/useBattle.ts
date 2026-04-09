import { useState, useRef } from "react";
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
import { getErrorMessage, queryClient } from "@/shared/lib";
import { useBattleApplyListQuery } from "@/entities/competition/api/rival-competition/api/query/useBattle.query";
import { useMutation } from "@tanstack/react-query";
import {
  ANALYZE_CATEGORY_OPTIONS,
  JUDGE_UPPER_HAND_MAP,
  PERIOD_OPTIONS,
} from "@/features/competition/constants/battle.constants";

export const useBattle = () => {
  const [battleTargetId, setBattleTargetId] = useState<number | null>(null);
  const [isBattleSelected, setIsBattleSelected] = useState(false);
  const [category, setCategory] = useState<AnalyzeCategory>("EXP");
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rivalSelectedId, setRivalSelectedId] = useState<number | null>(null);
  const [duration, setDuration] = useState<PeriodDay | null>(null);
  const [selectedDay, setSelectedDay] = useState<PeriodDay | null>(null);

  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  const { data: battleInfoRes } = useBattleInfoQuery();
  const { data: battleDetailRes } = useBattleDetailQuery(battleTargetId ?? 0);
  const { data: analyzeRes } = useAnalyzeBattleQuery(battleDetailRes?.data?.id ?? 0, category);
  const { data: battleListRes } = useBattleListQuery();
  const { data: battleApplyList } = useBattleApplyListQuery();

  const battleData: BattleResponse | null = battleInfoRes?.data ?? null;
  const battleDetailData: BattleDetailResponse | null = battleDetailRes?.data ?? null;
  const analyzeData: AnalyzeBattleResponse | null = analyzeRes?.data ?? null;
  const battleList: BattleListResponse | null = battleListRes?.data ?? null;

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

  const raw = battleDetailData?.myOverallPercentage;
  const myPercent = raw == null || raw === 0 ? 50 : raw;
  const rivalPercent = 100 - myPercent;

  const myAnalyzePoint = analyzeData ? analyzeData.myPoint : 0;
  const rivalAnalyzePoint = analyzeData ? analyzeData.enemyPoint : 0;

  const analyzeTotal = myAnalyzePoint + rivalAnalyzePoint;

  const myAnalyzeRate = analyzeTotal > 0 ? (myAnalyzePoint / analyzeTotal) * 100 : null;
  const rivalAnalyzeRate = analyzeTotal > 0 ? (rivalAnalyzePoint / analyzeTotal) * 100 : null;

  const max = Math.max(myAnalyzePoint, rivalAnalyzePoint);
  const diff = max > 0 ? Math.round((Math.abs(myAnalyzePoint - rivalAnalyzePoint) / max) * 100) : 0;

  const isRivalHigher =
    myAnalyzeRate !== null && rivalAnalyzeRate !== null ? rivalAnalyzeRate > myAnalyzeRate : false;

  const judgeUpperHand = (result: (typeof MATCHVALUE)[keyof typeof MATCHVALUE]): string => {
    return JUDGE_UPPER_HAND_MAP[result] ?? "";
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

  const openModal = () => {
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (submittingRef.current) return;

    setIsModalOpen(false);
    setRivalSelectedId(null);
    setDuration(null);
    setSelectedDay(null);
    setIsSubmitting(false);
    setError(null);
  };

  const handleUserSelect = (id: number) => {
    setError(null);
    setRivalSelectedId(prev => (prev === id ? null : id));
  };

  const handlePeriodSelect = (day: PeriodDay) => {
    setError(null);

    if (selectedDay === null) {
      setSelectedDay(day);
    } else {
      setSelectedDay(null);
    }

    setDuration(day);
  };

  const canCreateBattle =
    rivalSelectedId !== null && duration !== null && !isSubmitting && selectedDay;

  const createBattle = async () => {
    if (!rivalSelectedId || duration === null) {
      setError("라이벌과 기간을 모두 선택해주세요.");
      return;
    }

    if (submittingRef.current) return;

    submittingRef.current = true;
    setIsSubmitting(true);
    setError(null);

    try {
      await battleApi.postCreateBattle({
        id: rivalSelectedId,
        duration,
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["battleInfo"] }),
        queryClient.invalidateQueries({ queryKey: ["battleList"] }),
        queryClient.invalidateQueries({ queryKey: ["battleApplyList"] }),
      ]);

      closeModal();
    } catch (error: unknown) {
      console.error("배틀 신청 실패:", error);
      setError(getErrorMessage(error, "배틀 신청 중 오류가 발생했습니다."));
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
      setSelectedDay(null);
    }
  };

  const cancelBattleApplyMutation = useMutation({
    mutationFn: battleApi.postCancelBattle,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["battleApplyList"] }),
        queryClient.invalidateQueries({ queryKey: ["battleList"] }),
        queryClient.invalidateQueries({ queryKey: ["battle"] }),
      ]);
    },
  });

  const handleBattleApplyCancel = async (id: number) => {
    if (!id) return false;

    try {
      setError(null);
      setIsCanceling(true);
      setCancelingId(id);

      await cancelBattleApplyMutation.mutateAsync({ id });
      return true;
    } catch (error: unknown) {
      console.error("배틀 신청 취소 실패:", error);
      setError(getErrorMessage(error, "배틀 신청 취소 중 오류가 발생했습니다."));
      return false;
    } finally {
      setIsCanceling(false);
      setCancelingId(null);
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    isSubmitting,

    duration,
    setDuration,
    selectedDay,
    PERIOD_OPTIONS,
    handlePeriodSelect,
    canCreateBattle,
    createBattle,

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

    ANALYZE_CATEGORY_OPTIONS,
    category,
    setCategory,

    battleData,
    battleDetailData,
    battleList,

    battleApplyList,
    handleBattleApplyCancel,
    isCanceling,
    cancelingId,

    error,
  };
};
