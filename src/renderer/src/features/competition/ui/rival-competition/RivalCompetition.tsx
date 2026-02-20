import * as S from "./RivalCompetition.style";
import { MyRivals } from "@/features/competition/ui/rival-competition/my-rivals/MyRivals";
import { RivalCompare } from "@/features/competition/ui/rival-competition/compare-rivals/CompareRivals";
import { Battle } from "@/features/competition/ui/rival-competition/battle/Battle";

export const RivalCompetition = data => {
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
