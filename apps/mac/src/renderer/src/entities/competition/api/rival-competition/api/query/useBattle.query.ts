import { useQuery } from "@tanstack/react-query";
import { battleApi } from "../battleApi";
import type { AnalyzeBattleRequest } from "../../../../model/rival-competition/battle.types";

export const battleQueryKeys = {
  info: ["battleInfo"] as const,
  details: ["battleDetail"] as const,
  detail: (id: number) => [...battleQueryKeys.details, id] as const,
  analyses: ["battleAnalyze"] as const,
  analyze: (id: number, category: AnalyzeBattleRequest["category"]) =>
    [...battleQueryKeys.analyses, id, category] as const,
  list: ["battleList"] as const,
  applications: ["battleApplyList"] as const,
};

export const useBattleInfoQuery = () => {
  return useQuery({
    queryKey: battleQueryKeys.info,
    queryFn: battleApi.getBattleInfo,
  });
};

export const useBattleDetailQuery = (id: number) => {
  return useQuery({
    queryKey: battleQueryKeys.detail(id),
    queryFn: () => battleApi.getBattleDetailInfo(id),
    enabled: !!id,
    placeholderData: previousData => previousData,
  });
};

export const useAnalyzeBattleQuery = (id: number, category: AnalyzeBattleRequest["category"]) => {
  return useQuery({
    queryKey: battleQueryKeys.analyze(id, category),
    queryFn: () => battleApi.getAnalyzeBattleData({ id, category }),
    enabled: !!id && !!category,
    placeholderData: previousData => previousData,
  });
};

export const useBattleListQuery = (enabled = true) => {
  return useQuery({
    queryKey: battleQueryKeys.list,
    queryFn: battleApi.getBattleList,
    enabled,
  });
};

export const useBattleApplyListQuery = (enabled = true) => {
  return useQuery({
    queryKey: battleQueryKeys.applications,
    queryFn: battleApi.getBattleApplyList,
    enabled,
  });
};
