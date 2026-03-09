import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import DetailArrow from "../../assets/home/front.svg";
import { palette } from "@clash/design-tokens/theme";
import Profile from "../../assets/home/profile.svg";
import Plus from "../../assets/home/plus.svg";

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const RivalContainer = styled.div`
  ${flexCol};
  padding: 1.5rem;
  gap: 1rem;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};

  @media (max-width: 1024px) {
    padding: 1.25rem;
  }

  @media (max-width: 48rem) {
    padding: 1rem;
  }
`;

export const TitleBox = styled.div`
  width: 100%;
  ${flexRow};
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;

  @media (max-width: 48rem) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const TitleLeft = styled.div`
  ${flexRow};
  align-items: center;
  gap: 1rem;
  min-width: 0;
`;

export const Title = styled.div`
  ${font.title2.bold};
  min-width: 0;
`;

export const ArrowBox = styled.button`
  ${font.label.medium};
  color: ${({ theme }) => theme.label.alternative};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
`;

export const DetailArrowIcon = styled(DetailArrow)`
  width: 0.5rem;
  height: 1rem;
`;

export const RivalBox = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(0, 1fr);
  gap: 1rem;

  > * {
    min-width: 0;
    min-height: 0;
  }

  @media (max-width: 48rem) {
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: minmax(9rem, auto);
  }
`;

export const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.background.alternative};
  padding: 1rem;
  ${flexCol};
  justify-content: flex-start;

  @media (max-width: 48rem) {
    padding: 0.875rem;
  }
`;

export const AddRivalButton = styled.button`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.background.alternative};
  padding: 1rem 0.75rem;
  ${flexCol};
  justify-content: flex-start;
  gap: 1rem;

  border: 0;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary.normal};
    outline-offset: 2px;
  }

  @media (max-width: 48rem) {
    padding: 0.875rem 0.75rem;
  }
`;

export const ProfileContent = styled.div`
  ${flexRow};
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
`;

export const ProfileIcon = styled(Profile)`
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
`;

export const NameBox = styled.div`
  ${flexRow};
  align-items: center;
  gap: 0.25rem;
  min-width: 0;
`;

export const ProfileName = styled.p`
  ${font.headline2.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const ProfileMention = styled.p`
  ${font.label.regular};
  color: ${({ theme }) => theme.label.alternative};
  cursor: pointer;
  display: block;
  min-width: 0;
  overflow: hidden;
  flex: 1;

  > span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ProfileBox = styled.div`
  ${flexRow};
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
`;

type StatusProps = {
  $status: "ONLINE" | "AWAY" | "OFFLINE";
};

export const Status = styled.div<StatusProps>`
  ${font.caption.bold};
  ${flexRow};
  justify-content: center;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 0.5rem;
  color: ${palette.neutral[5]};
  flex-shrink: 0;
  white-space: nowrap;

  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case "ONLINE":
        return palette.green[50];
      case "AWAY":
        return palette.yellow[50];
      case "OFFLINE":
        return theme.label.assistive;
    }
  }};
`;

export const ActiveBox = styled.div`
  ${flexCol};
  flex: 1;
  width: 100%;
  min-height: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const UsingAppContainer = styled.div`
  ${flexRow};
  align-items: center;
  justify-content: center;
  gap: clamp(0.25rem, 0.8vw, 0.5rem);
  width: 100%;
  flex-wrap: wrap;
`;

export const UsingAppText = styled.p`
  ${font.caption.regular};
  color: ${({ theme }) => theme.label.neutral};
  text-align: center;
  word-break: keep-all;
`;

export const ActiveTime = styled.p<StatusProps>`
  ${font.title1.bold};
  text-align: center;
  color: ${({ theme, $status }) => {
    switch ($status) {
      case "ONLINE":
        return theme.label.normal;
      case "AWAY":
        return theme.label.assistive;
      case "OFFLINE":
        return theme.line.normal;
    }
  }};
`;

export const RightSIde = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 48rem) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const AddRivalBox = styled.div`
  ${flexCol};
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  gap: 0.75rem;
  min-height: 0;
`;

export const AddRivalText = styled.p`
  ${font.caption.regular};
  color: ${({ theme }) => theme.label.neutral};
  text-align: center;
  word-break: keep-all;
`;

export const PlusIcon = styled(Plus)`
  flex-shrink: 0;
`;
