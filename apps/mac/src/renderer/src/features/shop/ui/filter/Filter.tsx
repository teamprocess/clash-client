import * as S from "./Filter.style";
import { SearchInput } from "@/shared/ui/search-input";
import { Select } from "@/shared/ui/select";
import { ProductCategory, ProductSort } from "@/entities/product";

type SortOption = {
  key: ProductSort;
  label: string;
};

type CategoryOption = {
  key: ProductCategory | "";
  label: string;
};

const sortOptions: SortOption[] = [
  { key: ProductSort.LATEST, label: "최신 순" },
  { key: ProductSort.POPULAR, label: "인기 순" },
  { key: ProductSort.EXPENSIVE, label: "가격 높은 순" },
  { key: ProductSort.CHEAPEST, label: "가격 낮은 순" },
];

const categoryOptions: CategoryOption[] = [
  { key: "", label: "전체" },
  { key: ProductCategory.BANNER, label: "배너" },
  { key: ProductCategory.NAMEPLATE, label: "이름표" },
  { key: ProductCategory.INSIGNIA, label: "휘장" },
];

interface FilterProps {
  sort: ProductSort;
  onSortChange: (sort: ProductSort) => void;
  category: ProductCategory | "";
  onCategoryChange: (category: ProductCategory | "") => void;
  keyword: string;
  onKeywordChange: (keyword: string) => void;
}

export const Filter = ({
  sort,
  onSortChange,
  category,
  onCategoryChange,
  keyword,
  onKeywordChange,
}: FilterProps) => {
  return (
    <S.FilterContainer>
      <S.FilterBox>
        <Select<ProductSort> value={sort} options={sortOptions} onChange={onSortChange} />
        <Select<ProductCategory | "">
          value={category}
          options={categoryOptions}
          onChange={onCategoryChange}
        />
      </S.FilterBox>

      <SearchInput
        placeholder="상품명으로 검색"
        inputSize="sm"
        variant="dark"
        value={keyword}
        onChange={e => onKeywordChange(e.target.value)}
      />
    </S.FilterContainer>
  );
};
