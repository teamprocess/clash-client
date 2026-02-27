import { MyRivalsResponse, useMyRivalsQuery } from "@/entities/competition";

export type UserStatus = "ONLINE" | "OFFLINE" | "AWAY";

export const useRivalContainer = () => {
  const { data: myRivalsRes } = useMyRivalsQuery();
  const rivalsData: MyRivalsResponse | null = myRivalsRes?.data ?? null;

  return { rivalsData };
};
