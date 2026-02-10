import { useMyRivalsQuery, MyRivalsResponse } from "@/entities/competition";

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
