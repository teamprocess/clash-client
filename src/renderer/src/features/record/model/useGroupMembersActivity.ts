import { useCallback, useMemo, useState } from "react";
import { type GroupMember, useGroupActivityQuery } from "@/entities/group";
import { useRecordStore } from "./recordStore";

export const useGroupMembersActivity = (groupId: number | null, myUserId: number | null) => {
  const { data: activityResponse, dataUpdatedAt } = useGroupActivityQuery(groupId);
  const tasks = useRecordStore(state => state.tasks);
  const currentStudyTime = useRecordStore(state => state.currentStudyTime);
  const activeTaskId = useRecordStore(state => state.activeTaskId);
  const [now, setNow] = useState(() => Date.now());
  const elapsedSeconds =
    dataUpdatedAt > 0 ? Math.max(0, Math.floor((now - dataUpdatedAt) / 1000)) : 0;
  const myTotalStudyTime = useMemo(
    () => tasks.reduce((sum, task) => sum + task.studyTime, 0) + currentStudyTime,
    [tasks, currentStudyTime]
  );

  const groupMembers = useMemo(() => {
    const members: GroupMember[] = activityResponse?.data?.members ?? [];
    return members.map(member => {
      const serverStudyTime = member.isStudying
        ? member.studyTime + elapsedSeconds
        : member.studyTime;

      if (myUserId !== null && member.id === myUserId) {
        return {
          ...member,
          // 내 시간은 값 깜박임 방지로 기록 화면 로컬 상태를 단일 소스로 사용
          studyTime: myTotalStudyTime,
          isStudying: activeTaskId !== null,
        };
      }

      return member.isStudying ? { ...member, studyTime: serverStudyTime } : member;
    });
  }, [activityResponse, myUserId, myTotalStudyTime, activeTaskId, elapsedSeconds]);

  // 조회한 그룹 멤버 중 공부 중인 멤버의 공부 시간을 1초 늘리는 Callback 함수
  const incrementStudyingMembers = useCallback(() => {
    setNow(Date.now());
  }, []);

  return {
    groupMembers,
    incrementStudyingMembers,
  };
};
