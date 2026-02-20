import * as S from "./CompetitionPage.style";
import { useCompetition } from "@/pages/competition/model/useCompetition";
import { WithMyCompetition, RivalCompetition } from "@/features/competition";
import { AddRivalsDialog } from "@/features/home/lib/AddRivals";
import { useRival } from "@/features/home/model/useRival";

export const CompetitionPage = () => {
  const { myRivalsData, competitionTab, setCompetitionTab } = useCompetition();
  const rival = useRival();

  const isEmptyRivals = (myRivalsData?.data?.myRivals.length ?? 0) === 0;

  return (
    <S.Wrapper>
      <S.CompetitionTopBar>
        <S.WitchCompete $isActive={competitionTab === "ME"} onClick={() => setCompetitionTab("ME")}>
          나와의 경쟁
        </S.WitchCompete>

        <S.WitchCompete
          $isActive={competitionTab === "RIVAL"}
          onClick={() => {
            if (isEmptyRivals) {
              setCompetitionTab("ME");
              rival.handleOpen();
              return;
            }
            setCompetitionTab("RIVAL");
          }}
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

      {rival.modalOpen && (
        <AddRivalsDialog
          isOpen={rival.modalOpen}
          onClose={rival.handleClose}
          usingState="competition"
          rival={rival}
        />
      )}
    </S.Wrapper>
  );
};
