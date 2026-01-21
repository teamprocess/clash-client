import * as S from "./CompetitionPage.style";
import { useCompetition } from "@/pages/competition/model/useCompetition";
import { WithMyCompetition, RivalCompetition } from "@/features/competition";

export const CompetitionPage = () => {
  const { competition } = useCompetition();

  return (
    <S.Wrapper>
      <S.CompetitionTopBar>
        <S.WitchCompete
          $isActive={competition.competitionTab === "ME"}
          onClick={() => competition.setCompetitionTab("ME")}
        >
          나와의 경쟁
        </S.WitchCompete>

        <S.WitchCompete
          $isActive={competition.competitionTab === "RIVAL"}
          onClick={() => competition.setCompetitionTab("RIVAL")}
        >
          라이벌과의 경쟁
        </S.WitchCompete>
      </S.CompetitionTopBar>
      {competition.competitionTab === "ME" ? <WithMyCompetition /> : <RivalCompetition />}
    </S.Wrapper>
  );
};
