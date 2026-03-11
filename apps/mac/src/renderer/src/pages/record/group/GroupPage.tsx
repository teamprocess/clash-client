import * as S from "./GroupPage.style";
import { Group } from "@/features/record/ui/group/Group";
import { GroupSideTab } from "@/features/record/ui/group-side-tab/GroupSideTab";
import { useMemo, useState } from "react";
import { type Group as GroupEntity, useMyGroupsQuery } from "@/entities/group";
import { useGroup } from "@/features/record/model/useGroup";
import { GroupDeleteModal } from "@/features/record/ui/group/modal/GroupDeleteModal";
import { GroupEditModal } from "@/features/record/ui/group/modal/GroupEditModal";
import { GroupFormModal } from "@/features/record/ui/group/modal/GroupFormModal";
import { getTodayRecordDate, shiftRecordDate } from "@/features/record/model/recordDate";

export const GroupPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => getTodayRecordDate());
  const { data: myGroupsResponse } = useMyGroupsQuery(1, 20);
  const groups = useMemo<GroupEntity[]>(
    () => myGroupsResponse?.data?.groups ?? [],
    [myGroupsResponse]
  );
  const currentGroup = useMemo(
    () => groups.find(group => group.id === selectedGroupId) ?? groups[0] ?? null,
    [groups, selectedGroupId]
  );

  const groupControls = useGroup(currentGroup?.id ?? null);

  return (
    <S.GroupPageContainer>
      <S.Content>
        <Group
          currentGroup={currentGroup}
          selectedDate={selectedDate}
          onPreviousDate={() => {
            setSelectedDate(currentDate => shiftRecordDate(currentDate, -1));
          }}
          onNextDate={() => {
            setSelectedDate(currentDate => shiftRecordDate(currentDate, 1));
          }}
        />
        <GroupSideTab
          groups={groups}
          currentGroupId={currentGroup?.id ?? null}
          onSelectGroup={setSelectedGroupId}
          onOpenFormModal={groupControls.handleOpenFormModal}
          onEditGroup={groupControls.handleEditGroupRequest}
          onDeleteGroup={groupId => groupControls.handleDeleteGroupRequest("delete", groupId)}
          onQuitGroup={groupId => groupControls.handleDeleteGroupRequest("quit", groupId)}
        />
      </S.Content>
      <GroupFormModal {...groupControls.formModal} />
      <GroupEditModal {...groupControls.editModal} />
      <GroupDeleteModal {...groupControls.deleteModal} />
    </S.GroupPageContainer>
  );
};
