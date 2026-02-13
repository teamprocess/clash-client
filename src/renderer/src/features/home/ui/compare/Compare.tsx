import * as S from "./Compare.style";
import { Link } from "react-router-dom";
import { Github } from "@/features/home/ui/compare/github/CompareGithub";
import { useCompare } from "@/features/home/model/useCompare";

export const Compare = () => {
  const getCompareData = useCompare();
  // if (!getCompareData.compareData) return null;

  return (
    <S.Wrapper>
      <S.Container>
        <S.TopPositionBox>
          <S.TitleBox>
            <Link to="/">
              <S.BackArrowIcon />
            </Link>
            <S.Title>어제와 비교</S.Title>
          </S.TitleBox>
        </S.TopPositionBox>
        <Github
          yesterday={getCompareData.compareData?.yesterday ?? null}
          today={getCompareData.compareData?.today ?? null}
        />
      </S.Container>
    </S.Wrapper>
  );
};
