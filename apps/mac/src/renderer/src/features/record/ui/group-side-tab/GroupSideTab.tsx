import * as S from "./GroupSideTab.style";
import { type Group as GroupEntity, GROUP_CATEGORY_LABELS } from "@/entities/group";

interface GroupSideTabProps {
  groups: GroupEntity[];
  currentGroupId: number | null;
  onSelectGroup: (groupId: number) => void;
  onOpenFormModal: () => void;
}

export const GroupSideTab = ({
  groups,
  currentGroupId,
  onSelectGroup,
  onOpenFormModal,
}: GroupSideTabProps) => {
  return (
    <S.GroupSideTabContainer>
      <S.Title>그룹 목록</S.Title>
      <S.GroupList>
        {groups.map(group => {
          const isSelected = group.id === currentGroupId;

          return (
            <S.GroupListItem
              key={group.id}
              type="button"
              $isSelected={isSelected}
              onClick={() => onSelectGroup(group.id)}
            >
              <S.GroupListLeft>
                <S.SelectionDot $isSelected={isSelected} />
                <S.GroupListName>{group.name}</S.GroupListName>
              </S.GroupListLeft>
              <S.GroupCategory>{GROUP_CATEGORY_LABELS[group.category]}</S.GroupCategory>
            </S.GroupListItem>
          );
        })}
      </S.GroupList>
      <S.PlusIconWrapper type="button" onClick={onOpenFormModal}>
        <S.PlusIcon />
      </S.PlusIconWrapper>
    </S.GroupSideTabContainer>
  );
};
