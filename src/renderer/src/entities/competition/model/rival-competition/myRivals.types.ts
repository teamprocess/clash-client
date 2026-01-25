import { UserStatus } from "@/features/home/model/useHome";

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
