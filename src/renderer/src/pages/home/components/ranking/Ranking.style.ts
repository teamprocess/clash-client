import styled from "styled-components";
import { font } from "@/shared/config/font";
import SvgArrow from "../../assets/arrow.svg";
import Profile from "../../assets/profile.svg";
import { palette } from "@/shared/config/theme";

export const RankingContainer = styled.div`
  position: relative;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};

  display: flex;
  flex-direction: column;
`;

// 상단 타이틀 박스
export const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  ${font.title2.bold}
`;

// 드랍다운

export const DropDownBox = styled.div`
  width: 15rem;
  height: 100%;
  gap: 0.5rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ArrowIcon = styled(SvgArrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const Select = styled.select`
  ${font.body.regular};
  width: 7.5rem;
  height: 2rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.fill.neutral};
  color: ${({ theme }) => theme.label.normal};
  border: none;

  appearance: none;
  cursor: pointer;

  background-image: url(${ArrowIcon});
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 0.75rem;

  &:focus {
    outline: none;
  }
`;

// 경계선
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
  margin: 0.75rem;
`;

// 유저정보 및 랭킹 내용 => 또 다른 함수형으로 제작함
export const UserWrapper = styled.div`
  width: 100%;
  height: 16rem;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

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

  //이 밑은 순위별 휘장변화 입니다.
  // 배경 변화
  background-color: ${({ $rank }) =>
    $rank === 1
      ? palette.yellow[50]
      : $rank === 2
        ? palette.blue[80]
        : $rank === 3
          ? palette.yellow[30]
          : "transparent"};

  // 글색 변화
  color: ${({ $rank, theme }) => {
    if ($rank <= 3) {
      return theme.background.normal;
    } else {
      return theme.label.normal;
    }
  }};

  // 테두리
  border: ${({ $rank, theme }) => {
    if ($rank <= 3) {
      return `1px solid ${theme.line.neutral}`;
    }
    return "1px solid transparent";
  }};
`;

export const Point = styled.div`
  ${font.headline2.medium}
`;

export const StickyUser = styled.div<{ $position: "top" | "bottom" }>`
  position: absolute;
  left: 2.5%;

  ${({ $position }) => ($position === "top" ? `top: 3.75rem;` : `bottom: 0;`)}

  z-index: 50;

  background: ${({ theme }) => theme.fill.neutral};
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  width: 95%;
  margin: 1rem 0;
`;
