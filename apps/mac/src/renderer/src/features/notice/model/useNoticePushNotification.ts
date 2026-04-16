import { useEffect, useRef } from "react";
import { type NoticeItem, useMyUnreadNoticesQuery } from "@/entities/notice";
import noticeSoundUrl from "../ui/assets/clash-notification.mp3";

const getNoticeNotificationTitle = (notice: NoticeItem) => {
  if (notice.category === "GLOBAL_NOTICE") {
    return "전체 공지";
  }

  const sender = notice.senderName ?? notice.senderUsername;

  if (sender === "Clash") return `새 알림`;

  return sender ? `${sender}님의 알림` : "새 알림";
};

export const useNoticePushNotification = () => {
  const { data: unreadNotices = [], isFetched } = useMyUnreadNoticesQuery();
  const hasInitializedRef = useRef(false);
  const previousUnreadNoticeIdsRef = useRef<Set<number>>(new Set());
  const noticeSoundRef = useRef<HTMLAudioElement | null>(null);
  const unreadCount = unreadNotices.filter(notice => !notice.isRead).length;

  useEffect(() => {
    const noticeSound = new Audio(noticeSoundUrl);
    noticeSound.preload = "auto";
    noticeSoundRef.current = noticeSound;

    return () => {
      noticeSound.pause();
      noticeSound.src = "";
      noticeSoundRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof Notification === "undefined") {
      return;
    }

    if (Notification.permission !== "default") {
      return;
    }

    void Notification.requestPermission().catch(error => {
      console.error("알림 권한 요청에 실패했습니다.", error);
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.api?.setBadgeCount) {
      return;
    }

    void window.api.setBadgeCount(unreadCount);
  }, [unreadCount]);

  useEffect(() => {
    if (!isFetched) {
      return;
    }

    const currentUnreadNotices = unreadNotices.filter(notice => !notice.isRead);
    const currentUnreadNoticeIds = new Set(currentUnreadNotices.map(notice => notice.id));

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      previousUnreadNoticeIdsRef.current = currentUnreadNoticeIds;
      return;
    }

    const newUnreadNotices = currentUnreadNotices.filter(
      notice => !previousUnreadNoticeIdsRef.current.has(notice.id)
    );

    previousUnreadNoticeIdsRef.current = currentUnreadNoticeIds;

    if (newUnreadNotices.length === 0) {
      return;
    }

    const noticeSound = noticeSoundRef.current;
    if (noticeSound) {
      noticeSound.currentTime = 0;
      void noticeSound.play().catch(error => {
        console.error("알림 음원 재생에 실패했습니다.", error);
      });
    }

    if (
      typeof window === "undefined" ||
      typeof Notification === "undefined" ||
      document.hasFocus()
    ) {
      return;
    }

    for (const notice of newUnreadNotices) {
      const showNotification = async () => {
        let permission = Notification.permission;
        if (permission === "default") {
          permission = await Notification.requestPermission();
        }

        if (permission !== "granted") {
          return;
        }

        const notification = new Notification(getNoticeNotificationTitle(notice), {
          body: notice.message,
          silent: true,
        });

        notification.onclick = () => {
          window.focus();
        };
      };

      void showNotification().catch(error => {
        console.error("시스템 알림 생성에 실패했습니다.", error);
      });
    }
  }, [isFetched, unreadNotices]);
};
