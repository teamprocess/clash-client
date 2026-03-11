import * as S from "./Group.style";
import { useEffect } from "react";
import { type Group as GroupEntity } from "@/entities/group";
import { useGetMyProfile } from "@/entities/user";
import { formatTime } from "@/shared/lib";
import { useGroupMembersActivity } from "../../model/useGroupMembersActivity";
import { useLiveRecordStudyTime } from "../../model/useLiveRecordStudyTime";
import { Timer } from "@/features/record/ui/timer/Timer";

interface GroupProps {
  currentGroup: GroupEntity | null;
  selectedDate: string;
  onPreviousDate: () => void;
  onNextDate: () => void;
}

export const Group = ({ currentGroup, selectedDate, onPreviousDate, onNextDate }: GroupProps) => {
  const { data: myProfile } = useGetMyProfile();
  const myUserId = myProfile?.id ?? null;
  const { totalStudyTime, isStudying } = useLiveRecordStudyTime(selectedDate);

  const { groupMembers, activeStudyingCount, incrementStudyingMembers } = useGroupMembersActivity(
    currentGroup?.id ?? null,
    myUserId,
    selectedDate
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      incrementStudyingMembers();
    }, 1000);

    return () => window.clearInterval(interval);
  }, [incrementStudyingMembers]);

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
            <S.GroupContent>
              <S.HeaderTimer>
                <S.HeaderTimerSection>
                  <Timer
                    date={selectedDate}
                    onPreviousDate={onPreviousDate}
                    onNextDate={onNextDate}
                    canGoNextDate
                    stopButtonPosition="RIGHT"
                  />
                </S.HeaderTimerSection>
                <S.MyStudySummary $isActive={isStudying}>
                  <S.MyStudyFireIcon />
                  <S.MyStudyTime $isActive={isStudying}>{formatTime(totalStudyTime)}</S.MyStudyTime>
                </S.MyStudySummary>
              </S.HeaderTimer>
              <S.GroupBodySection>
                <S.GroupInfoRow>
                  <S.GroupTitle>{currentGroup.name}</S.GroupTitle>
                  <S.GroupStats>
                    <S.ActiveStudyingText>
                      <S.ActiveStudyingCount>{activeStudyingCount}명</S.ActiveStudyingCount>
                      &nbsp;활동 중
                    </S.ActiveStudyingText>
                    <S.MemberCapacityText>
                      <S.CurrentMemberCount>{currentGroup.currentMemberCount}</S.CurrentMemberCount>
                      &nbsp;/ {currentGroup.maxMembers}
                    </S.MemberCapacityText>
                  </S.GroupStats>
                </S.GroupInfoRow>
                <S.MemberActivitySection>
                  <S.MemberGrid>
                    {groupMembers.map(member => (
                      <S.MemberBox key={member.id} $isActive={member.isStudying}>
                        <S.FireIcon />
                        <S.MemberInfoBox>
                          <S.MemberName>{member.name}</S.MemberName>
                          <S.MemberStudyTime>{formatTime(member.studyTime)}</S.MemberStudyTime>
                        </S.MemberInfoBox>
                      </S.MemberBox>
                    ))}
                  </S.MemberGrid>
                </S.MemberActivitySection>
              </S.GroupBodySection>
            </S.GroupContent>
          )}
        </S.GroupWrapper>
      </S.GroupContainer>
    </>
  );
};
