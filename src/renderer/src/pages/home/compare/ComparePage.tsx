import * as S from "./ComparePage.style";
import { Compare } from "@/features/home/ui/compare/Compare";
import { useCompare } from "@/features/home/model/useCompare";

export const ComparePage = () => {
  const { compare } = useCompare();

  return (
    <S.CompareContainer>
      <Compare {...compare} />
    </S.CompareContainer>
  );
};
