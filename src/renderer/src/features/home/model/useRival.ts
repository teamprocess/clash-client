import { useEffect, useState } from "react";
import { myRivalsApi } from "@/entities/competition/api/rival-competition/myRivalsApi";
import {
  MyRivalsRequest,
  MyRivalsResponse,
} from "@/entities/competition/model/rival-competition/myRivals.types";
import { risvalApi } from "@/entities/home/api/rivalApi";
import { RivalUsersResponse } from "@/entities/home/model/useRival.types";

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
  const [rivalsData, setRivalsData] = useState<MyRivalsResponse | null>(null);
  const [userList, setUserList] = useState<RivalUsersResponse | null>(null);

  useEffect(() => {
    const fetchMyRivals = async () => {
      try {
        const response = await myRivalsApi.getMyRivals();
        if (!response.data) return;
        setRivalsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyRivals();
  }, []);

  useEffect(() => {
    const fetchRivalsList = async () => {
      try {
        const response = await risvalApi.getRivalList();
        if (!response.data) return;
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRivalsList();
  }, []);

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

  const handleOpen = () => {
    setModalOpen(true);
  };
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
      } else {
        return prev;
      }
    });
  };

  const handleModalClose = () => {
    setRivalSelectedId([]);
    handleClose();
  };

  const handleRivalCreate = () => {
    const postRivalApply = async () => {
      try {
        const payload = {
          ids: rivalSelectedId.map(id => ({ id })),
        };

        const response = await risvalApi.postRivalApply(payload);
        if (!response.data) return;
        handleClose();
      } catch (error) {
        console.error(error);
      }
    };

    postRivalApply();
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
