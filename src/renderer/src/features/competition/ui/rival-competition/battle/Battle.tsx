import * as S from "./Battle.style";
import { Modal } from "@/shared/ui/modal/Modal";
import {
  AnalyzeCategory,
  MatchValue,
} from "@/entities/competition/model/rival-competition/battle.types";
import { useBattle } from "@/features/competition/model/useBattle";

export const Battle = () => {
  const battle = useBattle();

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
              <S.MakeBattle onClick={battle.openModal}>배틀 생성하기</S.MakeBattle>
            </S.TitleBox>
            <S.GaroLine />
            <S.BattleListContainer>
              {battle.battleData?.battles?.slice(0, 4).map(battleItem => (
                <S.BattleProfileBox
                  key={battleItem.id}
                  onClick={() => battle.selectBattleTarget(battleItem.id)}
                >
                  <S.ProfileContent>
                    <S.NameBox>
                      <S.UpperHandJudge $type={battle.judgeUpperHand(battleItem.result)}>
                        {battle.judgeUpperHand(battleItem.result)}
                      </S.UpperHandJudge>

                      <S.BattleName>vs {battleItem.enemy.name}</S.BattleName>

                      <S.DateBox>
                        <S.DateIcon />
                        <S.DateText>{battleItem.expireDate}</S.DateText>
                      </S.DateBox>
                    </S.NameBox>
                  </S.ProfileContent>

                  <S.DetailBox>
                    <S.DetailButton>
                      {battleItem.result === MatchValue.WON || battleItem.result === MatchValue.LOST
                        ? "결과 보기"
                        : "상세 내용 보기"}
                    </S.DetailButton>
                    <S.BackArrowIcon />
                  </S.DetailBox>
                </S.BattleProfileBox>
              ))}
            </S.BattleListContainer>

            {battle.isBattleSelected ? (
              <S.DetailWrapper>
                <S.UpperHandContainer>
                  <S.UpperHandProfile>
                    <S.UpperHandProfileIcon />
                    <S.UpperHandName>{battle.battleDetailData?.enemy.name}</S.UpperHandName>
                  </S.UpperHandProfile>

                  <S.TransitionBox>
                    <S.UpperHandTransition>
                      <S.UpperHandBar
                        $width={battle.rivalPercent ?? 0}
                        $isRival
                        style={{
                          justifyContent: "flex-start",
                        }}
                      >
                        <S.PercentText>
                          {battle.rivalPercent !== null ? Math.round(battle.rivalPercent) : 0}%
                        </S.PercentText>
                      </S.UpperHandBar>

                      <S.UpperHandBar
                        $width={battle.myPercent ?? 0}
                        $isRival={false}
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <S.PercentText>
                          {battle.myPercent !== null ? Math.round(battle.myPercent) : 0}%
                        </S.PercentText>
                      </S.UpperHandBar>
                    </S.UpperHandTransition>

                    <S.WarPeriodText>
                      {battle.remainDays !== null && battle.remainDays > 0
                        ? `종료 ${battle.battleDetailData?.expireDate} · ${battle.remainDays}일 남음`
                        : `종료된 배틀입니다!`}
                    </S.WarPeriodText>
                  </S.TransitionBox>

                  <S.UpperHandProfile>
                    <S.UpperHandProfileIcon />
                    <S.UpperHandName>나</S.UpperHandName>
                  </S.UpperHandProfile>
                </S.UpperHandContainer>

                <S.GaroLine />

                <S.DetailAnalyzeContainer>
                  <S.TitleBox>
                    <S.AnalyzeText>세부 분석</S.AnalyzeText>
                    <S.DropDownBox>
                      <S.SelectWrapper>
                        <S.Select
                          value={battle.category}
                          onChange={e => battle.setCategory(e.target.value as AnalyzeCategory)}
                        >
                          {battle.analyzeCategoryOptions.map(option => (
                            <S.Option key={option.key} value={option.key}>
                              {option.label}
                            </S.Option>
                          ))}
                        </S.Select>
                        <S.ArrowIcon />
                      </S.SelectWrapper>
                    </S.DropDownBox>
                  </S.TitleBox>

                  <S.AnalyzeBox>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "1.5rem",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <S.AnalyzeContent>
                        <S.AnalyzeName>{battle.battleDetailData?.enemy.name}</S.AnalyzeName>
                        <S.AnalyzeName>나</S.AnalyzeName>
                      </S.AnalyzeContent>
                      <S.SeroLine />
                      <S.AnalyzeContent style={{ width: "100%" }}>
                        <S.AnalyzeBar $width={battle.rivalAnalyzeRate ?? 0} $isRival>
                          <S.AnalyzeLabel>
                            <div>
                              {Math.round(battle.rivalAnalyzePoint)}{" "}
                              {battle.detailTextTranslate(battle.category)}
                            </div>
                            {battle.isRivalHigher && battle.diff !== null && battle.diff > 0 && (
                              <S.CompareDiff>+{Math.round(battle.diff)}%</S.CompareDiff>
                            )}
                          </S.AnalyzeLabel>
                        </S.AnalyzeBar>

                        <S.AnalyzeBar $width={battle.myAnalyzeRate ?? 0} $isRival={false}>
                          <S.AnalyzeLabel>
                            <div>
                              {Math.round(battle.myAnalyzePoint)}{" "}
                              {battle.detailTextTranslate(battle.category)}
                            </div>
                            {!battle.isRivalHigher && battle.diff !== null && battle.diff > 0 && (
                              <S.CompareDiff>+{Math.round(battle.diff)}%</S.CompareDiff>
                            )}
                          </S.AnalyzeLabel>
                        </S.AnalyzeBar>
                      </S.AnalyzeContent>
                    </div>
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
          </S.BattleWrapper>
        </S.Content>
      </S.ContentBox>

      {battle.isModalOpen && (
        <Modal
          modalTitle={"배틀 생성하기"}
          width={21.625}
          height={34}
          isOpen={battle.isModalOpen}
          onClose={battle.closeModal}
        >
          <S.ModalContent>
            <S.UserChoiceContainer>
              {battle.battleList?.rivals.map(user => (
                <S.UserChoiceBox
                  key={user.id}
                  $isSelected={battle.rivalSelectedId === user.id}
                  onClick={() => battle.handleUserSelect(user.id)}
                >
                  <S.ProfileContent style={{ height: "3rem" }}>
                    <S.ProfileIcon />
                    <S.ProfileTagBox>
                      <S.ProfileName>{user.name}</S.ProfileName>
                    </S.ProfileTagBox>
                  </S.ProfileContent>

                  {battle.rivalSelectedId === user.id ? <S.CheckedIcon /> : <S.UncheckedBox />}
                </S.UserChoiceBox>
              ))}
            </S.UserChoiceContainer>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {battle.periodOptions.map(day => (
                <S.DateChoiceBox
                  key={day}
                  onClick={() => {
                    battle.setSelectedDay(day);
                    battle.setDuration(day);
                  }}
                  $active={battle.selectedDay === day}
                >
                  {day}일
                </S.DateChoiceBox>
              ))}
            </div>
            <S.BottomBox>
              <S.ButtonBox>
                <S.CloseButton onClick={battle.closeModal}>취소</S.CloseButton>
                <S.OkayButton
                  disabled={!battle.rivalSelectedId || !battle.duration}
                  onClick={battle.createBattle}
                >
                  배틀 신청
                </S.OkayButton>
              </S.ButtonBox>
            </S.BottomBox>
          </S.ModalContent>
        </Modal>
      )}
    </>
  );
};
