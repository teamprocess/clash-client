import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import {
  createNameplateOverlayTuningCss,
  defaultProfileImageDark,
  nameplateFrameCss,
} from "@/shared/lib";
import Cookie from "@/shared/ui/assets/cookie.svg";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";

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

/* 같은 이름표라도 프리뷰 크기가 달라서 화면별 튜닝 값을 분리한다. */
const heroNameplateTuningCss = createNameplateOverlayTuningCss({
  // 프로필 사진 쪽은 고정하고, 우측으로만 프레임이 자라게 한다.
  leftInset: "-0.75rem",
  rightInset: 0,
  scaleX: 2.5,
  scaleY: 2.75,
  shiftY: "2rem",
  origin: "left bottom",
});

const rankingNameplateTuningCss = createNameplateOverlayTuningCss({
  leftInset: "-0.75rem",
  scaleX: 1,
  scaleY: 3.5,
  shiftY: "1.75rem",
});

const showcaseNameplateTuningCss = createNameplateOverlayTuningCss({
  insetX: 0,
  scaleX: 0.9,
  scaleY: 2.5,
  shiftX: "-1rem",
  shiftY: "1.35rem",
});

const bannerAspectRatio = "1126 / 198";

export const FallbackProfileImage = defaultProfileImageDark;

export const DialogLayout = styled.div`
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(18rem, 0.9fr);
  gap: 1.5rem;
`;

export const PreviewSection = styled.section`
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const PreviewShell = styled.div`
  flex: 1;
  min-height: 0;
  border-radius: 1.35rem;
  background: ${({ theme }) => theme.fill.neutral};
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const PreviewCanvas = styled.div`
  flex: 1;
  min-height: 0;
  border-radius: 1.15rem;
  background: ${({ theme }) => theme.background.alternative};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
`;

export const PreviewPanel = styled.div`
  border-radius: 1rem;
  background: ${({ theme }) => theme.fill.neutral};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const PreviewPanelTitle = styled.p`
  ${font.headline2.bold}
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const PreviewHero = styled.div`
  border-radius: 1.15rem;
  background: ${({ theme }) => theme.background.neutral};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
`;

export const PreviewBannerBox = styled.div<{ $image?: string }>`
  width: 100%;
  aspect-ratio: ${bannerAspectRatio};
  border-radius: 0.72rem;
  background: ${({ theme }) => theme.background.alternative};
  overflow: hidden;
  ${previewImageCss}
`;

export const PreviewHeroContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PreviewAvatarSlot = styled.div`
  flex: 0 0 auto;
  width: 5.5rem;
  height: 5.5rem;
`;

export const PreviewAvatarWrap = styled(ProfileAvatar)`
  width: 100%;
  height: 100%;
`;

export const PreviewAvatarFrame = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.fill.alternative};
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

export const PreviewAvatar = styled.img`
  width: 4.25rem;
  height: 4.25rem;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 1;
`;

export const PreviewBadgeImage = styled.img`
  position: absolute;
  inset: 50% auto auto 50%;
  width: 118%;
  height: 118%;
  object-fit: contain;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
`;

export const PreviewIdentity = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

export const PreviewNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
`;

export const PreviewHeroNameplate = styled.div<{ $image?: string }>`
  ${heroNameplateTuningCss};
  min-width: 0;
  flex: 0 1 auto;
  width: min(100%, 13.25rem);
  min-height: 1.55rem;
  padding: 0.18rem 1.25rem 0.22rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  overflow: visible;
  ${nameplateFrameCss}
`;

export const PreviewHeroName = styled.p`
  ${font.title2.medium}
  color: ${palette.neutral[97]};
  margin: 0;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PreviewHandle = styled.p`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.neutral};
  margin: 0;
`;

export const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
`;

export const PreviewRankingCard = styled.div`
  border-radius: 1rem;
  background: ${({ theme }) => theme.fill.neutral};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 100%;
`;

export const PreviewRankingTitle = styled.p`
  ${font.headline2.bold}
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const PreviewRankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  height: 100%;
`;

export const PreviewRankingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const PreviewRankingMutedRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding-left: 0.4rem;
  opacity: 0.38;
`;

export const PreviewRankingMutedAvatar = styled.div`
  width: 1.95rem;
  height: 1.95rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.fill.alternative};
  position: relative;
  flex: 0 0 auto;

  &::before {
    content: "";
    position: absolute;
    top: 0.3rem;
    left: 50%;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.line.normal};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0.24rem;
    left: 50%;
    width: 1.1rem;
    height: 0.58rem;
    border-radius: 999px 999px 0.55rem 0.55rem;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.line.normal};
  }
`;

export const PreviewRankingMutedBar = styled.div<{ $short?: boolean }>`
  width: ${({ $short }) => ($short ? "10.25rem" : "13rem")};
  max-width: 100%;
  height: 1.15rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.fill.alternative};
`;

