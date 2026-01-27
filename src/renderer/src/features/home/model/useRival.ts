import { useEffect, useState } from "react";
import { myRivalsApi } from "@/entities/competition/api/rival-competition/myRivalsApi";
import { MyRivalsResponse } from "@/entities/competition/model/rival-competition/myRivals.types";
import { risvalApi } from "@/entities/home/api/rivalApi";
import {
  UserStatus,
  USER_STATUS,
  StatusType,
  UsersResponse,
} from "@/entities/home/model/useRival.types";

export const useRival = () => {
  const [rivalsData, setRivalsData] = useState<MyRivalsResponse | null>(null);
  const [userList, setUserList] = useState<UsersResponse | null>(null);

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

  const [rivalSelectedId, setRivalSelectedId] = useState<string[]>([]);

  const handleUserSelect = (name: string) => {
    const currentRivalCount = rivalsData?.myRivals.length ?? 0;

    const maxAvailableSlots = 4 - currentRivalCount;

    setRivalSelectedId(prev => {
      if (prev.includes(name)) {
        return prev.filter(item => item !== name);
      }

      if (prev.length < maxAvailableSlots) {
        return [...prev, name];
      } else {
        return prev;
      }
    });
  };

  const handleModalClose = () => {
    setRivalSelectedId([]);
    handleClose();
  };

  // TODO: 확인 버튼 누를 시, POST할 데이터배열에 삽입 시키는 버튼
  const handleRivalCreate = () => {
    setRivalSelectedId([]);
    handleClose();
  };

  return {
    rivals: {
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
    },
  };
};

export type UseRivalReturn = ReturnType<typeof useRival>;
export type RivalProps = UseRivalReturn["rivals"];
