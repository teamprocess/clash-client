import { useEffect, useMemo, useRef, useState } from "react";
import { battleApi } from "@/entities/competition";
import { rivalsApi } from "@/entities/home";
import {
  noticeApi,
  type NoticeItem,
  noticeQueryKeys,
  useMyAllNoticesQuery,
  useMyUnreadNoticesQuery,
} from "@/entities/notice";
import { getErrorMessage, queryClient } from "@/shared/lib";

export const formatNoticeDate = (createdAt: string | null) => {
  if (!createdAt) {
    return "";
  }

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = String(date.getFullYear() % 100).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hour}:${minute}`;
};

const markNoticesAsReadInCache = (notices: NoticeItem[], noticeIds: number[]) => {
  const noticeIdSet = new Set(noticeIds);
  return notices.map(notice => (noticeIdSet.has(notice.id) ? { ...notice, isRead: true } : notice));
};

interface NoticeCacheSnapshot {
  unreadNotices?: NoticeItem[];
  allNotices?: NoticeItem[];
}

const applyReadNoticeOptimisticUpdate = async (noticeIds: number[]) => {
  await queryClient.cancelQueries({ queryKey: noticeQueryKeys.all });

  const previousUnreadNotices = queryClient.getQueryData<NoticeItem[]>(noticeQueryKeys.unread);
  const previousAllNotices = queryClient.getQueryData<NoticeItem[]>(noticeQueryKeys.allNotices);

  if (previousUnreadNotices) {
    queryClient.setQueryData<NoticeItem[]>(
      noticeQueryKeys.unread,
      markNoticesAsReadInCache(previousUnreadNotices, noticeIds)
    );
  }

  if (previousAllNotices) {
    queryClient.setQueryData<NoticeItem[]>(
      noticeQueryKeys.allNotices,
      markNoticesAsReadInCache(previousAllNotices, noticeIds)
    );
  }

  return {
    unreadNotices: previousUnreadNotices,
    allNotices: previousAllNotices,
  };
};

const rollbackNoticeQueryOptimisticUpdate = (
  queryKey: readonly string[],
  previousNotices: NoticeItem[] | undefined,
  noticeIds?: number[]
) => {
  if (!previousNotices) {
    return;
  }

  if (!noticeIds || noticeIds.length === 0) {
    queryClient.setQueryData<NoticeItem[]>(queryKey, previousNotices);
    return;
  }

  const previousNoticeReadMap = new Map(previousNotices.map(notice => [notice.id, notice.isRead]));
  const noticeIdSet = new Set(noticeIds);

  queryClient.setQueryData<NoticeItem[]>(queryKey, currentNotices => {
    if (!currentNotices) {
      return previousNotices;
    }

    return currentNotices.map(notice =>
      noticeIdSet.has(notice.id)
        ? { ...notice, isRead: previousNoticeReadMap.get(notice.id) ?? notice.isRead }
        : notice
    );
  });
};

const rollbackNoticeOptimisticUpdate = (
  previousNotices: NoticeCacheSnapshot,
  noticeIds?: number[]
) => {
  rollbackNoticeQueryOptimisticUpdate(
    noticeQueryKeys.unread,
    previousNotices.unreadNotices,
    noticeIds
  );
  rollbackNoticeQueryOptimisticUpdate(
    noticeQueryKeys.allNotices,
    previousNotices.allNotices,
    noticeIds
  );
};

const invalidateNoticeQueries = async () => {
  await queryClient.invalidateQueries({ queryKey: noticeQueryKeys.all });
};

const invalidateNoticeRelatedQueries = async () => {
  await Promise.all([
    invalidateNoticeQueries(),
    queryClient.invalidateQueries({ queryKey: ["user"] }),
    queryClient.invalidateQueries({ queryKey: ["myRivals"] }),
    queryClient.invalidateQueries({ queryKey: ["compareRivals"] }),
    queryClient.invalidateQueries({ queryKey: ["battleInfo"] }),
    queryClient.invalidateQueries({ queryKey: ["battleDetail"] }),
    queryClient.invalidateQueries({ queryKey: ["battleAnalyze"] }),
    queryClient.invalidateQueries({ queryKey: ["battleList"] }),
    queryClient.invalidateQueries({ queryKey: ["rivalList"] }),
  ]);
};

const readNoticeAndRefresh = async (notice: NoticeItem) => {
  await noticeApi.readNotice(notice.id);
  await invalidateNoticeQueries();
};

const runNoticeAction = async (notice: NoticeItem, action: "accept" | "reject") => {
  if (notice.category === "APPLY_RIVAL") {
    if (!notice.rivalId) {
      throw new Error(
        `라이벌 요청 ID가 없어 ${action === "accept" ? "수락" : "거절"}할 수 없습니다.`
      );
    }

    if (action === "accept") {
      await rivalsApi.postRivalAccept({ id: notice.rivalId });
      return;
    }

    await rivalsApi.postRivalReject({ id: notice.rivalId });
    return;
  }

  if (notice.category === "APPLY_BATTLE") {
    if (!notice.battleId) {
      throw new Error(
        `배틀 요청 ID가 없어 ${action === "accept" ? "수락" : "거절"}할 수 없습니다.`
      );
    }

    if (action === "accept") {
      await battleApi.postAcceptBattle({ id: notice.battleId });
      return;
    }

    await battleApi.postRejectBattle({ id: notice.battleId });
    return;
  }

  throw new Error(`${action === "accept" ? "수락" : "거절"} 가능한 알림 타입이 아닙니다.`);
};

export type NoticeFilterTab = "UNREAD" | "ALL";

export const useTopbarNotice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NoticeFilterTab>("UNREAD");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [processingNoticeId, setProcessingNoticeId] = useState<number | null>(null);
  const wasOpenRef = useRef(false);
  const isAllTab = activeTab === "ALL";
  const { data: unreadNotices = [], isLoading: isUnreadNoticesLoading } = useMyUnreadNoticesQuery();
  const { data: allNotices = [], isLoading: isAllNoticesLoading } = useMyAllNoticesQuery(
    isOpen && isAllTab
  );

  const notices = useMemo(
    () => (isAllTab ? allNotices : unreadNotices),
    [allNotices, isAllTab, unreadNotices]
  );
  const isLoading = isAllTab ? isAllNoticesLoading : isUnreadNoticesLoading;

  const unreadCount = useMemo(
    () => unreadNotices.filter(notice => !notice.isRead).length,
    [unreadNotices]
  );
  const hasNotice = notices.length > 0;

  const filteredNotices = useMemo(() => {
    const normalizedKeyword = searchKeyword.trim().toLowerCase();
    if (!normalizedKeyword) {
      return notices;
    }

    return notices.filter(notice => {
      return (
        notice.message.toLowerCase().includes(normalizedKeyword) ||
        `${notice.senderId}`.includes(normalizedKeyword) ||
        (notice.senderUsername?.toLowerCase().includes(normalizedKeyword) ?? false) ||
        (notice.senderName?.toLowerCase().includes(normalizedKeyword) ?? false) ||
        (notice.receiverName?.toLowerCase().includes(normalizedKeyword) ?? false)
      );
    });
  }, [notices, searchKeyword]);

  const emptyMessage = useMemo(() => {
    if (searchKeyword.trim()) {
      return "검색 결과가 없습니다.\n최근 2주 이내의 알림만 확인 할 수 있습니다.";
    }

    if (activeTab === "UNREAD") {
      return "모든 알림을 확인했습니다.";
    }

    return "현재 도착한 알림이 없습니다.";
  }, [activeTab, searchKeyword]);

  const toggle = () => {
    setIsOpen(prev => {
      const next = !prev;
      if (next) {
        setActiveTab("UNREAD");
      }
      return next;
    });
  };

  const close = () => {
    setActiveTab("UNREAD");
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      return;
    }

    if (!wasOpenRef.current) {
      return;
    }

    wasOpenRef.current = false;

    const unreadNoticeIds = unreadNotices.filter(notice => !notice.isRead).map(notice => notice.id);

    if (unreadNoticeIds.length === 0) {
      return;
    }

    void (async () => {
      const previousNotices = await applyReadNoticeOptimisticUpdate(unreadNoticeIds);
      const results = await Promise.allSettled(
        unreadNoticeIds.map(noticeId => noticeApi.readNotice(noticeId))
      );

      const failedNoticeIds = results.flatMap((result, index) =>
        result.status === "rejected" ? [unreadNoticeIds[index]] : []
      );

      if (failedNoticeIds.length > 0) {
        rollbackNoticeOptimisticUpdate(previousNotices, failedNoticeIds);
        console.error(
          "알림 자동 읽음 처리 실패:",
          failedNoticeIds.map(noticeId => ({ noticeId }))
        );
      }

      await invalidateNoticeQueries();
    })();
  }, [isOpen, unreadNotices]);

  const readNotice = async (notice: NoticeItem) => {
    if (notice.isRead || processingNoticeId !== null) {
      return;
    }

    setProcessingNoticeId(notice.id);
    const previousNotices = await applyReadNoticeOptimisticUpdate([notice.id]);
    try {
      await readNoticeAndRefresh(notice);
    } catch (error) {
      rollbackNoticeOptimisticUpdate(previousNotices, [notice.id]);
      const errorMessage = getErrorMessage(error, "알림 읽음 처리에 실패했습니다.");
      console.error("알림 읽음 처리 실패:", errorMessage, error);
    } finally {
      setProcessingNoticeId(null);
    }
  };

  const confirmNotice = async (notice: NoticeItem) => {
    if (processingNoticeId !== null) {
      return;
    }

    setProcessingNoticeId(notice.id);
    const previousNotices = await applyReadNoticeOptimisticUpdate([notice.id]);
    try {
      await runNoticeAction(notice, "accept");
      await noticeApi.readNotice(notice.id);
      await invalidateNoticeRelatedQueries();
    } catch (error) {
      rollbackNoticeOptimisticUpdate(previousNotices, [notice.id]);
      const errorMessage = getErrorMessage(error, "알림 수락 처리에 실패했습니다.");
      console.error("알림 수락 처리 실패:", errorMessage, error);
    } finally {
      setProcessingNoticeId(null);
    }
  };

  const denyNotice = async (notice: NoticeItem) => {
    if (processingNoticeId !== null) {
      return;
    }

    setProcessingNoticeId(notice.id);
    const previousNotices = await applyReadNoticeOptimisticUpdate([notice.id]);
    try {
      await runNoticeAction(notice, "reject");
      await noticeApi.readNotice(notice.id);
      await invalidateNoticeRelatedQueries();
    } catch (error) {
      rollbackNoticeOptimisticUpdate(previousNotices, [notice.id]);
      const errorMessage = getErrorMessage(error, "알림 거절 처리에 실패했습니다.");
      console.error("알림 거절 처리 실패:", errorMessage, error);
    } finally {
      setProcessingNoticeId(null);
    }
  };

  return {
    isOpen,
    isLoading,
    hasNotice,
    unreadCount,
    activeTab,
    searchKeyword,
    filteredNotices,
    emptyMessage,
    processingNoticeId,
    setActiveTab,
    setSearchKeyword,
    toggle,
    close,
    readNotice,
    confirmNotice,
    denyNotice,
  };
};
