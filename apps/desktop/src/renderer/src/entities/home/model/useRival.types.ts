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

export type RivalSignAllResponse = {
  rivals: {
    rivalId: number;
    githubId: string;
    name: string;
    profileImage: string;
    rivalLinkingStatus: "ACCEPTED" | "REJECTED" | "PENDING" | "CANCELED";
  }[];
};

export type IdType = {
  id: number;
};

export type RivalApplyRequest = {
  ids: IdType[];
};
