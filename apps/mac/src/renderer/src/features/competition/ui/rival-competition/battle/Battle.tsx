import { useState } from "react";
import * as S from "./Battle.style";
import { Button, DefaultProfileIcon, Dialog, Select, SlideSelector } from "@/shared/ui";
import type { AnalyzeCategory } from "@/entities/competition";
import { MATCH_VALUE } from "@/entities/competition";
import { useBattle } from "@/features/competition/model/useBattle";
import { useGetMyProfile } from "@/entities/user";
import { formatTime, getErrorMessage, resolveProfileDecorations } from "@/shared/lib";

export const Battle = () => {
  const battle = useBattle();

  const [activeTab, setActiveTab] = useState<"battle-create" | "battle-request-list">(
    "battle-create"
  );

  const { data: myProfile } = useGetMyProfile();
  const myProfileImg = myProfile?.profileImage;
  const { badgeImage: myBadgeImage } = resolveProfileDecorations(myProfile?.equippedItems);

  const battles = battle.battleData?.battles ?? [];
  const battleRivals = battle.battleList?.rivals ?? [];
  const battleApplyItems = battle.battleApplyList?.data?.battles ?? [];

  const hasBattleApplyList = battleApplyItems.length > 0;
  const analyzeUnitLabel = battle.detailTextTranslate(battle.category);

  const formatAnalyzePoint = (value: number) =>
    battle.category === "ACTIVE_TIME"
      ? formatTime(Math.max(0, Math.floor(value)))
      : [value, analyzeUnitLabel].join(" ");

  return (
    <>
      <S.ContentBox>
        <S.Content id="content-3">
          <S.BattleWrapper aria-busy={battle.queries.info.isFetching || undefined}>
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

            {battle.queries.info.isError && battle.battleData && (
              <S.QueryNotice role="alert">
                <span>새 배틀 정보를 불러오지 못해 이전 결과를 표시해요.</span>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => void battle.queries.info.refetch()}
                >
                  다시 시도
                </Button>
              </S.QueryNotice>
            )}

            {battle.queries.info.isPending ? (
              <S.DetailWrapper>
                <S.DefaultBattleBox role="status" aria-live="polite">
                  <S.DefaultBattleText>배틀 정보를 불러오는 중이에요.</S.DefaultBattleText>
                </S.DefaultBattleBox>
              </S.DetailWrapper>
            ) : battle.queries.info.isError && !battle.battleData ? (
              <S.DetailWrapper>
                <S.DefaultBattleBox role="alert">
                  <S.DefaultBattleText>
                    {getErrorMessage(battle.queries.info.error, "배틀 정보를 불러오지 못했어요.")}
                  </S.DefaultBattleText>
                  <Button
                    type="button"
                    size="sm"
                    variant="primary"
                    onClick={() => void battle.queries.info.refetch()}
                  >
                    다시 시도
                  </Button>
                </S.DefaultBattleBox>
              </S.DetailWrapper>
            ) : battles.length > 0 ? (
              <>
                <S.BattleListContainer>
                  {battles.map(battleItem => {
                    const judge = battle.judgeUpperHand(battleItem.result);

                    const cannotOpen = battleItem.result === MATCH_VALUE.PENDING;

                    return (
                      <S.BattleProfileBox
                        key={battleItem.id}
                        type="button"
                        $disabled={cannotOpen}
                        disabled={cannotOpen}
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
                              <S.DateIcon aria-hidden />
                              <S.DateText>{battleItem.expireDate}</S.DateText>
                            </S.DateBox>
                          </S.NameBox>
                        </S.ProfileContent>

                        <S.DetailBox>
                          <S.DetailButton $disabled={cannotOpen}>
                            {battleItem.result === MATCH_VALUE.WON ||
                            battleItem.result === MATCH_VALUE.LOST ||
                            battleItem.result === MATCH_VALUE.DRAWN
                              ? "결과 보기"
                              : "상세 내용 보기"}
                          </S.DetailButton>
                          <S.BackArrowIcon aria-hidden />
                        </S.DetailBox>
                      </S.BattleProfileBox>
                    );
                  })}
                </S.BattleListContainer>

                {battle.isBattleSelected ? (
                  battle.queries.detail.isPending || battle.queries.detail.isPlaceholderData ? (
                    <S.DetailWrapper>
                      <S.DefaultBattleBox role="status" aria-live="polite">
                        <S.DefaultBattleText>
                          배틀 상세 정보를 불러오는 중이에요.
                        </S.DefaultBattleText>
                      </S.DefaultBattleBox>
                    </S.DetailWrapper>
                  ) : battle.queries.detail.isError && !battle.battleDetailData ? (
                    <S.DetailWrapper>
                      <S.DefaultBattleBox role="alert">
                        <S.DefaultBattleText>
                          {getErrorMessage(
                            battle.queries.detail.error,
                            "배틀 상세 정보를 불러오지 못했어요."
                          )}
                        </S.DefaultBattleText>
                        <Button
                          type="button"
                          size="sm"
                          variant="primary"
                          onClick={() => void battle.queries.detail.refetch()}
                        >
                          다시 시도
                        </Button>
                      </S.DefaultBattleBox>
                    </S.DetailWrapper>
                  ) : (
                    <S.DetailWrapper>
                      <S.UpperHandContainer>
                        <S.UpperHandProfile>
                          <S.BattleDetailProfileBox>
                            <S.BattleDetailAvatar
                              profileImage={battle.battleDetailData?.enemy.profileImage}
                              fallbackIcon={<DefaultProfileIcon />}
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
                              fallbackIcon={<DefaultProfileIcon />}
                              alt="내 프로필"
                            />
                          </S.BattleDetailProfileBox>
                          <S.UpperHandName>나</S.UpperHandName>
                        </S.UpperHandProfile>
                      </S.UpperHandContainer>

                      <S.HorizontalLine />

                      {battle.queries.detail.isError && battle.battleDetailData && (
                        <S.QueryNotice role="alert">
                          <span>상세 정보를 갱신하지 못해 이전 결과를 표시해요.</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => void battle.queries.detail.refetch()}
                          >
                            다시 시도
                          </Button>
                        </S.QueryNotice>
                      )}

                      <S.DetailAnalyzeContainer
                        aria-busy={battle.queries.analyze.isFetching || undefined}
                      >
                        <S.TitleBox>
                          <S.AnalyzeText>세부 분석</S.AnalyzeText>
                          <S.DropdownBox>
                            <Select<AnalyzeCategory>
                              value={battle.category}
                              options={battle.ANALYZE_CATEGORY_OPTIONS}
                              onChange={battle.setCategory}
                              width={8}
                              aria-label="배틀 분석 기준"
                            />
                          </S.DropdownBox>
                        </S.TitleBox>

                        {battle.queries.analyze.isPending ||
                        battle.queries.analyze.isPlaceholderData ? (
                          <S.AnalyzeState role="status" aria-live="polite">
                            세부 분석을 불러오는 중이에요.
                          </S.AnalyzeState>
                        ) : battle.queries.analyze.isError &&
                          battle.queries.analyze.data === undefined ? (
                          <S.AnalyzeState role="alert">
                            <span>
                              {getErrorMessage(
                                battle.queries.analyze.error,
                                "세부 분석을 불러오지 못했어요."
                              )}
                            </span>
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              onClick={() => void battle.queries.analyze.refetch()}
                            >
                              다시 시도
                            </Button>
                          </S.AnalyzeState>
                        ) : (
                          <>
                            {battle.queries.analyze.isError && (
                              <S.QueryNotice role="alert">
                                <span>분석을 갱신하지 못해 이전 결과를 표시해요.</span>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => void battle.queries.analyze.refetch()}
                                >
                                  다시 시도
                                </Button>
                              </S.QueryNotice>
                            )}
                            <S.AnalyzeBox>
                              <S.AnalyzeRow>
                                <S.AnalyzeContent $width="4rem">
                                  <S.AnalyzeName>
                                    {battle.battleDetailData?.enemy.name}
                                  </S.AnalyzeName>
                                  <S.AnalyzeName>나</S.AnalyzeName>
                                </S.AnalyzeContent>

                                <S.VerticalLine />

                                <S.AnalyzeContent $width="100%">
                                  <S.DataBox>
                                    <div>{formatAnalyzePoint(battle.rivalAnalyzePoint)}</div>
                                    <S.AnalyzeBar $width={battle.rivalAnalyzeRate ?? 0} $isRival>
                                      <S.AnalyzeLabel>
                                        {battle.isRivalHigher && battle.diff > 0 && (
                                          <S.CompareDiff>+{battle.diff}%</S.CompareDiff>
                                        )}
                                      </S.AnalyzeLabel>
                                    </S.AnalyzeBar>
                                  </S.DataBox>

                                  <S.DataBox>
                                    <div>{formatAnalyzePoint(battle.myAnalyzePoint)}</div>
                                    <S.AnalyzeBar
                                      $width={battle.myAnalyzeRate ?? 0}
                                      $isRival={false}
                                    >
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
                          </>
                        )}
                      </S.DetailAnalyzeContainer>
                    </S.DetailWrapper>
                  )
                ) : (
                  <S.DetailWrapper>
                    <S.DefaultBattleBox>
                      <S.FireIcon aria-hidden />
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
        <Dialog
          width={43}
          height={32}
          isOpen={battle.isModalOpen}
          onClose={battle.closeModal}
          ariaLabel="배틀 신청 및 신청 목록"
        >
          <S.ModalContainer>
            <S.ModalHeader>
              <SlideSelector
                ariaLabel="배틀 신청 보기"
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
                <S.UserChoiceContainer aria-busy={battle.queries.rivals.isFetching || undefined}>
                  {battle.queries.rivals.isPending ? (
                    <S.EmptyStateBox role="status" aria-live="polite">
                      <S.EmptyTitle>신청 가능한 라이벌을 불러오는 중이에요.</S.EmptyTitle>
                    </S.EmptyStateBox>
                  ) : battle.queries.rivals.isError && !battle.battleList ? (
                    <S.EmptyStateBox role="alert">
                      <S.EmptyTitle>신청 가능한 라이벌을 불러오지 못했어요.</S.EmptyTitle>
                      <S.EmptyDescription>
                        {getErrorMessage(
                          battle.queries.rivals.error,
                          "잠시 후 다시 시도해 주세요."
                        )}
                      </S.EmptyDescription>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => void battle.queries.rivals.refetch()}
                      >
                        다시 시도
                      </Button>
                    </S.EmptyStateBox>
                  ) : battleRivals.length === 0 ? (
                    <S.EmptyStateBox>
                      <S.EmptyTitle>배틀을 신청할 라이벌이 없어요.</S.EmptyTitle>
                      <S.EmptyDescription>먼저 라이벌을 추가해 주세요.</S.EmptyDescription>
                    </S.EmptyStateBox>
                  ) : (
                    battleRivals.map(user => {
                      const isSelected = battle.rivalSelectedId === user.id;

                      return (
                        <S.SelectableUserButton
                          key={user.id}
                          type="button"
                          $isSelected={isSelected}
                          aria-pressed={isSelected}
                          onClick={() => battle.handleUserSelect(user.id)}
                        >
                          <S.ProfileContent $height="3rem">
                            <S.ProfileIcon>
                              <S.ProfileChoiceAvatar
                                profileImage={user.profileImage}
                                fallbackIcon={<DefaultProfileIcon />}
                                alt={user.name}
                              />
                            </S.ProfileIcon>
                            <S.ProfileTagBox>
                              <S.ProfileName>{user.name}</S.ProfileName>
                            </S.ProfileTagBox>
                          </S.ProfileContent>

                          {isSelected ? (
                            <S.CheckedIcon aria-hidden />
                          ) : (
                            <S.UncheckedBox aria-hidden />
                          )}
                        </S.SelectableUserButton>
                      );
                    })
                  )}
                </S.UserChoiceContainer>

                <S.DateChoiceRow>
                  {battle.PERIOD_OPTIONS.map(day => (
                    <S.DateChoiceBox
                      key={day}
                      type="button"
                      onClick={() => battle.handlePeriodSelect(day)}
                      $active={battle.selectedDay === day}
                      aria-pressed={battle.selectedDay === day}
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
              <S.BattleApplyListContainer
                $hasApply={hasBattleApplyList}
                aria-busy={battle.queries.applications.isFetching || undefined}
              >
                {battle.queries.applications.isPending ? (
                  <S.EmptyStateBox role="status" aria-live="polite">
                    <S.EmptyTitle>배틀 신청 목록을 불러오는 중이에요.</S.EmptyTitle>
                  </S.EmptyStateBox>
                ) : battle.queries.applications.isError && !battle.battleApplyList ? (
                  <S.EmptyStateBox role="alert">
                    <S.EmptyTitle>배틀 신청 목록을 불러오지 못했어요.</S.EmptyTitle>
                    <S.EmptyDescription>
                      {getErrorMessage(
                        battle.queries.applications.error,
                        "잠시 후 다시 시도해 주세요."
                      )}
                    </S.EmptyDescription>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => void battle.queries.applications.refetch()}
                    >
                      다시 시도
                    </Button>
                  </S.EmptyStateBox>
                ) : hasBattleApplyList ? (
                  battleApplyItems.map(applyItem => (
                    <S.UserChoiceBox key={applyItem.id} $isSelected={false} $isRival>
                      <S.ProfileContent $height="3rem">
                        <S.ProfileIcon>
                          <S.ProfileChoiceAvatar
                            profileImage={applyItem.enemy.profileImage}
                            fallbackIcon={<DefaultProfileIcon />}
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
                        onClick={() => void battle.handleBattleApplyCancel(applyItem.id)}
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
