type UserType = {
  userId: number;
  userName: string;
  gitHubId: string;
  profileImage: string;
};

export type RivalUsersResponse = {
  users: UserType[];
};

type IdType = {
  id: number;
};

export interface RivalApplyRequest {
  ids: IdType[];
}
