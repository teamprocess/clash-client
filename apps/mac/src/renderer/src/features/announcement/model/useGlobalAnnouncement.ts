import { useMemo, useState } from "react";
import { useActiveAnnouncementsQuery } from "@/entities/announcement";
import { useGetMyProfile } from "@/entities/user";
import {
  formatAnnouncementPeriod,
  hideAnnouncementForThreeDays,
  isAnnouncementHidden,
  sortAnnouncements,
} from "../lib/announcementVisibility";

export const useGlobalAnnouncement = () => {
  const { data: user, isLoading: isUserLoading } = useGetMyProfile();
  const isAnnouncementEnabled = Boolean(user?.githubLinked) && !isUserLoading;
  const { data: announcements = [] } = useActiveAnnouncementsQuery(isAnnouncementEnabled);
  const [dismissedAnnouncementId, setDismissedAnnouncementId] = useState<number | null>(null);
  const [hideForThreeDaysChecked, setHideForThreeDaysChecked] = useState(false);
  const [hideForThreeDaysAnnouncementId, setHideForThreeDaysAnnouncementId] = useState<
    number | null
  >(null);

  const announcement = useMemo(() => {
    const [latestAnnouncement] = sortAnnouncements(announcements);
    return latestAnnouncement ?? null;
  }, [announcements]);

  const isOpen = Boolean(
    isAnnouncementEnabled &&
      announcement &&
      announcement.id !== dismissedAnnouncementId &&
      !isAnnouncementHidden(announcement.id)
  );

  const hideForThreeDays =
    announcement?.id === hideForThreeDaysAnnouncementId ? hideForThreeDaysChecked : false;

  const setHideForThreeDays = (checked: boolean) => {
    setHideForThreeDaysChecked(checked);
    setHideForThreeDaysAnnouncementId(announcement?.id ?? null);
  };

  const handleClose = () => {
    if (!announcement) {
      return;
    }

    if (hideForThreeDays) {
      hideAnnouncementForThreeDays(announcement.id);
    }

    setDismissedAnnouncementId(announcement.id);
    setHideForThreeDaysChecked(false);
    setHideForThreeDaysAnnouncementId(announcement.id);
  };

  return {
    announcement,
    isOpen,
    hideForThreeDays,
    setHideForThreeDays,
    handleClose,
    period: announcement
      ? formatAnnouncementPeriod(announcement.startedAt, announcement.endedAt)
      : null,
  };
};
