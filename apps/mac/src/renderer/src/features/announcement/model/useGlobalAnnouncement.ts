import { useMemo, useState } from "react";
import { useActiveAnnouncementsQuery } from "@/entities/announcement";
import { useGetMyProfile } from "@/entities/user";
import {
  hideAnnouncementForThreeDays,
  isAnnouncementHidden,
  sortAnnouncements,
} from "../lib/announcementVisibility";

export const useGlobalAnnouncement = () => {
  const { data: user, isLoading: isUserLoading } = useGetMyProfile();
  const isAnnouncementEnabled = Boolean(user?.githubLinked) && !isUserLoading;
  const { data: announcements = [] } = useActiveAnnouncementsQuery(isAnnouncementEnabled);
  const [dismissedAnnouncementIds, setDismissedAnnouncementIds] = useState<number[]>([]);
  const [hideForThreeDaysChecked, setHideForThreeDaysChecked] = useState(false);
  const [hideForThreeDaysAnnouncementId, setHideForThreeDaysAnnouncementId] = useState<
    number | null
  >(null);

  const announcement = useMemo(() => {
    return (
      sortAnnouncements(announcements).find(
        announcement =>
          !dismissedAnnouncementIds.includes(announcement.id) && !isAnnouncementHidden(announcement.id)
      ) ?? null
    );
  }, [announcements, dismissedAnnouncementIds]);

  const isOpen = Boolean(isAnnouncementEnabled && announcement);

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

    setDismissedAnnouncementIds(previous =>
      previous.includes(announcement.id) ? previous : [...previous, announcement.id]
    );
    setHideForThreeDaysChecked(false);
    setHideForThreeDaysAnnouncementId(announcement.id);
  };

  return {
    announcement,
    isOpen,
    hideForThreeDays,
    setHideForThreeDays,
    handleClose,
  };
};
