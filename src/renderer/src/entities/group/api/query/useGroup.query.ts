import { useQuery } from "@tanstack/react-query";
import { groupApi } from "../groupApi";
import type { GroupCategoryFilter } from "@/entities/group/model/groupCategory";

export const groupQueryKeys = {
  allGroups: ["groups"] as const,
  myGroups: ["myGroups"] as const,
  groupActivity: ["groupActivity"] as const,
  groupDetail: ["groupDetail"] as const,
};

export const useAllGroupsQuery = (
  page: number,
  category: GroupCategoryFilter,
  pageSize: number = 6
) => {
  return useQuery({
    queryKey: [...groupQueryKeys.allGroups, page, pageSize, category],
    queryFn: () => groupApi.getAllGroups(page, pageSize, category),
  });
};

export const useMyGroupsQuery = (page: number = 1, pageSize: number = 20) => {
  return useQuery({
    queryKey: [...groupQueryKeys.myGroups, page, pageSize],
    queryFn: () => groupApi.getMyGroups(page, pageSize),
  });
};

export const useGroupActivityQuery = (groupId: number | null) => {
  return useQuery({
    queryKey: [...groupQueryKeys.groupActivity, groupId],
    queryFn: () => groupApi.getGroupActivity(groupId ?? 0),
    enabled: groupId !== null,
  });
};

export const useGroupDetailQuery = (groupId: number | null) => {
  return useQuery({
    queryKey: [...groupQueryKeys.groupDetail, groupId],
    queryFn: () => groupApi.getGroupDetail(groupId ?? 0),
    enabled: groupId !== null,
    staleTime: 0,
  });
};
