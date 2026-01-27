import { api } from "@/shared/api/axios";
import type { ApiResponse, Pagination } from "@/shared/api/types";
import type { GroupCategory, GroupCategoryFilter } from "@/entities/group/model/groupCategory";

export interface Owner {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  name: string;
  description: string;
  maxMembers: number;
  currentMemberCount: number;
  category: GroupCategory;
  passwordRequired: boolean;
  owner: Owner;
  isMember: boolean;
}

export interface GetAllGroupsResponse {
  pagination: Pagination;
  groups: Group[];
}

export interface CreateGroupRequest {
  name: string;
  description: string;
  maxMembers: number;
  category: GroupCategory;
  passwordRequired: boolean;
  password?: string;
}

export interface JoinGroupRequest {
  password?: string;
}

export interface GetGroupDetailResponse {
  group: Group;
}

export interface UpdateGroupRequest {
  name: string;
  description: string;
  maxMembers: number;
  category: GroupCategory;
  passwordRequired: boolean;
  password?: string;
}

export interface GroupMember {
  id: number;
  name: string;
  studyTime: number;
  isStudying: boolean;
}

export interface GetGroupActivityResponse {
  pagination: Pagination;
  members: GroupMember[];
}

export const groupApi = {
  // 그룹 목록 조회
  getAllGroups: async (page?: number, pageSize: number = 6, category?: GroupCategoryFilter) => {
    const result = await api.get<ApiResponse<GetAllGroupsResponse>>("/groups", {
      params: { page, pageSize, category },
    });
    return result.data;
  },

  // 참여한 그룹 목록 조회
  getMyGroups: async (page?: number, pageSize: number = 6) => {
    const result = await api.get<ApiResponse<GetAllGroupsResponse>>("/groups/my", {
      params: { page, pageSize },
    });
    return result.data;
  },

  // 상세 그룹 정보 조회
  getGroupDetail: async (groupId: number) => {
    const result = await api.get<ApiResponse<GetGroupDetailResponse>>(`/groups/${groupId}`);
    return result.data;
  },

  // 그룹 생성
  createGroup: async (data: CreateGroupRequest) => {
    const result = await api.post<ApiResponse<void>>("/groups", data);
    return result.data;
  },

  // 그룹 수정
  updateGroup: async (groupId: number, data: UpdateGroupRequest) => {
    const result = await api.patch<ApiResponse<void>>(`/groups/${groupId}`, data);
    return result.data;
  },

  // 그룹 삭제
  deleteGroup: async (groupId: number) => {
    const result = await api.delete<ApiResponse<void>>(`/groups/${groupId}`);
    return result.data;
  },

  // 그룹 참여
  joinGroup: async (groupId: number, data?: JoinGroupRequest) => {
    const result = await api.post<ApiResponse<void>>(`/groups/${groupId}/join`, data);
    return result.data;
  },

  // 그룹 탈퇴
  quitGroup: async (groupId: number) => {
    const result = await api.post<ApiResponse<void>>(`/groups/${groupId}/quit`);
    return result.data;
  },

  // 그룹 활동 조회
  getGroupActivity: async (groupId: number, page?: number, pageSize?: number) => {
    const result = await api.get<ApiResponse<GetGroupActivityResponse>>(
      `/groups/${groupId}/activity`,
      {
        params: { page, pageSize },
      }
    );
    return result.data;
  },
};
