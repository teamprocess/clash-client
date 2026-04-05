export interface ProfileDecorationImageLike {
  image?: string | null;
}

export interface ProfileDecorationsInput {
  insigma?: ProfileDecorationImageLike | string | null;
  nameplate?: ProfileDecorationImageLike | string | null;
  banner?: ProfileDecorationImageLike | string | null;
}

export interface ResolvedProfileDecorations {
  badgeImage?: string;
  nameplateImage?: string;
  bannerImage?: string;
}

const resolveDecorationImage = (
  value?: ProfileDecorationImageLike | string | null
): string | undefined => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (!value?.image) {
    return undefined;
  }

  const trimmed = value.image.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const resolveProfileDecorations = (
  equippedItems?: ProfileDecorationsInput | null
): ResolvedProfileDecorations => ({
  badgeImage: resolveDecorationImage(equippedItems?.insigma),
  nameplateImage: resolveDecorationImage(equippedItems?.nameplate),
  bannerImage: resolveDecorationImage(equippedItems?.banner),
});
