import styled from "styled-components";
import { font } from "@/shared/config/font";
import CompleteIcon from "../assets/complete.svg";
import Lock from "../assets/lock.svg";
import Roadmap from "../assets/roadmap.svg";
import FirstFrameIcon from "../assets/first-frame.svg";
import SecondFrameIcon from "../assets/second-frame.svg";
import ThirdFrameIcon from "../assets/third-frame.svg";
import { palette } from "@/shared/config/theme";

export const RoadmapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const RoadmapScrollable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* 스크롤바 배경(길) */
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal}; /* 스크롤바 핸들 */
    border-radius: 10px;
  }
`;

export const SectionItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 35rem;
  margin-left: 36rem;
`;

export const SectionItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100%;
`;

export const SectionItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const SectionIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  background: ${({ theme }) => theme.label.disable};
  border-radius: 50%;
  position: relative;
`;

export const SectionIcon = styled.img``;

export const SectionComplete = styled(CompleteIcon)`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

export const SectionLock = styled(Lock)`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

export const SectionTitle = styled.span`
  ${font.headline2.medium};
  font-size: 1rem;
  color: ${({ theme }) => theme.label.assistive};
`;

export const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1.8rem;
  background: ${({ theme }) => theme.background.normal};
  box-shadow: 0 0 7px 0 ${({ theme }) => theme.line.neutral};
  border-radius: 1.25rem;
  position: absolute;
  top: 3rem;
  left: 3rem;
  width: 16rem;
  height: 39rem;
  z-index: 100;
  padding: 1.6rem 0 0.8rem;
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

export const CompletedChapterCount = styled.span<{ $countColor }>`
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

export const RankerUserProfile = styled.img`
  width: 100%;
  z-index: 1000;
`;

export const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-height: 22rem;
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
  color: ${({ theme }) => theme.label.neutral};);
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

export const MyRankingItem = styled.div<{ $position: "top" | "bottom" }>`
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

  ${({ $position }) => ($position === "top" ? `top: 15rem;` : `bottom: 1.45rem;`)}

  background: ${({ theme }) => theme.fill.neutral};
  border-radius: 0.5rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
`;

export const SectionProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70rem;
  height: 3rem;
  padding: 0.75rem 3rem;
  background-color: ${({ theme }) => theme.background.alternative};
  border-radius: 0.5rem;
  position: absolute;
  bottom: 2rem;
  left: 3rem;
  z-index: 110;
`;

export const ProgressInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;

export const RoadmapIcon = styled(Roadmap)`
  width: 1rem;
`;

export const StepCount = styled.span`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
`;

export const BarBackground = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 24rem;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.label.assistive};
  border-radius: 0.75rem;
`;

export const BarActive = styled.div<{ $fill: number }>`
  width: ${({ $fill }) => $fill}%;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: 0.75rem;
`;

export const PercentText = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.assistive};
`;
