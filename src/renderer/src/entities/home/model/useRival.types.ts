type UserType = {
  id: number;
  username: string;
  name: string;
  gitHubId: string;
  profileImage: string;
};

export type RivalUsersResponse = {
  users: UserType[];
};

type IdType = {
  id: number;
};

export type RivalApplyRequest = {
  ids: IdType[];
};
