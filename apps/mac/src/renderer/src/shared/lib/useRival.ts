import { useMemo, useState } from "react";
import {
  myRivalsApi,
  useMyRivalsQuery,
  MyRivalsResponse,
} from "@/entities/competition";
import {
  useRivalListQuery,
  RivalUsersResponse,
  RivalApplyRequest,
  rivalsApi,
} from "@/entities/home";
import { useRivalSignAllQuery } from "@/entities/home";
import { RivalSignAllResponse } from "@/entities/home/model/useRival.types";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "./error";
import { queryClient } from "./queryClient";

export const useRival = () => {
  const { data: myRivalsRes } = useMyRivalsQuery();
  const { data: rivalSignAllRes } = useRivalSignAllQuery();
  const { data: rivalListRes } = useRivalListQuery();

  const MY_RIVALS_KEY = ["myRivals"];
  const RIVAL_LIST_KEY = ["rivalList"];
  const RIVAL_SIGN_ALL_KEY = ["rivalSignAll"];

  const [createError, setCreateError] = useState<string | null>(null);
  const [signListError, setSignListError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const rivalsData: MyRivalsResponse | null = myRivalsRes?.data ?? null;
  const userList: RivalUsersResponse | null = rivalListRes?.data ?? null;
  const rivalSignAll: RivalSignAllResponse | null = rivalSignAllRes?.data ?? null;

  const [modalOpen, setModalOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [rivalSelectedId, setRivalSelectedId] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSubmitting, setIsDeleteSubmitting] = useState(false);
  const [cancelingRivalId, setCancelingRivalId] = useState<number | null>(null);

  const clearAllErrors = () => {
    setCreateError(null);
    setSignListError(null);
    setDeleteError(null);
  };

  const resetSearch = () => setSearchText("");
  const resetCreateForm = () => {
    setRivalSelectedId([]);
    resetSearch();
    setCreateError(null);
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
    clearAllErrors();
  };

  const handleSelectClose = () => {
    setRivalSelectedId([]);
    resetSearch();
    clearAllErrors();
  };

  const handleUserSelect = (id: number) => {
    const currentRivalCount = rivalsData?.myRivals.length ?? 0;
    const maxAvailableSlots = 4 - currentRivalCount;

    if (maxAvailableSlots <= 0) {
      setCreateError("최대 라이벌 수에 도달했습니다.");
      return;
    }

    if (rivalSelectedId.includes(id)) {
      setCreateError(null);
      setRivalSelectedId(prev => prev.filter(item => item !== id));
      return;
    }

    if (rivalSelectedId.length >= maxAvailableSlots) {
      setCreateError("최대 라이벌 수에 도달했습니다.");
      return;
    }

    setCreateError(null);
    setRivalSelectedId(prev => [...prev, id]);
  };

  const handleRivalCreate = async () => {
    if (isSubmitting) return false;
    if (rivalSelectedId.length === 0) return false;

    const payload: RivalApplyRequest = {
      ids: rivalSelectedId.map(id => ({ id })),
    };

    try {
      setIsSubmitting(true);
      setCreateError(null);

      await rivalsApi.postRivalApply(payload);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: RIVAL_SIGN_ALL_KEY }),
        queryClient.invalidateQueries({ queryKey: MY_RIVALS_KEY }),
        queryClient.invalidateQueries({ queryKey: RIVAL_LIST_KEY }),
      ]);

      resetCreateForm();
      return true;
    } catch (error: unknown) {
      console.error("라이벌 신청 실패:", error);
      setCreateError(getErrorMessage(error, "라이벌 신청 중 오류가 발생했습니다."));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const refreshRivalQueries = async () => {
    await Promise.allSettled([
      queryClient.invalidateQueries({ queryKey: MY_RIVALS_KEY }),
      queryClient.invalidateQueries({ queryKey: RIVAL_LIST_KEY }),
      queryClient.invalidateQueries({ queryKey: RIVAL_SIGN_ALL_KEY }),
    ]);
  };

  const hasDeletedRivalBeenRemoved = async (rivalId: number) => {
    const latestMyRivals = await queryClient.fetchQuery({
      queryKey: MY_RIVALS_KEY,
      queryFn: myRivalsApi.getMyRivals,
      staleTime: 0,
    });

    const currentMyRivals = latestMyRivals.data?.myRivals ?? [];

    return !currentMyRivals.some(rival => rival.rivalId === rivalId || rival.id === rivalId);
  };

  const handleRivalDelete = async (rivalId: number) => {
    if (!rivalId || isDeleteSubmitting) return false;

    try {
      setIsDeleteSubmitting(true);
      setDeleteError(null);
      await rivalsApi.deleteRival(rivalId);
      await refreshRivalQueries();

      return true;
    } catch (error: unknown) {
      try {
        const wasDeleted = await hasDeletedRivalBeenRemoved(rivalId);

        if (wasDeleted) {
          setDeleteError(null);
          await refreshRivalQueries();
          return true;
        }
      } catch (refetchError) {
        console.error("라이벌 삭제 후 상태 확인 실패:", refetchError);
      }

      console.error("라이벌 삭제 실패:", error);
      setDeleteError(getErrorMessage(error, "라이벌 삭제 중 오류가 발생했습니다."));
      return false;
    } finally {
      setIsDeleteSubmitting(false);
    }
  };

  const cancelRivalSignMutation = useMutation({
    mutationFn: (rivalId: number) => rivalsApi.postRivalCancel({ id: rivalId }),

    onMutate: async () => {
      setSignListError(null);
    },

    onError: error => {
      console.error("라이벌 신청 취소 실패:", error);
      setSignListError(getErrorMessage(error, "라이벌 신청 취소 중 오류가 발생했습니다."));
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: RIVAL_SIGN_ALL_KEY });
      await queryClient.invalidateQueries({ queryKey: ["myRivals"] });
    },
  });

  const handleRivalSignCancel = async (rivalId: number) => {
    if (!rivalId || cancelRivalSignMutation.isPending) return false;

    try {
      setSignListError(null);
      setCancelingRivalId(rivalId);
      await cancelRivalSignMutation.mutateAsync(rivalId);
      return true;
    } catch (error: unknown) {
      console.error("라이벌 신청 취소 실패:", error);
      setSignListError(getErrorMessage(error, "라이벌 신청 취소 중 오류가 발생했습니다."));
      return false;
    } finally {
      setCancelingRivalId(null);
    }
  };

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: number; name?: string } | null>(null);

  const openDeleteConfirm = (id: number, name?: string) => {
    setPendingDelete({ id, name });
    setDeleteConfirmOpen(true);
    setDeleteError(null);
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setPendingDelete(null);
    setDeleteError(null);
  };

  const confirmDeleteRival = async () => {
    const id = pendingDelete?.id;
    if (!id) return;

    const ok = await handleRivalDelete(id);

    if (ok) {
      closeDeleteConfirm();
    }
  };

  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const filteredSignRivals = useMemo(() => {
    const list = rivalSignAll?.rivals ?? [];
    return list.filter(u => u.rivalLinkingStatus === "PENDING");
  }, [rivalSignAll?.rivals]);

  return {
    userList,
    rivalsData,
    rivalSignAll,

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
    isSubmitting,

    // delete confirm
    deleteConfirmOpen,
    pendingDelete,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDeleteRival,
    pendingDeleteId,
    setPendingDeleteId,
    handleRivalSignCancel,
    isDeleteSubmitting,
    isCancelingSign: cancelRivalSignMutation.isPending,
    cancelingRivalId,

    // search
    searchText,
    setSearchText,
    filteredUsers,

    // filtered sign list
    filteredSignRivals,

    // error
    createError,
    signListError,
    deleteError,
  };
};
