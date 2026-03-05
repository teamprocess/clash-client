import { useMemo, useState } from "react";
import { useMyRivalsQuery, MyRivalsRequest, MyRivalsResponse } from "@/entities/competition";
import {
  useRivalListQuery,
  RivalUsersResponse,
  RivalApplyRequest,
  rivalsApi,
} from "@/entities/home";
import { queryClient, getErrorMessage } from "@/shared/lib";
import { useRivalSignAllQuery } from "@/entities/home";
import { RivalSignAllResponse } from "@/entities/home/model/useRival.types";
import { useMutation } from "@tanstack/react-query";

const USER_STATUS = {
  ONLINE: "ONLINE",
  AWAY: "AWAY",
  OFFLINE: "OFFLINE",
} as const;

export interface MyRivalItem {
  user: MyRivalsRequest;
  getStatus: (status: UserStatus) => StatusType;
}

type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
type StatusType = "온라인" | "자리비움" | "오프라인" | "";

export const useRival = () => {
  const { data: myRivalsRes } = useMyRivalsQuery();
  const { data: rivalSignAllRes } = useRivalSignAllQuery();
  const { data: rivalListRes } = useRivalListQuery();

  const MY_RIVALS_KEY = ["myRivals"];
  const RIVAL_LIST_KEY = ["rivalList"];
  const RIVAL_SIGN_ALL_KEY = ["rivalSignAll"];

  const [error, setError] = useState<string | null>(null);

  const rivalsData: MyRivalsResponse | null = myRivalsRes?.data ?? null;
  const userList: RivalUsersResponse | null = rivalListRes?.data ?? null;
  const rivalSignAll: RivalSignAllResponse | null = rivalSignAllRes?.data ?? null;

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
  const [rivalSelectedId, setRivalSelectedId] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetSearch = () => setSearchText("");

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
    setError(null);
  };

  const handleSelectClose = () => {
    setRivalSelectedId([]);
    resetSearch();
    setError(null);
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
    if (isSubmitting) return;
    if (rivalSelectedId.length === 0) return;

    const payload: RivalApplyRequest = {
      ids: rivalSelectedId.map(id => ({ id })),
    };

    try {
      setIsSubmitting(true);
      setError(null);

      await rivalsApi.postRivalApply(payload);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: RIVAL_SIGN_ALL_KEY }),
        queryClient.invalidateQueries({ queryKey: MY_RIVALS_KEY }),
        queryClient.invalidateQueries({ queryKey: RIVAL_LIST_KEY }),
      ]);

      handleClose();
    } catch (error: unknown) {
      console.error("라이벌 신청 실패:", error);
      setError(getErrorMessage(error, "라이벌 신청 중 오류가 발생했습니다."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRivalDelete = async (rivalId: number) => {
    if (!rivalId) return false;

    try {
      setError(null);
      await rivalsApi.deleteRival(rivalId);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["myRivals"] }),
        queryClient.invalidateQueries({ queryKey: ["rivalList"] }),
      ]);

      return true;
    } catch (error: unknown) {
      console.error("라이벌 삭제 실패:", error);
      setError(getErrorMessage(error, "라이벌 삭제 중 오류가 발생했습니다."));
      return false;
    }
  };

  const cancelRivalSignMutation = useMutation({
    mutationFn: (rivalId: number) => rivalsApi.postRivalCancel({ id: rivalId }),

    onMutate: async (rivalId: number) => {
      setError(null);

      await queryClient.cancelQueries({ queryKey: RIVAL_SIGN_ALL_KEY });

      const previous = queryClient.getQueryData<RivalSignAllResponse | null>(RIVAL_SIGN_ALL_KEY);

      queryClient.setQueryData<RivalSignAllResponse | null>(RIVAL_SIGN_ALL_KEY, old => {
        if (!old) return old;

        return {
          ...old,
          rivals: (old.rivals ?? []).filter(u => u.rivalId !== rivalId),
        };
      });

      return { previous };
    },

    onError: (error, _rivalId: number, context) => {
      console.error("라이벌 신청 취소 실패:", error);
      setError(getErrorMessage(error, "라이벌 신청 취소 중 오류가 발생했습니다."));

      if (context?.previous !== undefined) {
        queryClient.setQueryData(RIVAL_SIGN_ALL_KEY, context.previous);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: RIVAL_SIGN_ALL_KEY });
      await queryClient.invalidateQueries({ queryKey: ["myRivals"] });
    },
  });

  const handleRivalSignCancel = async (rivalId: number) => {
    if (!rivalId) return false;

    try {
      setError(null);
      await cancelRivalSignMutation.mutateAsync(rivalId);
      return true;
    } catch (error: unknown) {
      console.error("라이벌 신청 취소 실패:", error);
      setError(getErrorMessage(error, "라이벌 신청 취소 중 오류가 발생했습니다."));
      return false;
    }
  };

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: number; name?: string } | null>(null);

  const openDeleteConfirm = (id: number, name?: string) => {
    setPendingDelete({ id, name });
    setDeleteConfirmOpen(true);
    setError(null);
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setPendingDelete(null);
    setError(null);
  };

  const confirmDeleteRival = async () => {
    const id = pendingDelete?.id;
    if (!id) return;

    await handleRivalDelete(id);

    if (!error) {
      closeDeleteConfirm();
    }
  };

  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  return {
    userList,
    rivalsData,
    rivalSignAll,
    getStatus,

    // add modal
    modalOpen,
    setModalOpen,
    handleOpen,
    handleClose,
    handleSelectClose,

    // selection
    rivalSelectedId,
    handleUserSelect,

    // actions
    handleRivalCreate,
    handleRivalDelete,

    // delete confirm
    deleteConfirmOpen,
    pendingDelete,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDeleteRival,
    pendingDeleteId,
    setPendingDeleteId,
    handleRivalSignCancel,

    // search
    searchText,
    setSearchText,
    filteredUsers,

    // error
    error,
  };
};
