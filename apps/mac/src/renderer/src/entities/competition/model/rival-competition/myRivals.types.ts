import type { UserStatus } from "./userStatus";

export interface MyRivalsRequest {
  rivalId: number;
  id: number;
  name: string;
  username: string;
  profileImage: string;
  activeTime: number;
  usingApp: string | null;
  status: UserStatus;
  isStudying: boolean;
  tier: string;
}

export type MyRivalsResponse = {
  myRivals: MyRivalsRequest[];
};
