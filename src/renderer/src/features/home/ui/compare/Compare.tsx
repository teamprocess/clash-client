import * as S from "./Compare.style";
import { Link } from "react-router-dom";
import { Github } from "@/features/home/ui/compare/github/CompareGithub";
// import { SolvedAc } from "@/features/home/ui/compare/solvedac/CompareSolvedAc";
import { CompareProps } from "@/features/home/model/useCompare";

export const Compare = ({ compareDropdown, setCompareDropdown, statsData }: CompareProps) => {
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
          <S.SelectWrapper>
            <S.Select value={compareDropdown} onChange={e => setCompareDropdown(e.target.value)}>
              {["Github", "solved.ac"].map(option => (
                <S.Option key={option} value={option}>
                  {option}
                </S.Option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>
        </S.TopPositionBox>
        {compareDropdown === "Github" ? (
          <Github yesterday={statsData.data.yesterday} today={statsData.data.today} />
        ) : (
          // <SolvedAc statsData={statsData} />
          <>개발 중</>
        )}
      </S.Container>
    </S.Wrapper>
  );
};
