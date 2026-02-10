import * as S from "./Filter.style";
import { SearchInput } from "@/shared/ui/search-input";
import { Select } from "@/shared/ui/select";
import { useState } from "react";

type SortType = "LATEST" | "POPULAR" | "EXPENSIVE" | "CHEAPEST";
type CategoryType = "BANNER" | "NAMETAG" | "INSIGNIA";

const sortOptions: {
  key: SortType;
  label: string;
}[] = [
  { key: "LATEST", label: "최신 순" },
  { key: "POPULAR", label: "인기 순" },
  { key: "EXPENSIVE", label: "가격 높은 순" },
  { key: "CHEAPEST", label: "가격 낮은 순" },
];

const categoryOptions: {
  key: CategoryType;
  label: string;
}[] = [
  { key: "BANNER", label: "배너" },
  { key: "NAMETAG", label: "이름표" },
  { key: "INSIGNIA", label: "휘장" },
];

export const Filter = () => {
  const [sort, setSort] = useState<SortType>("LATEST");
  const [category, setCategory] = useState<CategoryType>("BANNER");

  return (
    <S.FilterContainer>
      <S.FilterBox>
        <Select<SortType> value={sort} options={sortOptions} onChange={setSort} />
        <Select<CategoryType> value={category} options={categoryOptions} onChange={setCategory} />
      </S.FilterBox>

      <SearchInput placeholder="상품명으로 검색" inputSize="sm" variant="dark" />
    </S.FilterContainer>
  );
};
