import * as S from "./CompetitionPage.style";
import { useCompetition } from "@/pages/competition/model/useCompetition";
import { WithMyCompetition, RivalCompetition } from "@/features/competition";
export const CompetitionPage = () => {
  const { myRivalsData, competitionTab, setCompetitionTab } = useCompetition();

  const rivalsExist = myRivalsData?.data?.myRivals ?? [];
  const isEmptyRivals = rivalsExist.length === 0;

  return (
    <S.Wrapper>
      <S.CompetitionTopBar>
        <S.WitchCompete $isActive={competitionTab === "ME"} onClick={() => setCompetitionTab("ME")}>
          나와의 경쟁
        </S.WitchCompete>

        <S.WitchCompete
          $isActive={competitionTab === "RIVAL"}
          onClick={() => setCompetitionTab("RIVAL")}
        >
          라이벌과의 경쟁
        </S.WitchCompete>
      </S.CompetitionTopBar>

      {competitionTab === "ME" ? (
        <WithMyCompetition />
      ) : isEmptyRivals ? (
        <S.EmptyText>등록된 라이벌이 없습니다.</S.EmptyText>
      ) : (
        <RivalCompetition data={myRivalsData} />
      )}
    </S.Wrapper>
  );
};
