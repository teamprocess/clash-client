import * as S from "./RivalCompetition.style";
import { Battle } from "./battle/Battle";
import { RivalCompare } from "./compare-rivals/CompareRivals";
import { MyRivals } from "./my-rivals/MyRivals";
import type { MyRivalsResponse } from "@/entities/rival";

interface RivalCompetitionProps {
  data: MyRivalsResponse;
  onManageRivals: () => void;
}

export const RivalCompetition = ({ data, onManageRivals }: RivalCompetitionProps) => {
  return (
    <S.Container>
      <S.CompareContentBox>
        <MyRivals data={data} onManageRivals={onManageRivals} />
        <RivalCompare />
      </S.CompareContentBox>
      <Battle />
    </S.Container>
  );
};
