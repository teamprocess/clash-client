import DummyImage from "../../assets/dummy-banner.png";
import { Recommend } from "@/features/shop";
import * as S from "./MainProducts.style";
import { Popularity } from "@/features/shop/ui/popularity/Popularity";
import { Product } from "@/entities/product";

interface MainProductsProps {
  recommendedProducts: Product[];
  popularProducts: Product[];
}

export const MainProducts = ({ recommendedProducts, popularProducts }: MainProductsProps) => {
  return (
    <S.MainContainer>
      <S.BannerImage $imgUrl={DummyImage} />
      <Recommend products={recommendedProducts} />
      <Popularity products={popularProducts} />
    </S.MainContainer>
  );
};
