import DummyImage from "../../assets/dummy-banner.png";
import { Recommend } from "@/features/shop";
import * as S from "./MainProducts.style";
import { Popularity } from "@/features/shop/ui/popularity/Popularity";

export const MainProducts = () => {
  return (
    <S.MainContainer>
      <S.BannerImage $imgUrl={DummyImage} />
      <Recommend />
      <Popularity />
    </S.MainContainer>
  );
};
