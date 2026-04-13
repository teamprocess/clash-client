import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import type { UserStatus } from "@/entities/competition";
import { createNameplateOverlayTuningCss, nameplateFrameCss } from "@/shared/lib";
import DetailArrow from "@/shared/ui/assets/front.svg";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";

const myRivalsNameplateTuningCss = createNameplateOverlayTuningCss({
  insetX: "0.03rem",
  scaleX: 1.06,
  scaleY: 2.08,
  shiftY: "1.02rem",
});

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const Point = styled.p`
  height: 100%;
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const ListContent = styled.div`
  padding: 1.5rem;
  width: 100%;
  min-width: 0;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const RivalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const Title = styled.p`
  ${font.title2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const ProfileWrapper = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 14.25rem;
  height: 100%;
  gap: 0.5rem;
`;

export const ProfileContainer = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  padding: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.625rem;
  min-width: 0;
  flex: 1 1 auto;
`;

export const RivalAvatar = styled(ProfileAvatar)`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`;

export const IdentityStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  flex: 1 1 auto;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.125rem;
  min-width: 0;
  flex: 0 1 auto;
  max-width: min(100%, 15rem);
  overflow: hidden;
`;

export const NameplateSurface = styled.div<{ $image?: string }>`
  ${myRivalsNameplateTuningCss};
  min-width: 0;
  max-width: min(100%, 15rem);
  flex: 0 1 auto;
  min-height: 1.45rem;
  padding: 0.18rem 0.76rem 0.22rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  overflow: visible;
  ${nameplateFrameCss}
`;

export const ProfileName = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.normal};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProfileMention = styled.span`
  ${font.label.regular}
  color: ${({ theme }) => theme.label.alternative};
  cursor: pointer;

  display: block;
  min-width: 0;
  max-width: 100%;

  overflow: hidden;

  > span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Status = styled.div<{ $status: UserStatus }>`
  ${font.caption.bold};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 0.5rem;
  color: ${palette.neutral[5]};
  flex-shrink: 0;
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case "ONLINE":
        return palette.green[50];
      case "AWAY":
      case "RECONNECTING":
        return palette.yellow[50];
      case "OFFLINE":
        return theme.label.assistive;
      default:
        return theme.label.alternative;
    }
  }};
`;

export const UsingAppText = styled.p`
  ${font.caption.regular};
  color: ${({ theme }) => theme.label.alternative};
`;

export const PlayTime = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  ${font.headline1.bold}
  color: ${({ theme }) => theme.label.normal};
  flex: 0 0 auto;
  min-width: 0;
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.alternative};
`;

export const DefaultBattleBox = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const DefaultBattleText = styled.p`
  ${font.label.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

type StatusProps = { $status: UserStatus };

export const ActiveTime = styled.p<StatusProps>`
  ${font.headline1.bold};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case "ONLINE":
        return theme.label.normal;
      case "AWAY":
      case "RECONNECTING":
        return theme.label.assistive;
      case "OFFLINE":
        return theme.line.normal;
    }
  }};
`;

export const UsingBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export const DetailArrowIcon = styled(DetailArrow)`
  width: 0.5rem;
  height: 1rem;
`;

export const ArrowBox = styled.button`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
`;

export const RankTierWrap = styled.div`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`;
