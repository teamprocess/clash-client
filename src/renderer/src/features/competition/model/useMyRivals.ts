import { useMyRivalsQuery } from "@/entities/competition/api/rival-competition/api/useMyRivalsQuery.query";
import { MyRivalsResponse } from "@/entities/competition/model/rival-competition/myRivals.types";

export type UserStatus = "ONLINE" | "AWAY" | "OFFLINE";

export const getStatus = (status: UserStatus) => {
  switch (status) {
    case "ONLINE":
      return "온라인";
    case "AWAY":
      return "자리비움";
    case "OFFLINE":
      return "오프라인";
    default:
      return "";
  }
};

export const useMyRivals = () => {
  const { data } = useMyRivalsQuery();

  const myRivalsData: MyRivalsResponse | null = data?.data ?? null;

  return {
    myRivals: { myRivalsData },
  };
};
