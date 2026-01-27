import * as S from "./Group.style";
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
  } = useGroup();
  return (
    <>
      <S.GroupContainer>
        <S.GroupWrapper>
          <S.GroupHeader>
            <S.MemberCountBox>
              <S.ActiveMemberCount>32</S.ActiveMemberCount>&nbsp;/ 40
            </S.MemberCountBox>
            <S.GroupNameBox>
              <S.ReverseArrowIcon />
              <S.GroupName>프로세스 그룹</S.GroupName>
              <S.ArrowIcon />
              <S.MoreIconWrapper ref={isMenuOpen ? menuRef : null}>
                <S.IconButton onClick={() => handleMoreClick()}>
                  <S.MoreIcon />
                </S.IconButton>
                {isMenuOpen && (
                  <S.DropdownMenu>
                    <S.MenuItem onClick={handleEditGroupRequest}>그룹 수정</S.MenuItem>
                    <S.MenuItem onClick={handleDeleteGroupRequest}>그룹 삭제</S.MenuItem>
                  </S.DropdownMenu>
                )}
              </S.MoreIconWrapper>
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
