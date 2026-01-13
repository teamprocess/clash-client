import styled from "styled-components";
import Profile from "@/features/home/assets/home/profile.svg";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const UserContainer = styled.div<{ $sticky?: boolean }>`
  padding: 0.5rem;
  width: 100%;
  height: 3.75rem;
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
  justify-content: center;
  gap: 0.5rem;
`;

export const ProfileIcon = styled(Profile)`
  width: 2rem;
  height: 2rem;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.125rem;
`;

export const ProfileName = styled.p`
  ${font.body.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const ProfileMention = styled.p`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const RivalMention = styled.div`
  ${font.caption.medium}
  color: ${palette.neutral[97]};
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.primary.normal};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
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
`;
