import * as S from "./RivalCompetition.style";
import { MyRivals, Battle, RivalCompare } from "@/features/competition";
import { MyRivalsResponse } from "@/entities/competition";

interface RivalCompetitionProps {
  data: MyRivalsResponse;
}

export const RivalCompetition = ({ data }: RivalCompetitionProps) => {
  return (
    <S.Container>
      <S.CompareContentBox>
        <MyRivals data={data} />
        <RivalCompare />
      </S.CompareContentBox>
      <Battle />
    </S.Container>
  );
};
