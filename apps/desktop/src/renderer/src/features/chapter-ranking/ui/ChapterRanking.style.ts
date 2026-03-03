import styled from "styled-components";
import { font } from "@/shared/config/font";
import FirstFrameIcon from "../assets/first-frame.svg";
import SecondFrameIcon from "../assets/second-frame.svg";
import ThirdFrameIcon from "../assets/third-frame.svg";
import { palette } from "@/shared/config/theme";

export type RankingPageEnum = "section" | "chapter";
export type RankingPositionEnum = "top" | "bottom";

export const RankingContainer = styled.div<{ $page: RankingPageEnum }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ $page }) => ($page === "section" ? "1.8rem" : $page === "chapter" ? "1.4rem" : 0)};
  background: ${({ theme }) => theme.background.normal};
  box-shadow: 0 0 7px 0 ${({ theme }) => theme.line.neutral};
  border-radius: 1.25rem;
  position: absolute;
  top: ${({ $page }) => ($page === "section" ? "3rem" : $page === "chapter" ? "5.45rem" : 0)};
  left: 3rem;
  width: 16rem;
  z-index: 100;
  padding: 1.6rem 0 1rem;
`;

export const RankingLabel = styled.span`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.neutral};
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
`;

export const RankingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

export const RankingTop3Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0.5rem;
`;

export const RankerBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Top3RankerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.2rem;
  height: 8.5rem;
  position: relative;
`;

export const RankFrameWrapper = styled.div<{ $rank: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 5rem;
  margin-bottom: ${({ $rank }) => ($rank === 1 ? "0.5rem" : "0")};
`;

export const FirstFrame = styled(FirstFrameIcon)`
  position: absolute;
  width: 100%;
  z-index: 200;
`;

export const SecondFrame = styled(SecondFrameIcon)`
  position: absolute;
  width: 100%;
  z-index: 200;
`;

export const ThirdFrame = styled(ThirdFrameIcon)`
  position: absolute;
  width: 100%;
  z-index: 200;
`;
export const Top3ProfileImage = styled.img<{ $isFirst: boolean }>`
  width: 100%;
  height: ${({ $isFirst }) => ($isFirst ? "3.5rem" : "58%")};
  border-radius: 50%;
  position: absolute;
  top: ${({ $isFirst }) => ($isFirst ? "0.5rem" : "0.8rem")};
  z-index: 150;
`;

export const RankerName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  ${font.label.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const RankerUserChapterLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.1rem;
  ${font.caption.regular};
  color: ${({ theme }) => theme.label.assistive};
`;

export const CompletedChapterCount = styled.span<{ $countColor: number }>`
  ${font.label.bold};
  color: ${({ $countColor }) =>
    $countColor === 1
      ? palette.yellow["50"]
      : $countColor === 2
        ? palette.blue["80"]
        : $countColor === 3
          ? palette.red["70"]
          : "red"};
`;

export const RankingList = styled.div<{ $page: RankingPageEnum }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-height: ${({ $page }) => ($page === "section" ? "22rem" : $page === "chapter" ? "20rem" : 0)};
  overflow-y: auto;
  padding-left: 8px;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal}; /* 스크롤바 핸들 */
    border-radius: 10px;
  }
`;

export const RankingItem = styled.div<{ $isMe?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  flex-shrink: 0;
  background-color: ${({ $isMe, theme }) => ($isMe ? theme.fill.neutral : "transparent")};
  border-radius: ${({ $isMe }) => ($isMe ? "0.5rem" : "0")};
`;

export const ItemLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Ranking = styled.span`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.neutral};
  text-align: center;
  width: 1.25rem;
`;

export const UserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const RankingUserProfile = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
`;

export const RankingUsername = styled.span`
  ${font.label.medium};
  color: ${({ theme }) => theme.label.alternative};
  )text-align: center;
`;

export const RankingChapter = styled.span`
  ${font.label.medium};
  color: ${({ theme }) => theme.primary.normal};
  text-align: center;
`;

export const ItemRight = styled.div`
  ${font.caption.regular};
  color: ${({ theme }) => theme.label.assistive};
  text-align: center;
`;

export const MyRankingItem = styled.div<{ $position: RankingPositionEnum; $page: RankingPageEnum }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 16px);
  height: 3rem;
  padding: 0.25rem 1rem;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 120;
  ${({ $position, $page }) => {
    if ($position === "top") {
      return `
      top: ${$page === "section" ? "15.5rem" : "14.8rem"};
    `;
    }
    return `
    bottom: ${$page === "section" ? "0.8rem" : "1rem"};
  `;
  }}

  background: ${({ theme }) => theme.fill.neutral};
  border-radius: 0.5rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
`;
