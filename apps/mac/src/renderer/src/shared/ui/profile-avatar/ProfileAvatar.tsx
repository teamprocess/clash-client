import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import * as S from "./ProfileAvatar.style";

export interface ProfileAvatarProps {
  profileImage?: string | null;
  badgeImage?: string | null;
  fallbackSrc?: string;
  fallbackIcon?: ReactNode;
  alt?: string;
  className?: string;
  children?: ReactNode;
}

type ImageMode = "source" | "fallback" | "icon" | "placeholder";

const getInitialImageMode = (
  profileImage?: string | null,
  fallbackSrc?: string,
  fallbackIcon?: ReactNode
) => {
  if (profileImage) {
    return "source" as const;
  }

  if (fallbackSrc) {
    return "fallback" as const;
  }

  if (fallbackIcon) {
    return "icon" as const;
  }

  return "placeholder" as const;
};

export const ProfileAvatar = ({
  profileImage,
  badgeImage,
  fallbackSrc,
  fallbackIcon,
  alt = "프로필 이미지",
  className,
  children,
}: ProfileAvatarProps) => {
  const [imageMode, setImageMode] = useState<ImageMode>(() =>
    getInitialImageMode(profileImage, fallbackSrc, fallbackIcon)
  );
  const [shouldShowBadge, setShouldShowBadge] = useState(Boolean(badgeImage));

  useEffect(() => {
    setImageMode(getInitialImageMode(profileImage, fallbackSrc, fallbackIcon));
  }, [profileImage, fallbackSrc, fallbackIcon]);

  useEffect(() => {
    setShouldShowBadge(Boolean(badgeImage));
  }, [badgeImage]);

  const displaySrc =
    imageMode === "source" ? profileImage : imageMode === "fallback" ? fallbackSrc : undefined;

  const handleImageError = () => {
    setImageMode(prev => {
      if (prev === "source" && fallbackSrc) {
        return "fallback";
      }

      if (fallbackIcon) {
        return "icon";
      }

      return "placeholder";
    });
  };

  const handleBadgeError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    setShouldShowBadge(false);
  };

  return (
    <S.Root className={className}>
      <S.Photo>
        {displaySrc ? (
          <S.Image src={displaySrc} alt={alt} onError={handleImageError} />
        ) : imageMode === "icon" && fallbackIcon ? (
          <S.FallbackIcon aria-hidden>{fallbackIcon}</S.FallbackIcon>
        ) : (
          <S.Placeholder aria-hidden>
            <S.PlaceholderFigure>
              <S.PlaceholderHead />
              <S.PlaceholderBody />
            </S.PlaceholderFigure>
          </S.Placeholder>
        )}

        {children ? <S.Overlay>{children}</S.Overlay> : null}
      </S.Photo>

      {shouldShowBadge && badgeImage ? (
        <S.Badge src={badgeImage} alt="" aria-hidden onError={handleBadgeError} />
      ) : null}
    </S.Root>
  );
};
