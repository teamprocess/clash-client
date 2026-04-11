import type { UserStatus } from "./userStatus";

interface EquippedItem {
  id: number;
  name: string;
  image: string;
}

export interface RivalEquippedItems {
  insignia: EquippedItem | null;
  nameplate: EquippedItem | null;
  banner: EquippedItem | null;
}

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
  equippedItems: RivalEquippedItems;
}

export type MyRivalsResponse = {
  myRivals: MyRivalsRequest[];
};
