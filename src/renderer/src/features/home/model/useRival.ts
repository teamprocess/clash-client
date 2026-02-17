import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
  const qc = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [rivalSelectedId, setRivalSelectedId] = useState<number[]>([]);

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
      await qc.invalidateQueries({ queryKey: ["myRivals"] });
    } catch (error: unknown) {
      const msg = getErrorMessage(error, "라이벌 신청 중 오류가 발생했습니다.");
      console.error("라이벌 신청 실패:", msg, error);
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
  };
};
