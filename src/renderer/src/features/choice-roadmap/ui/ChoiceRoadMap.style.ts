import styled from "styled-components";
import { palette } from "@/shared/config/theme";
import { font } from "@/shared/config/font";
import Web from "../assets/web.svg";
import App from "../assets/app.svg";
import Server from "../assets/server.svg";
import Ai from "../assets/ai.svg";
import Game from "../assets/game.svg";
import Check from "../assets/check.svg";
import NotCheck from "../assets/notCheck.svg";

export const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  width: 26rem;
`;

export const ChoiceBox = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 0.75rem;
  box-shadow: 0 0 6px 0
    ${({ $isSelected, theme }) => ($isSelected ? theme.primary.normal : theme.line.normal)};
  width: 9.75rem;
  height: 9.5rem;
  cursor: pointer;
`;

export const ChoiceItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
  width: 7.375rem;
`;

export const CheckedIcon = styled(Check)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
`;

export const NotCheckedIcon = styled(NotCheck)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
`;

export const WebIcon = styled(Web)`
  width: 5rem;
`;

export const AppIcon = styled(App)`
  height: 5rem;
`;

export const ServerIcon = styled(Server)`
  width: 5rem;
`;

export const AiIcon = styled(Ai)`
  width: 5rem;
`;

export const GameIcon = styled(Game)`
  width: 5rem;
`;

export const ChoiceText = styled.span`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const RoadMapButton = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32rem;
  height: 3.25rem;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.line.normal : theme.primary.normal};
  ${font.headline1.medium};
  color: ${palette.neutral["97"]};
  border-radius: 1rem;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

export const ChoiceTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

export const ChoiceBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;
