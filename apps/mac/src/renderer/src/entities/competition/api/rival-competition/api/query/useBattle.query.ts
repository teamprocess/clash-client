import { useQuery } from "@tanstack/react-query";
import { battleApi } from "../battleApi";
import { AnalyzeBattleRequest } from "@/entities/competition/model/rival-competition/battle.types";

export const useBattleInfoQuery = () => {
  return useQuery({
    queryKey: ["battleInfo"],
    queryFn: battleApi.getBattleInfo,
  });
};

export const useBattleDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ["battleDetail", id],
    queryFn: () => battleApi.getBattleDetailInfo(id),
    enabled: !!id,
    placeholderData: previousData => previousData,
  });
};

export const useAnalyzeBattleQuery = (id: number, category: AnalyzeBattleRequest["category"]) => {
  return useQuery({
    queryKey: ["battleAnalyze", id, category],
    queryFn: () => battleApi.getAnalyzeBattleData({ id, category }),
    enabled: !!id && !!category,
    placeholderData: previousData => previousData,
  });
};

export const useBattleListQuery = () => {
  return useQuery({
    queryKey: ["battleList"],
    queryFn: battleApi.getBattleList,
  });
};

export const useBattleApplyListQuery = () => {
  return useQuery({
    queryKey: ["battleApplyList"],
    queryFn: battleApi.getBattleApplyList,
  });
};
