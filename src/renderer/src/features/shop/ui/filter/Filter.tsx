import * as S from "./Filter.style";

export const Filter = () => {
  return (
    <S.FilterContainer>
      <S.FilterBox>
        <S.SelectWrapper>
          <S.Select>
            {["최신 순", "인기 순", "가격 높은 순", "가격 낮은 순"].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </S.Select>
          <S.ArrowIcon />
        </S.SelectWrapper>
        <S.SelectWrapper>
          <S.Select>
            {["배너", "이름표", "휘장"].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </S.Select>
          <S.ArrowIcon />
        </S.SelectWrapper>
      </S.FilterBox>
      <S.SearchBox>
        <S.SearchInput placeholder="상품명으로 검색" />
        <S.SearchIcon />
      </S.SearchBox>
    </S.FilterContainer>
  );
};
