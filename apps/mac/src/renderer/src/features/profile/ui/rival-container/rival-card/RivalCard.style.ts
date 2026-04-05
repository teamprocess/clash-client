import styled from "styled-components";
import type { UserStatus } from "@/features/competition/model/useMyRivals";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";

export const RivalBox = styled.div`
  width: 100%;
  height: 100%;
  min-height: clamp(4.35rem, 8.2vh, 5.25rem);
  max-height: 100%;
  flex: 0 0 auto;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.background.alternative};
  padding: clamp(0.7rem, 1.4vh, 0.875rem) clamp(1rem, 2vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.875rem;

  @media (max-width: 52rem) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.75rem;
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.425rem;
  flex: 1 1 auto;
  min-width: 0;

  @media (max-width: 52rem) {
    width: 100%;
  }
`;

export const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const RivalAvatar = styled(ProfileAvatar)`
  width: 2.5rem;
  height: 2.5rem;
`;

export const NameStatus = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1 1 auto;
  min-width: 0;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Name = styled.p`
  ${font.body.bold}
  color: ${({ theme }) => theme.label.neutral};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserName = styled.p`
  ${font.caption.bold}
  color: ${({ theme }) => theme.label.assistive};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StatusBadge = styled.span<{ $status: UserStatus }>`
  ${font.caption.medium}
  line-height: 1.1;
  padding: 0.16rem 0.42rem;
  border-radius: 0.55rem;
  white-space: nowrap;
  flex-shrink: 0;

  ${({ $status, theme }) => {
    if ($status === "ONLINE")
      return `
    background: ${palette.green[50]};
    color: ${palette.neutral[5]};
  `;

    if ($status === "OFFLINE")
      return `
    background: ${theme.label.assistive};
    color: ${theme.background.alternative};
  `;

    return `
    background: ${palette.yellow[50]};
    color: ${palette.neutral[5]};
  `;
  }}
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
  flex: 0 1 10.5rem;
  min-width: 8rem;

  @media (max-width: 52rem) {
    width: 100%;
    min-width: 0;
    align-items: flex-start;
  }
`;

export const AppRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.375rem;
  width: 100%;
  min-width: 0;

  @media (max-width: 52rem) {
    justify-content: flex-start;
  }
`;

export const AppName = styled.p`
  ${font.caption.regular}
  color: ${({ theme }) => theme.label.neutral};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Time = styled.p`
  ${font.title2.bold}
  color: ${({ theme }) => theme.label.neutral};
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;

  @media (max-width: 52rem) {
    text-align: left;
  }
`;

export const RankTierWrap = styled.div`
  width: 2rem;
  height: 2rem;
`;
