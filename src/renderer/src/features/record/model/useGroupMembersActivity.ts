import { useState, useCallback } from "react";
import { groupApi, type GroupMember } from "@/entities/group";

export const useGroupMembersActivity = () => {
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);

  const fetchGroupMembers = useCallback(async (groupId: number) => {
    const response = await groupApi.getGroupActivity(groupId);

    if (response.data) {
      setGroupMembers(response.data.members);
    }
  }, []);

  const incrementStudyingMembers = useCallback(() => {
    setGroupMembers(prev =>
      prev.map(member =>
        member.isStudying ? { ...member, studyTime: member.studyTime + 1 } : member
      )
    );
  }, []);

  return {
    fetchGroupMembers,
    groupMembers,
    incrementStudyingMembers,
  };
};
