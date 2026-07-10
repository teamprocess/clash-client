import * as S from "./GroupActivity.style";
import { type Group as GroupEntity } from "@/entities/group";
import { formatTime } from "@/shared/lib";
import { useGroupRealtimeActivity } from "../model/useGroupRealtimeActivity";
import { Timer } from "@/features/record";
import { Button } from "@/shared/ui";
import { getErrorMessage } from "@/shared/lib";

interface GroupProps {
  currentGroup: GroupEntity | null;
  selectedDate?: string;
  displayDate: string;
  onPreviousDate: () => void;
  onNextDate: () => void;
  onResetToToday: () => void;
  canGoNextDate: boolean;
}

export const GroupActivity = ({
  currentGroup,
  selectedDate,
  displayDate,
  onPreviousDate,
  onNextDate,
  onResetToToday,
  canGoNextDate,
}: GroupProps) => {
  const {
    totalStudyTime,
    isLoading,
    isStudying,
    groupMembers,
    activeStudyingCount,
    activityQuery,
  } = useGroupRealtimeActivity(currentGroup?.id ?? null, selectedDate);
  const displayStudyTime = isLoading ? "--:--:--" : formatTime(totalStudyTime);

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
                    date={displayDate}
                    selectedDate={selectedDate}
                    onPreviousDate={onPreviousDate}
                    onNextDate={onNextDate}
                    onResetToToday={onResetToToday}
                    canGoNextDate={canGoNextDate}
                    stopButtonPosition="RIGHT"
                    nonTodayStopBehavior="hide"
                  />
                </S.HeaderTimerSection>
                <S.MyStudySummary $isActive={isStudying}>
                  <S.MyStudyFireIcon />
                  <S.MyStudyTime $isActive={isStudying} $loading={isLoading}>
                    {displayStudyTime}
                  </S.MyStudyTime>
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
                <S.MemberActivitySection aria-busy={activityQuery.isFetching || undefined}>
                  {activityQuery.isError ? (
                    <S.ActivityState kind="error">
                      <S.ActivityStateTitle>그룹 활동을 불러오지 못했어요.</S.ActivityStateTitle>
                      <S.ActivityStateDescription>
                        {getErrorMessage(activityQuery.error, "잠시 후 다시 시도해 주세요.")}
                      </S.ActivityStateDescription>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => void activityQuery.refetch()}
                      >
                        다시 시도
                      </Button>
                    </S.ActivityState>
                  ) : activityQuery.isPending ? (
                    <S.ActivityState kind="loading">
                      <S.ActivityStateTitle>그룹 활동을 불러오는 중이에요.</S.ActivityStateTitle>
                    </S.ActivityState>
                  ) : groupMembers.length === 0 ? (
                    <S.ActivityState kind="empty">
                      <S.ActivityStateTitle>표시할 그룹 활동이 아직 없어요.</S.ActivityStateTitle>
                      <S.ActivityStateDescription>
                        멤버가 학습을 시작하면 이곳에 활동이 표시됩니다.
                      </S.ActivityStateDescription>
                    </S.ActivityState>
                  ) : (
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
                  )}
                </S.MemberActivitySection>
              </S.GroupBodySection>
            </S.GroupContent>
          )}
        </S.GroupWrapper>
      </S.GroupContainer>
    </>
  );
};
