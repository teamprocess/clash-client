import { useRef, useState } from "react";
import * as S from "./GroupSideTab.style";
import { type Group as GroupEntity, GROUP_CATEGORY_LABELS } from "@/entities/group";
import { useGetMyProfile } from "@/entities/user";
import { Popover } from "@/shared/ui";

interface GroupSideTabProps {
  groups: GroupEntity[];
  currentGroupId: number | null;
  onSelectGroup: (groupId: number) => void;
  onOpenFormModal: () => void;
  onEditGroup: (groupId: number) => void;
  onDeleteGroup: (groupId: number) => void;
  onQuitGroup: (groupId: number) => void;
}

export const GroupSideTab = ({
  groups,
  currentGroupId,
  onSelectGroup,
  onOpenFormModal,
  onEditGroup,
  onDeleteGroup,
  onQuitGroup,
}: GroupSideTabProps) => {
  const { data: myProfile } = useGetMyProfile();
  const myUserId = myProfile?.id ?? null;
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenuGroupId, setOpenMenuGroupId] = useState<number | null>(null);

  const handleMoreClick = (groupId: number) => {
    setOpenMenuGroupId(previousGroupId => (previousGroupId === groupId ? null : groupId));
  };

  const handleCloseMenu = () => {
    setOpenMenuGroupId(null);
  };

  return (
    <S.GroupSideTabContainer>
      <S.Title>그룹 목록</S.Title>
      <S.GroupList>
        {groups.map(group => {
          const isSelected = group.id === currentGroupId;
          const isOwner = myUserId === group.owner.id;
          const isMenuOpen = openMenuGroupId === group.id;

          return (
            <S.GroupListItem key={group.id} $isSelected={isSelected}>
              <S.GroupSelectButton type="button" onClick={() => onSelectGroup(group.id)}>
                <S.GroupListLeft>
                  <S.SelectionDot $isSelected={isSelected} />
                  <S.GroupListName>{group.name}</S.GroupListName>
                </S.GroupListLeft>
              </S.GroupSelectButton>
              <S.GroupListRight>
                <S.GroupCategory>{GROUP_CATEGORY_LABELS[group.category]}</S.GroupCategory>
                <S.MoreIconWrapper ref={isMenuOpen ? menuRef : null}>
                  <S.IconButton
                    type="button"
                    aria-label="그룹 메뉴 열기"
                    onClick={event => {
                      event.stopPropagation();
                      handleMoreClick(group.id);
                    }}
                  >
                    <S.MoreIcon />
                  </S.IconButton>
                  <Popover
                    isOpen={isMenuOpen}
                    onClose={handleCloseMenu}
                    anchorRef={menuRef}
                    minWidth="max-content"
                  >
                    <S.MenuList>
                      {isOwner ? (
                        <>
                          <S.MenuItem
                            type="button"
                            onClick={() => {
                              handleCloseMenu();
                              onEditGroup(group.id);
                            }}
                          >
                            그룹 수정
                          </S.MenuItem>
                          <S.MenuItem
                            type="button"
                            onClick={() => {
                              handleCloseMenu();
                              onDeleteGroup(group.id);
                            }}
                          >
                            그룹 삭제
                          </S.MenuItem>
                        </>
                      ) : (
                        <S.MenuItem
                          type="button"
                          onClick={() => {
                            handleCloseMenu();
                            onQuitGroup(group.id);
                          }}
                        >
                          그룹 탈퇴
                        </S.MenuItem>
                      )}
                    </S.MenuList>
                  </Popover>
                </S.MoreIconWrapper>
              </S.GroupListRight>
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
