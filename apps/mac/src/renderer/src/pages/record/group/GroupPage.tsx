import * as S from "./GroupPage.style";
import { Group } from "@/features/record/ui/group/Group";
import { GroupSideTab } from "@/features/record/ui/group-side-tab/GroupSideTab";
import { useMemo, useState } from "react";
import { type Group as GroupEntity, useMyGroupsQuery } from "@/entities/group";
import { useGroup } from "@/features/record/model/useGroup";
import { GroupDeleteModal } from "@/features/record/ui/group/modal/GroupDeleteModal";
import { GroupEditModal } from "@/features/record/ui/group/modal/GroupEditModal";
import { shiftRecordDate } from "@/features/record/model/recordDate";
import { useTodayRecordDate } from "@/features/record/model/useTodayRecordDate";

export const GroupPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const todayRecordDate = useTodayRecordDate();
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const normalizedSelectedDate = selectedDate === todayRecordDate ? undefined : selectedDate;
  const displayDate = normalizedSelectedDate ?? todayRecordDate;
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
          selectedDate={normalizedSelectedDate}
          displayDate={displayDate}
          onPreviousDate={() => {
            setSelectedDate(currentDate => {
              const normalizedCurrentDate =
                currentDate === todayRecordDate ? undefined : currentDate;
              return shiftRecordDate(normalizedCurrentDate ?? todayRecordDate, -1);
            });
          }}
          onNextDate={() => {
            setSelectedDate(currentDate => {
              const normalizedCurrentDate =
                currentDate === todayRecordDate ? undefined : currentDate;
              return shiftRecordDate(normalizedCurrentDate ?? todayRecordDate, 1);
            });
          }}
          canGoNextDate
        />
        <GroupSideTab
          groups={groups}
          currentGroupId={currentGroup?.id ?? null}
          onSelectGroup={setSelectedGroupId}
          onOpenFormPanel={groupControls.handleOpenFormPanel}
          formPanel={groupControls.formPanel}
          onEditGroup={groupControls.handleEditGroupRequest}
          onDeleteGroup={groupId => groupControls.handleDeleteGroupRequest("delete", groupId)}
          onQuitGroup={groupId => groupControls.handleDeleteGroupRequest("quit", groupId)}
        />
      </S.Content>
      <GroupEditModal {...groupControls.editModal} />
      <GroupDeleteModal {...groupControls.deleteModal} />
    </S.GroupPageContainer>
  );
};
