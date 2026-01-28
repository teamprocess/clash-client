import { useEffect, useState } from "react";
import { myRivalsApi } from "@/entities/competition/api/rival-competition/myRivalsApi";
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
  const [myRivalsData, setMyRivalsData] = useState<MyRivalsResponse | null>(null);

  useEffect(() => {
    const fetchMyRivalData = async () => {
      try {
        const result = await myRivalsApi.getMyRivals();
        setMyRivalsData(result.data);
      } catch (error) {
        console.error("내 라이벌 조회 실패:", error);
      }
    };

    fetchMyRivalData();
  }, []);

  return {
    myRivals: { myRivalsData },
  };
};
