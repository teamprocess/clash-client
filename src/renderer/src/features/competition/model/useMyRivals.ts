import { useEffect, useState } from "react";
import { myRivalsApi } from "@/entities/competition/api/rival-competition/myRivalsApi";
import { MyRivalsResponse } from "@/entities/competition/model/rival-competition/myRivals.types";

// 필요 있는지에 대해 판단중인 주석
// export type UserStatus = "ONLINE" | "AWAY" | "OFFLINE";

export const useMyRivals = () => {
  const [myRivalsData, setMyRivalsData] = useState<MyRivalsResponse | null>(null);

  useEffect(() => {
    const fetchMyRivalData = async () => {
      try {
        const result = await myRivalsApi.getMyRivals();
        console.log(result.data);
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
