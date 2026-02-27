import styled from "styled-components";
import type { UserStatus } from "@/features/competition/model/useMyRivals";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const RivalBox = styled.section`
  width: 100%;
  height: 5.625rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.background.alternative};
  padding: 0.875rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  min-width: 0;
`;

export const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
`;

export const NameStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
`;

export const Name = styled.p`
  ${font.body.bold}
  color: ${({ theme }) => theme.label.neutral};
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

export const AppIcon = styled.img`
  width: 0.875rem;
  height: 0.875rem;
  object-fit: contain;
`;

export const AppName = styled.p`
  ${font.caption.regular}
  color: ${({ theme }) => theme.label.neutral};
`;

export const Time = styled.p`
  ${font.title2.bold}
  color: ${({ theme }) => theme.label.neutral};
`;
