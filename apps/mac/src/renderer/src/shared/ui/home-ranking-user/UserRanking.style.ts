import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import { createNameplateOverlayTuningCss, nameplateFrameCss } from "@/shared/lib";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";

const homeRankingNameplateTuningCss = createNameplateOverlayTuningCss({
  insetX: "0.1rem",
  scaleX: 1.2,
  scaleY: 2.75,
  shiftY: "1.55rem",
});

export const RankingAvatar = styled(ProfileAvatar)`
  width: 2rem;
  height: 2rem;
`;

export const UserContainer = styled.div<{ $sticky?: boolean }>`
  padding: 1rem;
  gap: 0.5rem;
  width: 100%;
  height: 3.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ $sticky }) =>
    $sticky &&
    `
     border: none;
    `}
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  min-width: 0;
  flex: 1 1 auto;
`;

export const RankTierSlot = styled.div`
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
`;

export const ProfileName = styled.p`
  ${font.body.bold}
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProfileHandle = styled.div`
  display: block;
  min-width: 0;
  max-width: 100%;
  flex: 0 1 auto;
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.alternative};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProfileHandleButton = styled.button`
  min-width: 0;
  max-width: 100%;
  flex: 0 1 auto;
  padding: 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.alternative};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.1s ease-in-out;

  &:hover {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: none;
    text-decoration: underline;
  }
`;

export const RivalMention = styled.div`
  ${font.caption.medium}
  color: ${palette.neutral[97]};
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.primary.normal};
  flex: 0 0 auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  flex: 1 1 auto;
`;

export const NameplateSurface = styled.div<{ $image?: string }>`
  ${homeRankingNameplateTuningCss};
  flex: 1 1 auto;
  min-height: 1.65rem;
  padding: 0.24rem 0.9rem 0.28rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: visible;
  background: ${({ theme }) => theme.background.alternative};
  ${nameplateFrameCss};
`;

export const Rank = styled.div<{ $rank: number }>`
  ${font.body.bold}
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  // 이 밑은 순위별 휘장변화 입니다.
  background-color: ${({ $rank }) =>
    $rank === 1
      ? palette.yellow[50]
      : $rank === 2
        ? palette.blue[80]
        : $rank === 3
          ? palette.yellow[30]
          : "transparent"};
  color: ${({ $rank, theme }) => ($rank <= 3 ? theme.background.normal : theme.label.normal)};
  border: ${({ $rank, theme }) =>
    $rank <= 3 ? `1px solid ${theme.line.neutral}` : `1px solid transparent`};
`;

export const Point = styled.div`
  ${font.headline2.medium}
  flex: 0 0 auto;
  white-space: nowrap;
`;
