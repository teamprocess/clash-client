import * as S from "./Group.style";
import { useEffect, useMemo, useState } from "react";
import { type Group as GroupEntity, useMyGroupsQuery } from "@/entities/group";
import { useGetMyProfile } from "@/entities/user";
import { useGroup } from "../../model/useGroup";
import { formatTime } from "@/shared/lib";
import { Popover } from "@/shared/ui";
import { GroupDeleteModal } from "./modal/GroupDeleteModal";
import { GroupEditModal } from "./modal/GroupEditModal";
import { GroupFormModal } from "./modal/GroupFormModal";
import { useGroupMembersActivity } from "../../model/useGroupMembersActivity";

export const Group = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: myGroupsResponse } = useMyGroupsQuery(1, 20);
  const { data: myProfile } = useGetMyProfile();
  const groupList = myGroupsResponse?.data?.groups;
  const groups = useMemo<GroupEntity[]>(() => groupList ?? [], [groupList]);
  const myUserId = myProfile?.id ?? null;

  const {
    menuRef,
    isMenuOpen,
    handleMoreClick,
    handleCloseMenu,
    handleOpenFormModal,
    handleEditGroupRequest,
    handleDeleteGroupRequest,
    formModal,
    editModal,
    deleteModal,
    setCurrentGroupId,
  } = useGroup();

  const safeCurrentIndex = useMemo(() => {
    if (groups.length === 0) {
      return 0;
    }

    return Math.min(currentIndex, groups.length - 1);
  }, [currentIndex, groups.length]);
  const currentGroup = useMemo(() => groups[safeCurrentIndex], [groups, safeCurrentIndex]);
  const { groupMembers, incrementStudyingMembers } = useGroupMembersActivity(
    currentGroup?.id ?? null,
    myUserId
  );

  useEffect(() => {
    setCurrentGroupId(currentGroup ? currentGroup.id : null);
  }, [currentGroup, setCurrentGroupId]);

  useEffect(() => {
    const interval = setInterval(() => {
      incrementStudyingMembers();
    }, 1000);

    return () => clearInterval(interval);
  }, [incrementStudyingMembers]);

  const handlePrevGroup = () => {
    if (groups.length <= 1) {
      return;
    }
    setCurrentIndex(prev => (prev - 1 + groups.length) % groups.length);
  };

  const handleNextGroup = () => {
    if (groups.length <= 1) {
      return;
    }
    setCurrentIndex(prev => (prev + 1) % groups.length);
  };

  const isOwner = !!currentGroup && myUserId === currentGroup.owner.id;

  return (
    <>
      <S.GroupContainer>
        <S.GroupWrapper>
          {!currentGroup ? (
            <S.EmptyGroupState>
              <S.EmptyGroupIcon />
              <S.EmptyGroupTextBox>
                <S.EmptyGroupTitle>현재 그룹이 존재하지 않습니다.</S.EmptyGroupTitle>
                <S.EmptyGroupDescription>
                  그룹을 추가하여 함께 경쟁하며 성장해보세요!
                </S.EmptyGroupDescription>
              </S.EmptyGroupTextBox>
            </S.EmptyGroupState>
          ) : (
            <>
              <S.GroupHeader>
                <S.MemberCountBox>
                  <S.ActiveMemberCount>{currentGroup.currentMemberCount}</S.ActiveMemberCount>
                  &nbsp;/ {currentGroup.maxMembers}
                </S.MemberCountBox>
                <S.GroupNameBox>
                  {groups.length > 1 && (
                    <S.IconButton type="button" onClick={handlePrevGroup}>
                      <S.ReverseArrowIcon />
                    </S.IconButton>
                  )}
                  <S.GroupName>{currentGroup.name}</S.GroupName>
                  {groups.length > 1 && (
                    <S.IconButton type="button" onClick={handleNextGroup}>
                      <S.ArrowIcon />
                    </S.IconButton>
                  )}
                  <S.MoreIconWrapper ref={isMenuOpen ? menuRef : null}>
                    <S.IconButton onClick={() => handleMoreClick()}>
                      <S.MoreIcon />
                    </S.IconButton>
                    <Popover isOpen={isMenuOpen} onClose={handleCloseMenu} anchorRef={menuRef}>
                      <S.MenuList>
                        {isOwner ? (
                          <>
                            <S.MenuItem onClick={handleEditGroupRequest}>그룹 수정</S.MenuItem>
                            <S.MenuItem onClick={() => handleDeleteGroupRequest("delete")}>
                              그룹 삭제
                            </S.MenuItem>
                          </>
                        ) : (
                          <S.MenuItem onClick={() => handleDeleteGroupRequest("quit")}>
                            그룹 탈퇴
                          </S.MenuItem>
                        )}
                      </S.MenuList>
                    </Popover>
                  </S.MoreIconWrapper>
                </S.GroupNameBox>
              </S.GroupHeader>
              <S.MemberContent>
                {groupMembers.map(member => (
                  <S.MemberBox key={member.id} $isActive={member.isStudying}>
                    <S.FireIon />
                    <S.MemberTextBox>
                      <S.MemberName>{member.name}</S.MemberName>
                      <S.MemberStudyTime>{formatTime(member.studyTime)}</S.MemberStudyTime>
                    </S.MemberTextBox>
                  </S.MemberBox>
                ))}
              </S.MemberContent>
            </>
          )}
          <S.PlusIconWrapper onClick={handleOpenFormModal}>
            <S.PlusIcon />
          </S.PlusIconWrapper>
        </S.GroupWrapper>
      </S.GroupContainer>
      <GroupFormModal {...formModal} />
      <GroupEditModal {...editModal} />
      <GroupDeleteModal {...deleteModal} />
    </>
  );
};
