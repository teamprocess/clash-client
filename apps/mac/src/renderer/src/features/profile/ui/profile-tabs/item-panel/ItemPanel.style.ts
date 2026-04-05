import styled from "styled-components";
import { font, palette } from "@clash/design-tokens";
import {
  createNameplateOverlayTuningCss,
  defaultProfileImageDark,
  nameplateFrameCss,
} from "@/shared/lib";

const itemCardNameplateTuningCss = createNameplateOverlayTuningCss({
  insetX: 0,
  scaleX: 1,
  scaleY: 1.2,
  shiftY: "0.25rem",
});

const bannerAspectRatio = "11 / 2";

export const Wrapper = styled.section`
  -webkit-app-region: no-drag;
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 1.25rem;
  overflow: hidden;

  @media (max-height: 52rem) {
    gap: 0.875rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 40rem) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h2`
  ${font.title1.medium}
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;

  @media (max-width: 40rem) {
    justify-content: flex-start;
  }
`;

export const FilterChip = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 0.375rem 0.875rem;
  background: ${({ $active, theme }) => ($active ? theme.primary.normal : theme.fill.neutral)};
  color: ${({ $active, theme }) => ($active ? palette.neutral[95] : theme.label.assistive)};
  ${font.label.medium};
  cursor: pointer;
`;

export const GridScrollArea = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.25rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9.75rem, 1fr));
  gap: clamp(0.75rem, 1.4vh, 1rem);
  align-content: start;

  @media (max-width: 72rem) {
    grid-template-columns: repeat(2, minmax(10.75rem, 1fr));
  }

  @media (max-width: 40rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const CardButton = styled.button<{ $equipped: boolean }>`
  min-height: clamp(8.9rem, 17vh, 10.75rem);
  border-radius: 1.35rem;
  border: 1px solid
    ${({ $equipped, theme }) => ($equipped ? theme.primary.normal : theme.line.alternative)};
  background: ${({ theme }) => theme.fill.neutral};
  padding: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  box-shadow: ${({ $equipped }) =>
    $equipped ? "0 0 0 1px rgba(241, 7, 10, 0.15)" : "0 0.75rem 2rem rgba(0, 0, 0, 0.12)"};
  text-align: left;
  cursor: pointer;

  @media (max-width: 40rem) {
    min-height: 9.5rem;
  }
`;

export const CardPreview = styled.div`
  min-height: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BannerPreview = styled.div`
  width: 100%;
  aspect-ratio: ${bannerAspectRatio};
  padding: 0.2rem;
  border-radius: 0.78rem;
  background: ${({ theme }) => theme.background.alternative};
  box-sizing: border-box;
`;

export const BannerArtwork = styled.div<{ $image: string }>`
  width: 100%;
  height: 100%;
  border-radius: 0.2rem;
  background-color: ${({ theme }) => theme.background.neutral};
  background-image: url(${({ $image }) => $image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const BadgePreview = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BadgeStage = styled.div`
  width: 5.75rem;
  height: 5.75rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BadgeAvatarShell = styled.div`
  width: 4.25rem;
  height: 4.25rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.fill.alternative};
  overflow: hidden;
`;

export const BadgeAvatar = styled.img.attrs({
  src: defaultProfileImageDark,
  alt: "",
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const BadgeItemImage = styled.div<{ $image: string }>`
  position: absolute;
  inset: 50% auto auto 50%;
  width: 105%;
  height: 105%;
  transform: translate(-50%, -50%);
  background-image: url(${({ $image }) => $image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const NameplatePreview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const NameplateMutedRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.55;
`;

export const NameplateDot = styled.div`
  width: 0.95rem;
  height: 0.95rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.line.normal};
`;

export const NameplateMutedBar = styled.div`
  width: 6rem;
  height: 0.8rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.line.neutral};
`;

export const NameplateActiveRow = styled.div`
  width: 100%;
  min-height: 2.8rem;
  border-radius: 0.875rem;
  background: ${({ theme }) => theme.fill.alternative};
  padding: 0.42rem 0.58rem;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  box-sizing: border-box;
`;

export const NameplateHeroAvatar = styled.img.attrs({
  src: defaultProfileImageDark,
  alt: "",
})`
  width: 1.95rem;
  height: 1.95rem;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

export const NameplateBar = styled.div<{ $image: string }>`
  ${itemCardNameplateTuningCss};
  flex: 1;
  height: 1.45rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.background.neutral};
  overflow: visible;
  ${nameplateFrameCss}
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const ItemTitle = styled.p`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const CategoryPill = styled.span`
  flex: 0 0 auto;
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.primary.normal};
  color: ${palette.neutral[95]};
  ${font.caption.medium};
`;

export const StateBox = styled.div`
  flex: 1;
  min-height: 0;
  border-radius: 1.35rem;
  background: ${({ theme }) => theme.fill.neutral};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 2rem;
  text-align: center;
`;

export const StateTitle = styled.p`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const StateDescription = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.assistive};
  margin: 0;
`;
