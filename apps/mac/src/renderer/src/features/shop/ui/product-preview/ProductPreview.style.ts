import styled, { css } from "styled-components";
import { ProfileAvatar } from "@/shared/ui";

type PreviewSize = "card" | "detail";

const previewImageCss = css<{ $image?: string }>`
  ${({ $image }) =>
    $image
      ? `
        background-image: url(${$image});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `
      : ""}
`;

export const Root = styled.div<{ $size: PreviewSize }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GuestAvatar = styled(ProfileAvatar)`
  width: 100%;
  height: 100%;
`;

export const BannerStage = styled.div<{ $size: PreviewSize; $image?: string }>`
  width: 100%;
  height: ${({ $size }) => ($size === "detail" ? "72%" : "68%")};
  border-radius: ${({ $size }) => ($size === "detail" ? "1.1rem" : "0.8rem")};
  background-color: ${({ theme }) => theme.background.alternative};
  position: relative;
  overflow: hidden;
  ${previewImageCss}

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.14);
    pointer-events: none;
  }
`;

export const BannerIdentity = styled.div<{ $size: PreviewSize }>`
  position: absolute;
  right: ${({ $size }) => ($size === "detail" ? "0.9rem" : "0.55rem")};
  bottom: ${({ $size }) => ($size === "detail" ? "0.9rem" : "0.55rem")};
  left: ${({ $size }) => ($size === "detail" ? "0.9rem" : "0.55rem")};
  z-index: 1;
  padding: ${({ $size }) => ($size === "detail" ? "0.65rem 0.8rem" : "0.45rem 0.55rem")};
  border-radius: ${({ $size }) => ($size === "detail" ? "0.95rem" : "0.75rem")};
  background: rgba(46, 46, 46, 0.84);
  display: flex;
  align-items: center;
  gap: ${({ $size }) => ($size === "detail" ? "0.6rem" : "0.45rem")};
`;

export const BannerAvatarSlot = styled.div<{ $size: PreviewSize }>`
  flex: 0 0 auto;
  width: ${({ $size }) => ($size === "detail" ? "2.65rem" : "1.85rem")};
  height: ${({ $size }) => ($size === "detail" ? "2.65rem" : "1.85rem")};
`;

export const BannerTextBlock = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
`;

export const BannerPrimaryLine = styled.div<{ $size: PreviewSize }>`
  width: ${({ $size }) => ($size === "detail" ? "62%" : "58%")};
  height: ${({ $size }) => ($size === "detail" ? "0.9rem" : "0.62rem")};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
`;

export const BannerSecondaryLine = styled.div<{ $size: PreviewSize }>`
  width: ${({ $size }) => ($size === "detail" ? "38%" : "34%")};
  height: ${({ $size }) => ($size === "detail" ? "0.65rem" : "0.5rem")};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.52);
`;

export const BadgeStage = styled.div<{ $size: PreviewSize }>`
  width: ${({ $size }) => ($size === "detail" ? "8rem" : "5.6rem")};
  height: ${({ $size }) => ($size === "detail" ? "8rem" : "5.6rem")};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BadgeAvatarSlot = styled.div<{ $size: PreviewSize }>`
  width: ${({ $size }) => ($size === "detail" ? "5.9rem" : "4.3rem")};
  height: ${({ $size }) => ($size === "detail" ? "5.9rem" : "4.3rem")};
`;

export const BadgeImage = styled.div<{ $size: PreviewSize; $image?: string }>`
  position: absolute;
  inset: 50% auto auto 50%;
  width: ${({ $size }) => ($size === "detail" ? "128%" : "120%")};
  height: ${({ $size }) => ($size === "detail" ? "128%" : "120%")};
  transform: translate(-50%, -50%);
  pointer-events: none;
  ${({ $image }) =>
    $image
      ? `
        background-image: url(${$image});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      `
      : ""}
`;

export const NameplateStage = styled.div<{ $size: PreviewSize }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ $size }) => ($size === "detail" ? "0.6rem" : "0.42rem")};
`;

export const NameplateMutedRow = styled.div<{ $size: PreviewSize }>`
  display: flex;
  align-items: center;
  gap: ${({ $size }) => ($size === "detail" ? "0.55rem" : "0.45rem")};
  opacity: 0.5;
`;

export const NameplateDot = styled.div<{ $size: PreviewSize }>`
  width: ${({ $size }) => ($size === "detail" ? "1rem" : "0.82rem")};
  height: ${({ $size }) => ($size === "detail" ? "1rem" : "0.82rem")};
  border-radius: 50%;
  background: ${({ theme }) => theme.line.normal};
`;

export const NameplateMutedBar = styled.div<{ $size: PreviewSize; $short?: boolean }>`
  width: ${({ $size, $short }) => {
    if ($size === "detail") {
      return $short ? "8.5rem" : "11rem";
    }

    return $short ? "4.5rem" : "6.2rem";
  }};
  max-width: 100%;
  height: ${({ $size }) => ($size === "detail" ? "0.9rem" : "0.72rem")};
  border-radius: 999px;
  background: ${({ theme }) => theme.line.neutral};
`;

export const NameplateActiveRow = styled.div<{ $size: PreviewSize }>`
  width: 100%;
  min-height: ${({ $size }) => ($size === "detail" ? "3.15rem" : "2.2rem")};
  border-radius: ${({ $size }) => ($size === "detail" ? "1rem" : "0.82rem")};
  background: ${({ theme }) => theme.fill.alternative};
  padding: ${({ $size }) => ($size === "detail" ? "0.45rem 0.6rem" : "0.36rem 0.48rem")};
  display: flex;
  align-items: center;
  gap: ${({ $size }) => ($size === "detail" ? "0.55rem" : "0.42rem")};
  box-sizing: border-box;
`;

export const NameplateAvatarSlot = styled.div<{ $size: PreviewSize }>`
  flex: 0 0 auto;
  width: ${({ $size }) => ($size === "detail" ? "2.1rem" : "1.6rem")};
  height: ${({ $size }) => ($size === "detail" ? "2.1rem" : "1.6rem")};
`;

export const NameplateBar = styled.div<{ $image?: string }>`
  flex: 1;
  align-self: stretch;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.background.neutral};
  ${previewImageCss}
`;
