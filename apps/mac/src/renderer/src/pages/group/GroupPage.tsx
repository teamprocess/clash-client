import * as S from "./GroupPage.style";
import { useMemo, useState } from "react";
import { type Group as GroupEntity, useMyGroupsQuery } from "@/entities/group";
import { GroupDeleteModal, GroupEditModal, GroupSideTab, useGroup } from "@/features/group";
import { shiftRecordDate, useTodayRecordDate } from "@/features/record";
import { GroupActivity } from "@/widgets/group-activity";

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
        <GroupActivity
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
          onResetToToday={() => {
            setSelectedDate(undefined);
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
