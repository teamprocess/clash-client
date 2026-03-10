import * as S from "./ShopLoading.style";

interface ShopLoadingProps {
  variant: "main" | "products";
}

const renderCardSkeletons = (count: number) =>
  Array.from({ length: count }, (_, index) => (
    <S.ProductCardSkeleton key={index}>
      <S.ImageSkeleton />
      <S.InfoSkeleton>
        <S.TextSkeleton $width="58%" />
        <S.TextSkeleton $width="42%" />
      </S.InfoSkeleton>
    </S.ProductCardSkeleton>
  ));

export const ShopLoading = ({ variant }: ShopLoadingProps) => {
  if (variant === "products") {
    return (
      <S.LoadingContainer $variant={variant}>
        <S.CardGrid>{renderCardSkeletons(12)}</S.CardGrid>
      </S.LoadingContainer>
    );
  }

  return (
    <S.LoadingContainer $variant={variant}>
      <S.BannerSkeleton />

      <S.SectionSkeleton>
        <S.TitleSkeleton $width="9rem" />
        <S.CardGrid>{renderCardSkeletons(4)}</S.CardGrid>
      </S.SectionSkeleton>

      <S.SectionSkeleton>
        <S.TitleSkeleton $width="8rem" />
        <S.CardGrid>{renderCardSkeletons(4)}</S.CardGrid>
      </S.SectionSkeleton>
    </S.LoadingContainer>
  );
};
