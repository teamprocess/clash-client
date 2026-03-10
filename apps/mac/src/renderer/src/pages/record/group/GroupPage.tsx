import * as S from "./GroupPage.style";
import { RecordHeader } from "@/features/record/ui/record-header/RecordHeader";
import { Group } from "@/features/record/ui/group/Group";
import { GroupSideTab } from "@/features/record/ui/group-side-tab/GroupSideTab";
import { useMemo, useState } from "react";
import { type Group as GroupEntity, useMyGroupsQuery } from "@/entities/group";
import { useGroup } from "@/features/record/model/useGroup";
import { GroupDeleteModal } from "@/features/record/ui/group/modal/GroupDeleteModal";
import { GroupEditModal } from "@/features/record/ui/group/modal/GroupEditModal";
import { GroupFormModal } from "@/features/record/ui/group/modal/GroupFormModal";

export const GroupPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
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
      <RecordHeader active={"GROUP"} />
      <S.Content>
        <Group currentGroup={currentGroup} />
        <GroupSideTab
          groups={groups}
          currentGroupId={currentGroup?.id ?? null}
          onSelectGroup={setSelectedGroupId}
          onOpenFormModal={groupControls.handleOpenFormModal}
        />
      </S.Content>
      <GroupFormModal {...groupControls.formModal} />
      <GroupEditModal {...groupControls.editModal} />
      <GroupDeleteModal {...groupControls.deleteModal} />
    </S.GroupPageContainer>
  );
};
