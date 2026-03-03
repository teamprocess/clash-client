import type { Pagination } from "@/shared/api/types";
import type { GroupCategory } from "./groupCategory";

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
