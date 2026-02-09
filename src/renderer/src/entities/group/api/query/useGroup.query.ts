import { useQuery } from "@tanstack/react-query";
import { groupApi } from "../groupApi";
import type { GroupCategoryFilter } from "@/entities/group/model/groupCategory";

export const useAllGroupsQuery = (
  page: number,
  category: GroupCategoryFilter,
  pageSize: number = 6
) => {
  return useQuery({
    queryKey: ["groups", page, pageSize, category],
    queryFn: () => groupApi.getAllGroups(page, pageSize, category),
  });
};

export const useMyGroupsQuery = (page: number = 1, pageSize: number = 20) => {
  return useQuery({
    queryKey: ["myGroups", page, pageSize],
    queryFn: () => groupApi.getMyGroups(page, pageSize),
  });
};

export const useGroupActivityQuery = (groupId: number | null) => {
  return useQuery({
    queryKey: ["groupActivity", groupId],
    queryFn: () => groupApi.getGroupActivity(groupId ?? 0),
    enabled: groupId !== null,
  });
};

export const useGroupDetailQuery = (groupId: number | null) => {
  return useQuery({
    queryKey: ["groupDetail", groupId],
    queryFn: () => groupApi.getGroupDetail(groupId ?? 0),
    enabled: groupId !== null,
    staleTime: 0,
  });
};
