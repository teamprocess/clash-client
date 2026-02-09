import { useCallback, useMemo, useState } from "react";
import { type GroupMember, useGroupActivityQuery } from "@/entities/group";

export const useGroupMembersActivity = (groupId: number | null) => {
  const { data: activityResponse, dataUpdatedAt } = useGroupActivityQuery(groupId);
  const [now, setNow] = useState(() => Date.now());
  const elapsedSeconds =
    dataUpdatedAt > 0 ? Math.max(0, Math.floor((now - dataUpdatedAt) / 1000)) : 0;

  const groupMembers = useMemo(() => {
    const members: GroupMember[] = activityResponse?.data?.members ?? [];
    return members.map(member =>
      member.isStudying ? { ...member, studyTime: member.studyTime + elapsedSeconds } : member
    );
  }, [activityResponse, elapsedSeconds]);

  // 조회한 그룹 멤버 중 공부 중인 멤버의 공부 시간을 1초 늘리는 Callback 함수
  const incrementStudyingMembers = useCallback(() => {
    setNow(Date.now());
  }, []);

  return {
    groupMembers,
    incrementStudyingMembers,
  };
};
