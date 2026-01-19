import styled from "styled-components";
import { font } from "@/shared/config/font";
import Profile from "@/features/home/assets/home/profile.svg";
import { palette } from "@/shared/config/theme";
import Arrow from "@/features/home/assets/home/arrow.svg";

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const Point = styled.p`
  height: 100%;
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

export const CompareContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

export const ListContent = styled.div`
  padding: 1.5rem;
  width: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const Content = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const RivalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Title = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${font.title2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  gap: 0.5rem;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
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
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const ProfileMention = styled.p`
  ${font.label.regular}
  color: ${({ theme }) => theme.label.alternative};
`;

type StatusProps = {
  $status: "ONLINE" | "AWAY" | "OFFLINE";
};

export const Status = styled.div<StatusProps>`
  ${font.caption.bold};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 0.5rem;
  color: ${palette.neutral[5]};
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case "ONLINE":
        return palette.green[50];
      case "AWAY":
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

export const PlayTime = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  ${font.headline1.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
`;

//드랍다운
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

// 작동안되는 option 메소드 (브라우저에서 방해)
export const Option = styled.option`
  ${font.body.regular};
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const RivalCompareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

export const DropDownBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
`;

export const GraphBox = styled.div`
  padding: 1rem 1rem;
  height: 18rem;
  max-width: 33.75rem;
  display: flex;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.background.alternative};
  border-radius: 0.5rem;
`;

export const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 3rem;
  overflow-x: auto;
  scrollbar-width: none;
`;

export const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  gap: 0.5rem;
  flex: 1;
`;

export const Bar = styled.div<{ $ratio: number }>`
  display: flex;
  justify-content: center;
  width: 1.5rem;
  height: ${({ $ratio }) => `calc(${$ratio * 90}%)`};
  min-height: 4px;
  border-radius: 0.25rem 0.25rem 0 0;
  position: relative;
  &:hover ${() => BarValue} {
    opacity: 1;
    visibility: visible;
    transform: translate(0, -50%);
  }
`;

export const ValueHoverBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const BarValue = styled.p`
  ${font.caption.bold}
  color: ${({ theme }) => theme.label.normal};
  background-color: ${({ theme }) => theme.fill.alternative};
  padding: 0.125rem 0.4rem;
  border-radius: 0.25rem;
  z-index: 1000;
  white-space: nowrap;
  margin-top: 1.75rem;

  position: absolute;
  visibility: hidden;
  opacity: 0;
  transform: translate(-0.25rem, 50%);
  pointer-events: none;
`;

export const BallValue = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background: ${palette.blue[40]};
  border-radius: 999px;
  cursor: pointer;
  z-index: 2;
`;

export const BarLabel = styled.p`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.normal};
`;
