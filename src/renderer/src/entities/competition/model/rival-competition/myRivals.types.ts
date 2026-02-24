import { UserStatus } from "@/features/competition/model/useMyRivals";

export interface MyRivalsRequest {
  rivalId: number;
  id: number;
  name: string;
  username: string;
  profileImage: string;
  activeTime: string;
  usingApp: string;
  status: UserStatus;
}

export type MyRivalsResponse = {
  myRivals: MyRivalsRequest[];
};
