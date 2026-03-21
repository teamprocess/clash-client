import * as S from "./RivalCompetitionPage.style";
import { RivalCompetition } from "@/features/competition";
import { useRivalCompetition } from "@/features/competition/model/useRivalCompetition";

export const RivalCompetitionPage = () => {
  const { myRivalsData } = useRivalCompetition();
  const isEmptyRivals = (myRivalsData?.data?.myRivals.length ?? 0) === 0;

  return (
    <S.Wrapper>
      {isEmptyRivals ? (
        <S.EmptyText>등록된 라이벌이 없습니다.</S.EmptyText>
      ) : myRivalsData?.data ? (
        <RivalCompetition data={myRivalsData.data} />
      ) : null}
    </S.Wrapper>
  );
};
