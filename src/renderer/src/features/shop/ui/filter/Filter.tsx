import * as S from "./Filter.style";
import { SearchInput } from "@/shared/ui/search-input";

const sortOptions = [
  { label: "최신 순", value: "latest" },
  { label: "인기 순", value: "popular" },
  { label: "가격 높은 순", value: "expensive" },
  { label: "가격 낮은 순", value: "cheapest" },
];

const categoryOptions = [
  { label: "배너", value: "banner" },
  { label: "이름표", value: "nametag" },
  { label: "휘장", value: "insignia" },
];

export const Filter = () => {
  return (
    <S.FilterContainer>
      <S.FilterBox>
        <S.SelectWrapper>
          <S.Select>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </S.Select>
          <S.ArrowIcon />
        </S.SelectWrapper>
        <S.SelectWrapper>
          <S.Select>
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </S.Select>
          <S.ArrowIcon />
        </S.SelectWrapper>
      </S.FilterBox>
      <SearchInput placeholder={"상품명으로 검색"} inputSize={"sm"} variant={"dark"} />
    </S.FilterContainer>
  );
};
