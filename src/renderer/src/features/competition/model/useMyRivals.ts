import { MyRivalsResponse } from "@/entities/competition";

interface UseMyRivalsProps {
  data: MyRivalsResponse;
}

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

export const useMyRivals = ({ data }: UseMyRivalsProps) => {
  const myRivalsData: MyRivalsResponse | null = data ?? null;

  return {
    myRivals: { myRivalsData },
  };
};
