import { Products } from "@/features/shop/ui/products/Products";
import { useProducts } from "@/features/shop/model/useProducts";

export const ProductsPage = () => {
  const { products, isLoading, keyword, setKeyword, sort, setSort, category, setCategory } =
    useProducts();

  return (
    <Products
      products={products?.products ?? []}
      isLoading={isLoading}
      keyword={keyword}
      onKeywordChange={setKeyword}
      sort={sort}
      onSortChange={setSort}
      category={category}
      onCategoryChange={setCategory}
    />
  );
};
