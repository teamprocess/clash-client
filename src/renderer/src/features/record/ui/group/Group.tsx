import * as S from "./Group.style";
import * as CommonS from "../Record.style";

const MemberMockData = [
  {
    id: 1,
    name: "조상철",
    isActive: true,
    studyTime: 6000000,
  },
  {
    id: 2,
    name: "조상철",
    isActive: false,
    studyTime: 5000000,
  },
  {
    id: 3,
    name: "조상철",
    isActive: true,
    studyTime: 4000000,
  },
  {
    id: 4,
    name: "조상철",
    isActive: true,
    studyTime: 3500000,
  },
  {
    id: 5,
    name: "조상철",
    isActive: false,
    studyTime: 3000000,
  },
  {
    id: 6,
    name: "조상철",
    isActive: true,
    studyTime: 2800000,
  },
  {
    id: 7,
    name: "조상철",
    isActive: false,
    studyTime: 2700000,
  },
  {
    id: 8,
    name: "조상철",
    isActive: true,
    studyTime: 1000000,
  },
  {
    id: 15,
    name: "조상철",
    isActive: false,
    studyTime: 3000000,
  },
  {
    id: 16,
    name: "조상철",
    isActive: true,
    studyTime: 2800000,
  },
  {
    id: 17,
    name: "조상철",
    isActive: false,
    studyTime: 2700000,
  },
  {
    id: 18,
    name: "조상철",
    isActive: true,
    studyTime: 1000000,
  },
];

export const Group = () => {
  return (
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
            <CommonS.MoreIcon />
          </S.GroupNameBox>
        </S.GroupHeader>
        <S.MemberContent>
          {MemberMockData.map(member => (
            <S.MemberBox key={member.id} $isActive={member.isActive}>
              <S.FireIon />
              <S.MemberTextBox>
                <S.MemberName>{member.name}</S.MemberName>
                <S.MemberStudyTime>{member.studyTime}</S.MemberStudyTime>
              </S.MemberTextBox>
            </S.MemberBox>
          ))}
          <S.PlusIcon />
        </S.MemberContent>
      </S.GroupWrapper>
    </S.GroupContainer>
  );
};
