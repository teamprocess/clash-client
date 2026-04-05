import { useEffect, useMemo, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [hideForThreeDays, setHideForThreeDays] = useState(false);

  const announcement = useMemo(() => {
    const [latestAnnouncement] = sortAnnouncements(announcements);
    return latestAnnouncement ?? null;
  }, [announcements]);

  useEffect(() => {
    if (!isAnnouncementEnabled) {
      setIsOpen(false);
      setHideForThreeDays(false);
      return;
    }

    if (!announcement) {
      setIsOpen(false);
      setHideForThreeDays(false);
      return;
    }

    if (announcement.id === dismissedAnnouncementId) {
      return;
    }

    if (isAnnouncementHidden(announcement.id)) {
      setIsOpen(false);
      return;
    }

    setHideForThreeDays(false);
    setIsOpen(true);
  }, [announcement, dismissedAnnouncementId, isAnnouncementEnabled]);

  const handleClose = () => {
    if (!announcement) {
      setIsOpen(false);
      return;
    }

    if (hideForThreeDays) {
      hideAnnouncementForThreeDays(announcement.id);
    }

    setDismissedAnnouncementId(announcement.id);
    setHideForThreeDays(false);
    setIsOpen(false);
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
