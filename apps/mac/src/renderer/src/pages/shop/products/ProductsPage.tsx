import { Products, useProducts } from "@/features/shop";
import { getErrorMessage } from "@/shared/lib";

export const ProductsPage = () => {
  const {
    products,
    isLoading,
    isError,
    error,
    refetch,
    keyword,
    setKeyword,
    sort,
    setSort,
    category,
    setCategory,
  } = useProducts();
  const errorMessage = isError ? getErrorMessage(error, "상품 목록을 불러오지 못했어요.") : null;

  return (
    <Products
      products={products?.products ?? []}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      onRetry={() => {
        void refetch();
      }}
      keyword={keyword}
      onKeywordChange={setKeyword}
      sort={sort}
      onSortChange={setSort}
      category={category}
      onCategoryChange={setCategory}
    />
  );
};
