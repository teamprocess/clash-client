import { MyRivalsResponse } from "@/entities/competition";

interface UseMyRivalsProps {
  data: MyRivalsResponse;
}

export type UserStatus = "ONLINE" | "AWAY" | "OFFLINE";

const USER_STATUS_LABELS: Record<UserStatus, string> = {
  ONLINE: "온라인",
  AWAY: "자리비움",
  OFFLINE: "오프라인",
};

export const normalizeUserStatus = (status?: string | null): UserStatus => {
  const normalizedStatus = status?.trim().toUpperCase();

  switch (normalizedStatus) {
    case "ONLINE":
    case "ON":
    case "ACTIVE":
    case "STUDYING":
      return "ONLINE";
    case "OFFLINE":
    case "OFF":
      return "OFFLINE";
    case "AWAY":
    case "IDLE":
    case "INACTIVE":
    case "자리비움":
      return "AWAY";
    default:
      return "AWAY";
  }
};

export const getStatus = (status?: string | null) => {
  return USER_STATUS_LABELS[normalizeUserStatus(status)];
};

export const useMyRivals = ({ data }: UseMyRivalsProps) => {
  const myRivalsData: MyRivalsResponse | null = data ?? null;

  return {
    myRivals: { myRivalsData },
  };
};
