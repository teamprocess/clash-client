import * as S from "./Group.style";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { type Group as GroupEntity, groupApi } from "@/entities/group";
import { authApi } from "@/entities/user";
import { useGroup } from "@/features/record/model/useGroup";
import { formatTime } from "@/shared/lib";
import { GroupDeleteModal } from "./modal/GroupDeleteModal";
import { GroupEditModal } from "./modal/GroupEditModal";
import { GroupFormModal } from "./modal/GroupFormModal";

const MemberMockData = [
  {
    id: 1,
    name: "조상철",
    isActive: true,
    studyTime: 60000,
  },
  {
    id: 2,
    name: "조상철",
    isActive: false,
    studyTime: 50000,
  },
  {
    id: 3,
    name: "조상철",
    isActive: true,
    studyTime: 40000,
  },
  {
    id: 4,
    name: "조상철",
    isActive: true,
    studyTime: 35000,
  },
  {
    id: 5,
    name: "조상철",
    isActive: false,
    studyTime: 30000,
  },
  {
    id: 6,
    name: "조상철",
    isActive: true,
    studyTime: 28000,
  },
  {
    id: 7,
    name: "조상철",
    isActive: false,
    studyTime: 27000,
  },
  {
    id: 8,
    name: "조상철",
    isActive: true,
    studyTime: 10000,
  },
  {
    id: 15,
    name: "조상철",
    isActive: false,
    studyTime: 30000,
  },
  {
    id: 16,
    name: "조상철",
    isActive: true,
    studyTime: 28000,
  },
  {
    id: 17,
    name: "조상철",
    isActive: false,
    studyTime: 27000,
  },
  {
    id: 18,
    name: "조상철",
    isActive: true,
    studyTime: 10000,
  },
];

export const Group = () => {
  const [groups, setGroups] = useState<GroupEntity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [myUserId, setMyUserId] = useState<number | null>(null);
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

  const currentGroup = useMemo(() => groups[currentIndex], [groups, currentIndex]);

  useEffect(() => {
    const fetchMyGroups = async () => {
      try {
        const result = await groupApi.getMyGroups(1, 20);

        if (result.success && result.data) {
          setGroups(result.data.groups);
          setCurrentIndex(0);
        } else {
          console.error("그룹 목록 조회 실패:", result.message);
        }
      } catch (error: unknown) {
        console.error("그룹 목록 조회 실패:", error);

        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.error?.message ||
            error.response?.data?.message ||
            "그룹 목록 조회 중 오류가 발생했습니다.";
          console.error(errorMessage);
        }
      }
    };

    const fetchMyProfile = async () => {
      try {
        const result = await authApi.getMyProfile();

        if (result.success && result.data) {
          setMyUserId(result.data.id);
        } else {
          console.error("내 정보 조회 실패:", result.message);
        }
      } catch (error: unknown) {
        console.error("내 정보 조회 실패:", error);

        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.error?.message ||
            error.response?.data?.message ||
            "내 정보 조회 중 오류가 발생했습니다.";
          console.error(errorMessage);
        }
      }
    };

    void fetchMyGroups();
    void fetchMyProfile();
  }, []);

  useEffect(() => {
    setCurrentGroupId(currentGroup ? currentGroup.id : null);
  }, [currentGroup, setCurrentGroupId]);

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
            {MemberMockData.map(member => (
              <S.MemberBox key={member.id} $isActive={member.isActive}>
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
