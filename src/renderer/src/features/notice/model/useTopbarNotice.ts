import { useMemo, useState } from "react";
import { battleApi } from "@/entities/competition";
import { rivalsApi } from "@/entities/home";
import { noticeApi, type NoticeItem, noticeQueryKeys, useMyNoticesQuery } from "@/entities/notice";
import { getErrorMessage, queryClient } from "@/shared/lib";

export const formatNoticeDate = (createdAt: string | null) => {
  if (!createdAt) {
    return "";
  }

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

const invalidateNoticeRelatedQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: noticeQueryKeys.all }),
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
  await invalidateNoticeRelatedQueries();
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

export const useTopbarNotice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [processingNoticeId, setProcessingNoticeId] = useState<number | null>(null);
  const { data: notices = [], isLoading } = useMyNoticesQuery();

  const unreadCount = useMemo(() => notices.filter(notice => !notice.isRead).length, [notices]);
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

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const close = () => {
    setIsOpen(false);
  };

  const readNotice = async (notice: NoticeItem) => {
    if (notice.isRead || processingNoticeId !== null) {
      return;
    }

    setProcessingNoticeId(notice.id);
    try {
      await readNoticeAndRefresh(notice);
    } catch (error) {
      const errorMessage = getErrorMessage(error, "알림 읽음 처리에 실패했습니다.");
      console.error("알림 읽음 처리 실패:", errorMessage, error);
    } finally {
      setProcessingNoticeId(null);
    }
  };

  const confirmNotice = async (notice: NoticeItem) => {
    if (notice.isRead || processingNoticeId !== null) {
      return;
    }

    setProcessingNoticeId(notice.id);
    try {
      await runNoticeAction(notice, "accept");
      await noticeApi.readNotice(notice.id);
      await invalidateNoticeRelatedQueries();
    } catch (error) {
      const errorMessage = getErrorMessage(error, "알림 수락 처리에 실패했습니다.");
      console.error("알림 수락 처리 실패:", errorMessage, error);
    } finally {
      setProcessingNoticeId(null);
    }
  };

  const denyNotice = async (notice: NoticeItem) => {
    if (notice.isRead || processingNoticeId !== null) {
      return;
    }

    setProcessingNoticeId(notice.id);
    try {
      await runNoticeAction(notice, "reject");
      await noticeApi.readNotice(notice.id);
      await invalidateNoticeRelatedQueries();
    } catch (error) {
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
    searchKeyword,
    filteredNotices,
    processingNoticeId,
    setSearchKeyword,
    toggle,
    close,
    readNotice,
    confirmNotice,
    denyNotice,
  };
};
