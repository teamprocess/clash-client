import { useEffect, useState } from "react";
import { useMyRivalsQuery } from "@/entities/competition/api/rival-competition/api/query/useMyRivals.query";
import { useRivalListQuery } from "@/entities/home/api/query/useRivals.query";
import {
  MyRivalsRequest,
  MyRivalsResponse,
} from "@/entities/competition/model/rival-competition/myRivals.types";
import { RivalUsersResponse, RivalApplyRequest } from "@/entities/home/model/useRival.types";
import { rivalsApi } from "@/entities/home/api/rivalApi";

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

export const useRival = () => {
  const { data: myRivalsRes } = useMyRivalsQuery();
  const { data: rivalListRes } = useRivalListQuery();

  const rivalsData: MyRivalsResponse | null = myRivalsRes?.data ?? null;
  const userList: RivalUsersResponse | null = rivalListRes?.data ?? null;

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

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);

  const handleClose = () => {
    setModalOpen(false);
    setRivalSelectedId([]);
  };

  const [rivalSelectedId, setRivalSelectedId] = useState<number[]>([]);

  const handleUserSelect = (id: number) => {
    const currentRivalCount = rivalsData?.myRivals.length ?? 0;
    const maxAvailableSlots = 4 - currentRivalCount;

    setRivalSelectedId(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }

      if (prev.length < maxAvailableSlots) {
        return [...prev, id];
      }

      return prev;
    });
  };

  const handleModalClose = () => {
    setRivalSelectedId([]);
    handleClose();
  };

  const [applyPayload, setApplyPayload] = useState<RivalApplyRequest | null>(null);

  useEffect(() => {
    if (!applyPayload) return;

    const postApplyRival = async () => {
      try {
        await rivalsApi.postRivalApply(applyPayload);
        handleClose();
      } catch (e) {
        console.error("Rival apply failed", e);
      } finally {
        setApplyPayload(null);
      }
    };

    postApplyRival();
  }, [applyPayload]);

  const handleRivalCreate = () => {
    const payload: RivalApplyRequest = {
      ids: rivalSelectedId.map(id => ({ id })),
    };

    setApplyPayload(payload);
  };

  return {
    userList,
    rivalsData,
    getStatus,
    modalOpen,
    setModalOpen,
    handleOpen,
    handleClose,
    rivalSelectedId,
    handleUserSelect,
    handleModalClose,
    handleRivalCreate,
  };
};
