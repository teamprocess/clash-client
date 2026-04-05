import type { AnnouncementItem } from "@/entities/announcement";

const HIDE_FOR_DAYS = 3;
const HIDE_KEY_PREFIX = "clash:announcement:hidden-until:";

const getHideStorageKey = (announcementId: number) => `${HIDE_KEY_PREFIX}${announcementId}`;

const getHiddenUntil = (announcementId: number) => {
  const raw = window.localStorage.getItem(getHideStorageKey(announcementId));
  if (!raw) {
    return null;
  }

  const hiddenUntil = Number(raw);
  if (!Number.isFinite(hiddenUntil)) {
    window.localStorage.removeItem(getHideStorageKey(announcementId));
    return null;
  }

  return hiddenUntil;
};

export const isAnnouncementHidden = (announcementId: number) => {
  const hiddenUntil = getHiddenUntil(announcementId);
  if (!hiddenUntil) {
    return false;
  }

  if (Date.now() >= hiddenUntil) {
    window.localStorage.removeItem(getHideStorageKey(announcementId));
    return false;
  }

  return true;
};

export const hideAnnouncementForThreeDays = (announcementId: number) => {
  const hiddenUntil = Date.now() + HIDE_FOR_DAYS * 24 * 60 * 60 * 1000;
  window.localStorage.setItem(getHideStorageKey(announcementId), String(hiddenUntil));
};

export const formatAnnouncementPeriod = (startedAt: string | null, endedAt: string | null) => {
  if (!startedAt && !endedAt) {
    return null;
  }

  const formatDate = (value: string | null) => {
    if (!value) return null;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const startText = formatDate(startedAt);
  const endText = formatDate(endedAt);

  if (startText && endText) {
    return `${startText} - ${endText}`;
  }

  return startText ?? endText;
};

export const sortAnnouncements = (announcements: AnnouncementItem[]) =>
  [...announcements].sort((left, right) => {
    const leftTime = left.startedAt ? new Date(left.startedAt).getTime() : 0;
    const rightTime = right.startedAt ? new Date(right.startedAt).getTime() : 0;

    if (leftTime !== rightTime) {
      return rightTime - leftTime;
    }

    return right.id - left.id;
  });
