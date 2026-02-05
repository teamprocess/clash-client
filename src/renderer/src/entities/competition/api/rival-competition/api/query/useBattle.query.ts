import { useQuery, useMutation } from "@tanstack/react-query";
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
  });
};

export const useAnalyzeBattleQuery = (id: number, category: AnalyzeBattleRequest["category"]) => {
  return useQuery({
    queryKey: ["battleAnalyze", id, category],
    queryFn: () => battleApi.getAnalyzeBattleData({ id, category }),
    enabled: !!id && !!category,
  });
};

export const useBattleListQuery = () => {
  return useQuery({
    queryKey: ["battleList"],
    queryFn: battleApi.getBattleList,
  });
};

export const useCreateBattleMutation = () => {
  return useMutation({
    mutationFn: battleApi.postCreateBattle,
  });
};
