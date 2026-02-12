import styled from "styled-components";
import { font } from "@/shared/config/font";
import Web from "../../assets/web.svg";
import App from "../../assets/app.svg";
import Server from "../../assets/server.svg";
import Ai from "../../assets/ai.svg";
import Game from "../../assets/game.svg";

export const WebIcon = styled(Web)`
  width: 5rem;
`;

export const AppIcon = styled(App)`
  width: 5rem;
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

export const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
`;

export const ChoiceContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.25rem;
`;

export const ChoiceContentsTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

export const ChoiceTitle = styled.h1`
  ${font.display1.bold};
  color: ${({ theme }) => theme.label.normal};
`;

export const ChoiceDescription = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${font.body.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

export const ChoiceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 26rem;
  height: 13rem;
`;
