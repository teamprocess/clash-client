export interface UserType {
  userId: number;
  userName: string;
  gitHubId: string;
  profileImage: string;
}

export interface RivalUsersResponse {
  users: UserType[];
}

interface IdType {
  id: number;
}

export interface RivalApplyRequest {
  ids: IdType[];
}
