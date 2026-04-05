import * as S from "./ProductPreview.style";
import { ProductCategory } from "@/entities/product";
import { defaultProfileImageDark } from "@/shared/lib";

interface ProductPreviewProps {
  category: ProductCategory;
  image: string;
  size?: "card" | "detail";
  className?: string;
}

export const ProductPreview = ({
  category,
  image,
  size = "card",
  className,
}: ProductPreviewProps) => {
  if (category === ProductCategory.BANNER) {
    return (
      <S.Root $size={size} $category={category} className={className}>
        <S.BannerFrame $size={size}>
          <S.BannerStage $size={size} $image={image} />
        </S.BannerFrame>
      </S.Root>
    );
  }

  if (category === ProductCategory.INSIGNIA) {
    return (
      <S.Root $size={size} $category={category} className={className}>
        <S.BadgeStage $size={size}>
          <S.BadgeAvatarSlot $size={size}>
            <S.GuestAvatar alt="" fallbackSrc={defaultProfileImageDark} />
          </S.BadgeAvatarSlot>
          <S.BadgeImage $size={size} $image={image} />
        </S.BadgeStage>
      </S.Root>
    );
  }

  return (
    <S.Root $size={size} $category={category} className={className}>
      <S.NameplateStage $size={size}>
        <S.NameplateMutedRow $size={size}>
          <S.NameplateDot $size={size} />
          <S.NameplateMutedBar $size={size} />
        </S.NameplateMutedRow>

        <S.NameplateActiveRow $size={size}>
          <S.NameplateAvatarSlot $size={size}>
            <S.GuestAvatar alt="" fallbackSrc={defaultProfileImageDark} />
          </S.NameplateAvatarSlot>
          <S.NameplateBar $size={size} $image={image} />
        </S.NameplateActiveRow>

        <S.NameplateMutedRow $size={size}>
          <S.NameplateDot $size={size} />
          <S.NameplateMutedBar $size={size} $short />
        </S.NameplateMutedRow>
      </S.NameplateStage>
    </S.Root>
  );
};
