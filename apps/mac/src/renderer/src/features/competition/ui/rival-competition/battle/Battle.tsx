import { useState } from "react";
import * as S from "./Battle.style";
import { Button, Dialog, Select, SlideSelector } from "@/shared/ui";
import { AnalyzeCategory, MATCHVALUE } from "@/entities/competition";
import { useBattle } from "@/features/competition/model/useBattle";
import { useGetMyProfile } from "@/entities/user";
import { defaultProfileImageLight, resolveProfileDecorations } from "@/shared/lib";

export const Battle = () => {
  const battle = useBattle();

  const [activeTab, setActiveTab] = useState<"battle-create" | "battle-request-list">(
    "battle-create"
  );

  const { data: myProfile } = useGetMyProfile();
  const myProfileImg = myProfile?.profileImage;
  const { badgeImage: myBadgeImage } = resolveProfileDecorations(myProfile?.equippedItems);

  const battles = battle.battleData?.battles ?? [];
  const battleApplyItems = battle.battleApplyList?.data?.battles ?? [];

  const hasBattleApplyList = battleApplyItems.length > 0;

  return (
    <>
      <S.ContentBox>
        <S.Content id="content-3">
          <S.BattleWrapper>
            <S.TitleBox>
              <S.BattleTextBox>
                <S.Title>배틀</S.Title>
                <S.SubText>배틀을 생성해 라이벌과 더 치열하게 경쟁할 수 있습니다.</S.SubText>
              </S.BattleTextBox>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  setActiveTab("battle-create");
                  battle.openModal();
                }}
              >
                배틀 신청
              </Button>
            </S.TitleBox>

            <S.HorizontalLine />

            {battles.length > 0 ? (
              <>
                <S.BattleListContainer>
                  {battles.map(battleItem => {
                    const judge = battle.judgeUpperHand(battleItem.result);

                    const cannotOpen =
                      battleItem.result === MATCHVALUE.PENDING;

                    return (
                      <S.BattleProfileBox
                        key={battleItem.id}
                        $disabled={cannotOpen}
                        onClick={() => {
                          if (!cannotOpen) {
                            battle.selectBattleTarget(battleItem.id);
                          }
                        }}
                      >
                        <S.ProfileContent>
                          <S.NameBox>
                            <S.UpperHandJudge $type={judge}>{judge}</S.UpperHandJudge>
                            <S.BattleName>vs {battleItem.enemy.name}</S.BattleName>

                            <S.DateBox>
                              <S.DateIcon />
                              <S.DateText>{battleItem.expireDate}</S.DateText>
                            </S.DateBox>
                          </S.NameBox>
                        </S.ProfileContent>

                        <S.DetailBox>
                          <S.DetailButton $disabled={cannotOpen}>
                            {battleItem.result === MATCHVALUE.WON ||
                            battleItem.result === MATCHVALUE.LOST ||
                            battleItem.result === MATCHVALUE.DRAWN
                              ? "결과 보기"
                              : "상세 내용 보기"}
                          </S.DetailButton>
                          <S.BackArrowIcon />
                        </S.DetailBox>
                      </S.BattleProfileBox>
                    );
                  })}
                </S.BattleListContainer>

                {battle.isBattleSelected ? (
                  <S.DetailWrapper>
                    <S.UpperHandContainer>
                      <S.UpperHandProfile>
                        <S.BattleDetailProfileBox>
                          <S.BattleDetailAvatar
                            profileImage={battle.battleDetailData?.enemy.profileImage}
                            fallbackSrc={defaultProfileImageLight}
                            alt={battle.battleDetailData?.enemy.name || "상대 프로필"}
                          />
                        </S.BattleDetailProfileBox>
                        <S.UpperHandName>{battle.battleDetailData?.enemy.name}</S.UpperHandName>
                      </S.UpperHandProfile>

                      <S.TransitionBox>
                        <S.UpperHandTransition>
                          <S.UpperHandBar $width={battle.rivalPercent ?? 0} $isRival>
                            <S.PercentText $isRival>
                              {Math.round(battle.rivalPercent ?? 0)}%
                            </S.PercentText>
                          </S.UpperHandBar>

                          <S.UpperHandBar $width={battle.myPercent ?? 0} $isRival={false}>
                            <S.PercentText $isRival={false}>
                              {Math.round(battle.myPercent ?? 0)}%
                            </S.PercentText>
                          </S.UpperHandBar>
                        </S.UpperHandTransition>

                        <S.WarPeriodText>
                          {battle.remainDays != null && battle.remainDays > 0
                            ? `종료 ${battle.battleDetailData?.expireDate} · ${battle.remainDays}일 남음`
                            : `종료된 배틀입니다!`}
                        </S.WarPeriodText>
                      </S.TransitionBox>

                      <S.UpperHandProfile>
                        <S.BattleDetailProfileBox>
                          <S.BattleDetailAvatar
                            profileImage={myProfileImg}
                            badgeImage={myBadgeImage}
                            fallbackSrc={defaultProfileImageLight}
                            alt="내 프로필"
                          />
                        </S.BattleDetailProfileBox>
                        <S.UpperHandName>나</S.UpperHandName>
                      </S.UpperHandProfile>
                    </S.UpperHandContainer>

                    <S.VerticalLine />

                    <S.DetailAnalyzeContainer>
                      <S.TitleBox>
                        <S.AnalyzeText>세부 분석</S.AnalyzeText>
                        <S.DropDownBox>
                          <Select<AnalyzeCategory>
                            value={battle.category}
                            options={battle.ANALYZE_CATEGORY_OPTIONS}
                            onChange={battle.setCategory}
                          />
                        </S.DropDownBox>
                      </S.TitleBox>

                      <S.AnalyzeBox>
                        <S.AnalyzeRow>
                          <S.AnalyzeContent $width="4rem">
                            <S.AnalyzeName>{battle.battleDetailData?.enemy.name}</S.AnalyzeName>
                            <S.AnalyzeName>나</S.AnalyzeName>
                          </S.AnalyzeContent>

                          <S.HorizontalLine />

                          <S.AnalyzeContent $width="100%">
                            <S.DataBox>
                              <div>
                                {battle.rivalAnalyzePoint}{" "}
                                {battle.detailTextTranslate(battle.category)}
                              </div>
                              <S.AnalyzeBar $width={battle.rivalAnalyzeRate ?? 0} $isRival>
                                <S.AnalyzeLabel>
                                  {battle.isRivalHigher && battle.diff > 0 && (
                                    <S.CompareDiff>+{battle.diff}%</S.CompareDiff>
                                  )}
                                </S.AnalyzeLabel>
                              </S.AnalyzeBar>
                            </S.DataBox>

                            <S.DataBox>
                              <div>
                                {battle.myAnalyzePoint}{" "}
                                {battle.detailTextTranslate(battle.category)}
                              </div>
                              <S.AnalyzeBar $width={battle.myAnalyzeRate ?? 0} $isRival={false}>
                                <S.AnalyzeLabel>
                                  {!battle.isRivalHigher && battle.diff > 0 && (
                                    <S.CompareDiff>+{battle.diff}%</S.CompareDiff>
                                  )}
                                </S.AnalyzeLabel>
                              </S.AnalyzeBar>
                            </S.DataBox>
                          </S.AnalyzeContent>
                        </S.AnalyzeRow>
                      </S.AnalyzeBox>
                    </S.DetailAnalyzeContainer>
                  </S.DetailWrapper>
                ) : (
                  <S.DetailWrapper>
                    <S.DefaultBattleBox>
                      <S.FireIcon />
                      <S.DefaultBattleText>
                        위 배틀을 선택하여 배틀의 상세 내용을 확인해보세요!
                      </S.DefaultBattleText>
                    </S.DefaultBattleBox>
                  </S.DetailWrapper>
                )}
              </>
            ) : (
              <S.DetailWrapper>
                <S.DefaultBattleBox>
                  <S.DefaultBattleText>
                    현재 배틀에 관한 데이터가 없습니다. 배틀을 생성해보세요!
                  </S.DefaultBattleText>
                </S.DefaultBattleBox>
              </S.DetailWrapper>
            )}
          </S.BattleWrapper>
        </S.Content>
      </S.ContentBox>

      {battle.isModalOpen && (
        <Dialog width={43} height={32} isOpen={battle.isModalOpen} onClose={battle.closeModal}>
          <S.ModalContainer>
            <S.ModalHeader>
              <SlideSelector
                value={activeTab}
                options={[
                  { key: "battle-create", label: "배틀 신청하기" },
                  { key: "battle-request-list", label: "신청 목록" },
                ]}
                onChange={setActiveTab}
              />

              {battle.error && <S.ErrorText>{battle.error}</S.ErrorText>}
            </S.ModalHeader>

            {activeTab === "battle-create" ? (
              <S.ModalBody>
                <S.UserChoiceContainer>
                  {battle.battleList?.rivals.map(user => {
                    const isSelected = battle.rivalSelectedId === user.id;

                    return (
                      <S.UserChoiceBox
                        key={user.id}
                        $isSelected={isSelected}
                        onClick={() => battle.handleUserSelect(user.id)}
                      >
                        <S.ProfileContent $height="3rem">
                          <S.ProfileIcon>
                            <S.ProfileChoiceAvatar
                              profileImage={user.profileImage}
                              fallbackSrc={defaultProfileImageLight}
                              alt={user.name}
                            />
                          </S.ProfileIcon>
                          <S.ProfileTagBox>
                            <S.ProfileName>{user.name}</S.ProfileName>
                          </S.ProfileTagBox>
                        </S.ProfileContent>

                        {isSelected ? <S.CheckedIcon /> : <S.UncheckedBox />}
                      </S.UserChoiceBox>
                    );
                  })}
                </S.UserChoiceContainer>

                <S.DateChoiceRow>
                  {battle.PERIOD_OPTIONS.map(day => (
                    <S.DateChoiceBox
                      key={day}
                      onClick={() => battle.handlePeriodSelect(day)}
                      $active={battle.selectedDay === day}
                    >
                      {day}일
                    </S.DateChoiceBox>
                  ))}
                </S.DateChoiceRow>

                <S.BottomBox>
                  <S.ButtonBox>
                    <Button
                      size="sm"
                      variant="primary"
                      disabled={!battle.canCreateBattle}
                      isLoading={battle.isSubmitting}
                      onClick={battle.createBattle}
                    >
                      {battle.isSubmitting ? "신청 중..." : "신청"}
                    </Button>
                  </S.ButtonBox>
                </S.BottomBox>
              </S.ModalBody>
            ) : (
              <S.BattleApplyListContainer $hasApply={hasBattleApplyList}>
                {hasBattleApplyList ? (
                  battleApplyItems.map(applyItem => (
                    <S.UserChoiceBox key={applyItem.id} $isSelected={false} $isRival>
                      <S.ProfileContent $height="3rem">
                        <S.ProfileIcon>
                          <S.ProfileChoiceAvatar
                            profileImage={applyItem.enemy.profileImage}
                            fallbackSrc={defaultProfileImageLight}
                            alt={applyItem.enemy.name}
                          />
                        </S.ProfileIcon>
                        <S.ProfileTagBox>
                          <S.ProfileName>{applyItem.enemy.name}</S.ProfileName>
                          <S.ProfileSubText>
                            {applyItem.startDate} ~ {applyItem.endDate}
                          </S.ProfileSubText>
                          <S.ProfileSubText>
                            {applyItem.isMine ? "내가 보낸 신청" : "상대가 보낸 신청"}
                          </S.ProfileSubText>
                        </S.ProfileTagBox>
                      </S.ProfileContent>

                      <Button
                        size="sm"
                        variant="primary"
                        disabled={!applyItem.isMine}
                        isLoading={battle.isCanceling}
                        onClick={() => battle.handleBattleApplyCancel(applyItem.id)}
                      >
                        {battle.isCanceling && applyItem.id === battle.cancelingId
                          ? "취소 중..."
                          : "취소"}
                      </Button>
                    </S.UserChoiceBox>
                  ))
                ) : (
                  <S.EmptyStateBox>
                    <S.EmptyTitle>라이벌 신청 내역이 없습니다.</S.EmptyTitle>
                    <S.EmptyDescription>
                      보낸 신청 또는 받은 신청이 생기면 여기서 확인할 수 있어요.
                    </S.EmptyDescription>
                  </S.EmptyStateBox>
                )}
              </S.BattleApplyListContainer>
            )}
          </S.ModalContainer>
        </Dialog>
      )}
    </>
  );
};
