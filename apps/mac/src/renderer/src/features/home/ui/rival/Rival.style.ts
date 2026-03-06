import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import DetailArrow from "../../assets/home/front.svg";
import { palette } from "@clash/design-tokens/theme";
import VSCode from "@/shared/ui/assets/ide-vscode.svg";
import InteliJ from "@/shared/ui/assets/ide-intellij-idea.svg";
import WebStorm from "@/shared/ui/assets/ide-webstorm.svg";
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

const ideIconStyle = css`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
`;

export const RivalContainer = styled.div`
  ${flexCol};
  padding: 1.5rem;
  gap: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const TitleBox = styled.div`
  width: 100%;
  ${flexRow};
  justify-content: space-between;
  align-items: center;
`;

export const TitleLeft = styled.div`
  ${flexRow};
  align-items: center;
  gap: 1rem;
`;

export const Title = styled.div`
  ${font.title2.bold}
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

export const DetailArrowIcon = styled(DetailArrow)`
  width: 0.5rem;
  height: 1rem;
`;

export const RivalBox = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.background.alternative};
  padding: 1rem 0.75rem;
  ${flexCol};
  justify-content: flex-start;
  gap: 1rem;
`;

export const AddRivalButton = styled.button`
  width: 100%;
  height: 100%;
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
`;

export const ProfileContent = styled.div`
  ${flexRow};
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  width: 100%;
`;

export const ProfileIcon = styled(Profile)`
  width: 2.25rem;
  height: 2.25rem;
`;

export const NameBox = styled.div`
  ${flexRow};
  align-items: center;
  gap: 0.25rem;
`;

export const ProfileName = styled.p`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const ProfileMention = styled.p`
  ${font.label.regular}
  color: ${({ theme }) => theme.label.alternative};
  cursor: pointer;
  display: block;
  min-width: 0;
  overflow: hidden;

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
`;

type StatusProps = {
  $status: "ONLINE" | "AWAY" | "OFFLINE";
};

const statusWidth = ($status: StatusProps["$status"]) => {
  switch ($status) {
    case "ONLINE":
      return "4rem";
    case "AWAY":
    case "OFFLINE":
      return "4.5rem";
  }
};

export const Status = styled.div<StatusProps>`
  ${font.caption.bold};
  ${flexRow};
  justify-content: center;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 0.5rem;
  color: ${palette.neutral[5]};

  width: ${({ $status }) => statusWidth($status)};

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

export const UsingAppContainer = styled.div`
  ${flexRow};
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 100%;
  flex: 1;
`;

export const ActiveBox = styled.div`
  ${flexCol};
  align-items: center;
`;

export const IdeIcons = {
  INTELLIJ_IDEA: styled(InteliJ)`
    ${ideIconStyle}
  `,
  WEBSTORM: styled(WebStorm)`
    ${ideIconStyle}
  `,
  VSCODE: styled(VSCode)`
    ${ideIconStyle}
  `,
} as const;

export const UsingAppText = styled.p`
  ${font.caption.regular};
  color: ${({ theme }) => theme.label.neutral};
`;

export const ActiveTime = styled.p<StatusProps>`
  ${font.title1.bold};
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
`;

export const AddRivalBox = styled.div`
  ${flexCol};
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  gap: 0.75rem;
`;

export const AddRivalText = styled.p`
  ${font.caption.regular};
  color: ${({ theme }) => theme.label.neutral};
`;

export const PlusIcon = styled(Plus)``;
