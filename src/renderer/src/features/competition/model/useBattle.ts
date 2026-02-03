import { useState, useMemo, useEffect } from "react";
import { battleApi } from "@/entities/competition/api/rival-competition/api/battleApi";
import {
  BattleResponse,
  BattleDetailResponse,
  MatchValue,
  AnalyzeBattleResponse,
  AnalyzeCategory,
  BattleListResponse,
  PeriodDay,
} from "@/entities/competition/model/rival-competition/battle.types";

// category 드롭다운
const analyzeCategoryOptions = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "Github" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const useBattle = () => {
  const [battleTargetId, setBattleTargetId] = useState<number | null>(null);

  const [isBattleSelected, setIsBattleSelected] = useState(false);

  const selectBattleTarget = (id: number) => {
    setBattleTargetId(id);
    setIsBattleSelected(true);
  };

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

  // 나의 성장세 값이 없을 때, 50으로 반환
  // 전체적인 성장세의 수치값
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

  // 각 category별 헤딩하는 성장도 수치
  const myAnalyzePercent = useMemo(() => {
    if (!analyzeData) return 0;
    return analyzeData.myPoint;
  }, [analyzeData]);

  const rivalAnalyzePercent = useMemo(() => {
    if (!analyzeData) return 0;
    return analyzeData.enemyPoint;
  }, [analyzeData]);

  const analyzeRate = myAnalyzePercent + rivalAnalyzePercent;

  // 각 category별 헤딩하는 성장도 수치를 계산해서 나오는 상대(나)와의 차이값
  const diff = Math.abs(rivalAnalyzePercent - myAnalyzePercent);
  const isRivalHigher = rivalAnalyzePercent > myAnalyzePercent;

  const [rivalSelectedId, setRivalSelectedId] = useState<number | null>(null);

  const handleUserSelect = (id: number) => {
    setRivalSelectedId(prev => (prev === id ? null : id));
  };

  const detailTextTranslate = (category: AnalyzeCategory) => {
    if (category == "GITHUB") return "Contributes";
    if (category == "ACTIVE_TIME") return;
    return "EXP";
  };

  // 오늘부터 해당날짜까지 몇일 남았는지 표기하는 함수
  const getRemainDays = targetDate => {
    const today = new Date();
    const target = new Date(targetDate);

    // 시간을 00:00:00으로 설정
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    // 밀리초 단위 차이 계산
    const diffTime = target.getTime() - today.getTime();

    // 밀리초 → 일(day) 단위 변환
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const remainDays = getRemainDays(battleDetailData?.expireDate);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [battleList, setBattleList] = useState<BattleListResponse | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const fetchBattleList = async () => {
      try {
        const response = await battleApi.getBattleList();
        if (!response.data) return;
        setBattleList(response.data);
      } catch (error) {
        console.error("배틀 정보 조회 실패:", error);
      }
    };

    fetchBattleList();
  }, [isModalOpen]);

  const [duration, setDuration] = useState<PeriodDay>(3);

  const postBattle = async () => {
    try {
      const response = await battleApi.postCreateBattle({ id: rivalSelectedId, duration });
      if (!response.data) return;
      closeModal();
    } catch (error) {
      console.error("배틀 정보 조회 실패:", error);
    }

    postBattle();
  };

  const periodOptions: PeriodDay[] = [3, 5, 7];

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setRivalSelectedId(null);
    setDuration(3);
    setSelectedDay(null);
  };

  return {
    battle: {
      // modal
      isModalOpen,
      openModal,
      closeModal,
      duration,
      setDuration,
      periodOptions,
      postBattle,
      selectedDay,
      setSelectedDay,

      // target
      selectBattleTarget,
      isBattleSelected,

      // compare
      judgeUpperHand,
      myPercent,
      rivalPercent,
      myAnalyzePercent,
      rivalAnalyzePercent,
      analyzeRate,
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
      battleList,
    },
  };
};
