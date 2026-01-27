import { MyRivalsRequest } from "@/entities/competition/model/rival-competition/myRivals.types";

export interface UserType {
  userId: number;
  userName: string;
  gitHubId: string;
  profileImage: string;
}

export interface UsersResponse {
  users: UserType[];
}

export interface MyRivalItem {
  user: MyRivalsRequest;
  getStatus: (status: UserStatus) => StatusType;
}
export const USER_STATUS = {
  ONLINE: "ONLINE",
  AWAY: "AWAY",
  OFFLINE: "OFFLINE",
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export type StatusType = "온라인" | "자리비움" | "오프라인" | "";
