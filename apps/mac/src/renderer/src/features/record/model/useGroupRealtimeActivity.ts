import { useEffect } from "react";
import { useGetMyProfile } from "@/entities/user";
import { useGroupMembersActivity } from "./useGroupMembersActivity";
import { useLiveRecordStudyTime } from "./useLiveRecordStudyTime";

export const useGroupRealtimeActivity = (groupId: number | null, selectedDate?: string) => {
  const { data: myProfile } = useGetMyProfile();
  const myUserId = myProfile?.id ?? null;
  const { totalStudyTime, isLoading, isStudying } = useLiveRecordStudyTime(selectedDate);
  const { groupMembers, activeStudyingCount, incrementStudyingMembers } = useGroupMembersActivity(
    groupId,
    myUserId,
    selectedDate
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      incrementStudyingMembers();
    }, 1000);

    return () => window.clearInterval(interval);
  }, [incrementStudyingMembers]);

  return {
    totalStudyTime,
    isLoading,
    isStudying,
    groupMembers,
    activeStudyingCount,
  };
};
