import { useState } from "react";
import { queryClient } from "@/shared/lib";
import { MyRivalsRequest, MyRivalsResponse } from "@/entities/competition";
import { useRivalListQuery, RivalApplyRequest, rivalsApi } from "@/entities/home";
import { getErrorMessage } from "@/shared/lib";

export interface MyRivalItem {
  user: MyRivalsRequest;
  getStatus: (status: UserStatus) => StatusType;
}

const USER_STATUS = {
  ONLINE: "ONLINE",
  AWAY: "AWAY",
  OFFLINE: "OFFLINE",
} as const;

type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
type StatusType = "온라인" | "자리비움" | "오프라인" | "";

export const useRival = (rivalsData: MyRivalsResponse | null) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rivalSelectedId, setRivalSelectedId] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data: rivalListRes } = useRivalListQuery();

  const userList = rivalListRes?.data ?? null;

  const getStatus = (status: UserStatus): StatusType => {
    switch (status) {
      case USER_STATUS.ONLINE:
        return "온라인";
      case USER_STATUS.AWAY:
        return "자리비움";
      case USER_STATUS.OFFLINE:
        return "오프라인";
      default:
        return "";
    }
  };

  const handleOpen = () => setModalOpen(true);

  const handleClose = () => {
    setModalOpen(false);
    setRivalSelectedId([]);
  };

  const handleUserSelect = (id: number) => {
    const currentRivalCount = rivalsData?.myRivals.length ?? 0;
    const maxAvailableSlots = 4 - currentRivalCount;

    setRivalSelectedId(prev => {
      if (prev.includes(id)) return prev.filter(item => item !== id);
      if (prev.length < maxAvailableSlots) return [...prev, id];
      return prev;
    });
  };

  const handleRivalCreate = async () => {
    if (rivalSelectedId.length === 0) return;

    const payload: RivalApplyRequest = {
      ids: rivalSelectedId.map(id => ({ id })),
    };

    try {
      await rivalsApi.postRivalApply(payload);
      await queryClient.invalidateQueries({ queryKey: ["myRivals"] });
    } catch (error: unknown) {
      console.error("라이벌 신청 실패:", error);
      setError(getErrorMessage(error, "라이벌 신청 중 오류가 발생했습니다."));
    } finally {
      handleClose();
    }
  };

  return {
    rivalsData,
    userList,
    getStatus,
    modalOpen,
    handleOpen,
    handleClose,
    rivalSelectedId,
    handleUserSelect,
    handleRivalCreate,
    error,
  };
};
