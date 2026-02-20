import { useMemo, useState } from "react";
import { useMyRivalsQuery, MyRivalsRequest, MyRivalsResponse } from "@/entities/competition";
import {
  useRivalListQuery,
  RivalUsersResponse,
  RivalApplyRequest,
  rivalsApi,
} from "@/entities/home";
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

export const useRival = () => {
  const { data: myRivalsRes } = useMyRivalsQuery();
  const { data: rivalListRes } = useRivalListQuery();
  const [error, setError] = useState<string | null>(null);

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

  const [searchText, setSearchText] = useState("");

  const resetSearch = () => {
    setSearchText("");
  };

  const filteredUsers = useMemo(() => {
    const users = userList?.users ?? [];
    const q = searchText.trim().toLowerCase();
    if (!q) return users;

    return users.filter(u => {
      const name = (u.name ?? "").toLowerCase();
      const username = (u.username ?? "").toLowerCase();
      return name.includes(q) || username.includes(q);
    });
  }, [userList?.users, searchText]);

  const handleOpen = () => setModalOpen(true);

  const handleClose = () => {
    setModalOpen(false);
    setRivalSelectedId([]);
    resetSearch();
  };

  const handleSelectClose = () => {
    setRivalSelectedId([]);
    resetSearch();
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

  const handleRivalCreate = async () => {
    if (rivalSelectedId.length === 0) return;

    const payload: RivalApplyRequest = {
      ids: rivalSelectedId.map(id => ({ id })),
    };

    try {
      await rivalsApi.postRivalApply(payload);
      handleClose();
    } catch (error: unknown) {
      console.error("라이벌 신청 실패:", error);
      setError(getErrorMessage(error, "라이벌 신청 중 오류가 발생했습니다."));
    }
  };

  return {
    userList,
    rivalsData,
    getStatus,
    modalOpen,
    setModalOpen,
    handleOpen,
    handleSelectClose,
    handleClose,
    rivalSelectedId,
    handleUserSelect,
    handleRivalCreate,
    error,
    searchText,
    setSearchText,
    filteredUsers,
  };
};
