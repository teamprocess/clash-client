import styled from "styled-components";
import { font } from "@/shared/config/font";
import Profile from "../../assets/profile.svg";
import DetailArrow from "../../assets/front.svg";
import { palette } from "@/shared/config/theme";
import VSCode from "../../assets/vscode.svg";

// Rival styles
export const RivalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

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

export const ArrowBox = styled.div`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
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

// MyRivalUsers styles
export const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.background.alternative};
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;

export const ProfileIcon = styled(Profile)`
  width: 2.25rem;
  height: 2.25rem;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: row;
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
`;

export const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// 상태
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

export const UsingAppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 100%;
  flex: 1;
`;

export const ActiveBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UsingApp = styled(VSCode)``;

export const UsingAppText = styled.p`
  ${font.caption.regular};
  color: ${({ theme }) => theme.label.neutral};
`;

export const ActiveTime = styled.p<StatusProps>`
  ${font.title1.bold};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case "ONLINE":
        return theme.primary.normal;
      case "AWAY":
        return theme.label.neutral;
      case "OFFLINE":
        return theme.label.assistive;
    }
  }};
`;
