import { Product } from "@/entities/product";

export const sortOwnedProductsLast = (products: Product[]) => {
  return [...products].sort((left, right) => {
    if (left.isBought === right.isBought) {
      return 0;
    }

    return left.isBought ? 1 : -1;
  });
};
