import * as S from "./RivalCompetition.style";
import { getStatus } from "@/features/home/model/useHome";
import { useCompetition } from "@/pages/competition/model/useCompetition";

export const RivalCompetition = () => {
  const { rivalCompetition } = useCompetition();

  return (
    <S.Container>
      <S.CompareContentBox>
        <S.ListContent id={"content-1"}>
          <S.RivalList>
            <S.Title>내 라이벌</S.Title>
            <S.Line />
            <S.ProfileWrapper>
              {rivalCompetition.RivalsData.data.my_rivals.map(user => (
                <>
                  <S.ProfileContainer key={user.username}>
                    <S.ProfileContent>
                      <S.ProfileIcon />
                      <S.NameBox>
                        <S.ProfileName>{user.name}</S.ProfileName>
                        <S.ProfileMention>@{user.username}</S.ProfileMention>
                      </S.NameBox>
                      <S.Status $status={user.status}>{getStatus(user.status)}</S.Status>
                    </S.ProfileContent>
                    <S.PlayTime>
                      {getStatus(user.status) === "온라인" && (
                        <>
                          <S.UsingAppText>{user.using_app}</S.UsingAppText>
                          <S.Point>·</S.Point>
                        </>
                      )}
                      {user.active_time}
                    </S.PlayTime>
                  </S.ProfileContainer>
                </>
              ))}
            </S.ProfileWrapper>
          </S.RivalList>
        </S.ListContent>
        <S.Content id={"content-2"}>
          <S.RivalCompareWrapper>
            <S.Title>
              <p>라이벌과 비교</p>
              <S.DropDownBox>
                <S.SelectWrapper>
                  <S.Select
                    value={rivalCompetition.competitionPeriodDropDown}
                    onChange={e => rivalCompetition.setCompetitionPeriodDropDown(e.target.value)}
                  >
                    {rivalCompetition.competitionPeriodDropDownValue.map(option => (
                      <S.Option key={option.key} value={option.key}>
                        {option.label}
                      </S.Option>
                    ))}
                  </S.Select>
                  <S.ArrowIcon />
                </S.SelectWrapper>
                <S.SelectWrapper>
                  <S.Select
                    value={rivalCompetition.competitionDropdown}
                    onChange={e => rivalCompetition.setCompetitionDropdown(e.target.value)}
                  >
                    {rivalCompetition.competitionDropDownValue.map(option => (
                      <S.Option key={option.key} value={option.key}>
                        {option.label}
                      </S.Option>
                    ))}
                  </S.Select>
                  <S.ArrowIcon />
                </S.SelectWrapper>
              </S.DropDownBox>
            </S.Title>
            <S.Line />
          </S.RivalCompareWrapper>
        </S.Content>
      </S.CompareContentBox>
      <S.ContentBox>
        <S.Content id={"content-3"}></S.Content>
      </S.ContentBox>
    </S.Container>
  );
};
