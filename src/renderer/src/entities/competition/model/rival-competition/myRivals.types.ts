import { UserStatus } from "@/features/competition/model/useMyRivals";

export interface MyRivalsRequest {
  name: string;
  username: string;
  profileImage: string;
  activeTime: string;
  usingApp: string;
  status: UserStatus;
}

export interface MyRivalsResponse {
  myRivals: MyRivalsRequest[];
}
