import styled from "styled-components";
import type { UserStatus } from "@/features/competition/model/useMyRivals";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";

export const RivalBox = styled.div`
  width: 100%;
  min-height: 5.25rem;
  max-height: 100%;
  flex: 1;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.background.alternative};
  padding: 0.875rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.425rem;
  min-width: 0;
`;

export const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const NameStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
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
  ${font.caption.bold}
  padding: 0.25rem 0.5rem;
  border-radius: 0.625rem;

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
  min-width: 0;
`;

export const AppRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
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
`;

export const RankTierWrap = styled.div`
  width: 2rem;
  height: 2rem;
`;
