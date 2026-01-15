import DummyImage from "../../assets/dummy-banner.png";
import { Recommend } from "@/features/shop";
import * as S from "./MainProducts.style";
import { Popularity } from "@/features/shop/ui/popularity/Popularity";
import { UseShop } from "@/features/shop/model/useShop";

export const MainProducts = ({ recommendedProducts, popularProducts }: UseShop) => {
  return (
    <S.MainContainer>
      <S.BannerImage $imgUrl={DummyImage} />
      <Recommend recommendedProducts={recommendedProducts} />
      <Popularity popularProducts={popularProducts} />
    </S.MainContainer>
  );
};