export const PreviewRankingFocusRow = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 3.35rem;
  border-radius: 1.05rem;
  padding: 0.55rem 0.8rem 0.55rem 0.55rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.background.alternative};
  overflow: visible;
`;

export const PreviewRankingAvatarSlot = styled.div`
  flex: 0 0 auto;
  width: 2.4rem;
  height: 2.4rem;
`;

export const PreviewRankingAvatarWrap = styled(ProfileAvatar)`
  width: 100%;
  height: 100%;
`;

export const PreviewRankingAvatarFrame = styled.div<{ $highlight?: boolean }>`
  width: 2.85rem;
  height: 2.85rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.fill.alternative};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  flex: 0 0 auto;
`;

export const PreviewRankingAvatar = styled.img`
  width: 2.02rem;
  height: 2.02rem;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 1;
`;

export const PreviewRankingBadgeImage = styled.img`
  position: absolute;
  inset: 50% auto auto 50%;
  width: 118%;
  height: 118%;
  object-fit: contain;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
`;

export const PreviewRankingInfo = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  flex: 1;
  overflow: visible;
`;

export const PreviewRankingNameRow = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  width: 100%;
  overflow: visible;
`;

export const PreviewRankingNameplate = styled.div<{ $image?: string }>`
  ${rankingNameplateTuningCss};
  min-width: 0;
  flex: 0 1 auto;
  width: clamp(8.75rem, 82%, 13rem);
  max-width: 100%;
  min-height: 1.4rem;
  padding: 0.14rem 0.9rem 0.18rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  overflow: visible;
  ${nameplateFrameCss}
`;

export const PreviewRankingNameplateContent = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

export const PreviewRankingName = styled.p`
  ${font.label.bold}
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PreviewRankingHandle = styled.p`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.assistive};
  margin: 0;
  white-space: nowrap;
  flex: 0 0 auto;
`;

export const InfoSection = styled.section`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InfoPanel = styled.div`
  flex: 1;
  min-width: 0;
  border-radius: 1.35rem;
  background: ${({ theme }) => theme.fill.neutral};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InfoHero = styled.div`
  border-radius: 1.1rem;
  background: ${({ theme }) => theme.background.alternative};
  padding: 1rem;
`;

export const InfoBannerHero = styled.div<{ $image?: string }>`
  width: 100%;
  aspect-ratio: ${bannerAspectRatio};
  border-radius: 0.78rem;
  background: ${({ theme }) => theme.line.neutral};
  ${previewImageCss}
`;

export const InfoBadgeHero = styled.div`
  width: 100%;
  height: 8.25rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.alternative};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoBadgeImage = styled.img`
  width: min(100%, 8rem);
  height: min(100%, 8rem);
  object-fit: contain;
`;

export const InfoNameplateHero = styled.div`
  width: 100%;
  min-height: 8.25rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.alternative};
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.6rem;
`;

export const InfoNameplateMuted = styled.div`
  width: 72%;
  height: 0.9rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.line.neutral};
  opacity: 0.72;
`;

export const InfoNameplateShowcaseFrame = styled.div`
  width: 100%;
  padding: 0.38rem 0.55rem;
  border-radius: 999px;
`;

export const InfoNameplateShowcase = styled.div<{ $image?: string }>`
  ${showcaseNameplateTuningCss}
  width: 100%;
  height: 1.8rem;
  border-radius: 999px;
  overflow: visible;
  ${nameplateFrameCss}
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const MetaPill = styled.span<{ $accent?: "primary" | "neutral" }>`
  padding: 0.24rem 0.6rem;
  border-radius: 999px;
  background: ${({ $accent, theme }) =>
    $accent === "primary" ? theme.primary.normal : theme.fill.alternative};
  color: ${({ $accent, theme }) =>
    $accent === "primary" ? theme.label.normal : theme.label.assistive};
  ${font.caption.medium}
`;

export const ItemTitle = styled.h3`
  ${font.title2.bold}
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const Description = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.assistive};
  margin: 0;
  white-space: pre-wrap;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.line.alternative};
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const InfoValue = styled.span`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
  text-align: right;
`;

export const InfoValueWithIcon = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`;

export const CookieIcon = styled(Cookie)`
  width: 1.5rem;
  height: 1.5rem;
  flex: 0 0 auto;
`;

export const ErrorText = styled.p`
  ${font.label.medium}
  color: ${palette.red[70]};
  margin: 0;
`;

export const PrimaryButton = styled.button`
  margin-top: auto;
  height: 2.75rem;
  padding: 0 1.4rem;
  border: none;
  border-radius: 0.875rem;
  background: ${({ theme }) => theme.primary.normal};
  color: ${({ theme }) => theme.label.normal};
  ${font.body.bold}
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;
