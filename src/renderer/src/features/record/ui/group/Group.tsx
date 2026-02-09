import * as S from "./Group.style";
import { useEffect, useMemo, useState } from "react";
import { type Group as GroupEntity, useMyGroupsQuery } from "@/entities/group";
import { useGetMyProfile } from "@/entities/user";
import { useGroup } from "../../model/useGroup";
import { formatTime } from "@/shared/lib";
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
    currentGroup?.id ?? null
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
          <S.GroupHeader>
            <S.MemberCountBox>
              <S.ActiveMemberCount>
                {currentGroup ? currentGroup.currentMemberCount : 0}
              </S.ActiveMemberCount>
              &nbsp;/ {currentGroup ? currentGroup.maxMembers : 0}
            </S.MemberCountBox>
            <S.GroupNameBox>
              {groups.length > 1 && (
                <S.IconButton type="button" onClick={handlePrevGroup}>
                  <S.ReverseArrowIcon />
                </S.IconButton>
              )}
              <S.GroupName>{currentGroup ? currentGroup.name : "소속된 그룹 없음"}</S.GroupName>
              {groups.length > 1 && (
                <S.IconButton type="button" onClick={handleNextGroup}>
                  <S.ArrowIcon />
                </S.IconButton>
              )}
              {currentGroup && (
                <S.MoreIconWrapper ref={isMenuOpen ? menuRef : null}>
                  <S.IconButton onClick={() => handleMoreClick()}>
                    <S.MoreIcon />
                  </S.IconButton>
                  {isMenuOpen && (
                    <S.DropdownMenu>
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
                    </S.DropdownMenu>
                  )}
                </S.MoreIconWrapper>
              )}
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
            <S.PlusIconWrapper onClick={handleOpenFormModal}>
              <S.PlusIcon />
            </S.PlusIconWrapper>
          </S.MemberContent>
        </S.GroupWrapper>
      </S.GroupContainer>
      <GroupFormModal {...formModal} />
      <GroupEditModal {...editModal} />
      <GroupDeleteModal {...deleteModal} />
    </>
  );
};
