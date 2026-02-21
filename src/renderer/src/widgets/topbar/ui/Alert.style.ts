import styled from "styled-components";
import { font } from "@/shared/config/font";
import Alarm from "../assets/alarm.svg";
import AlarmOn from "../assets/alarm-on.svg";
import Profile from "../assets/profile.svg";
import Close from "../assets/no.svg";
import Search from "../assets/search.svg";
import Cry from "@/shared/ui/assets/cry-emoji.svg";
import Confirm from "../assets/confirm.svg";
import Deny from "../assets/deny.svg";
import Trash from "../assets/delete.svg";

export const AlertTriggerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AlertButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  margin-left: 0.75rem;
  cursor: pointer;
`;

export const AlertIcon = styled(Alarm)`
  color: ${({ theme }) => theme.label.alternative};
  width: 1.5rem;
  height: 1.5rem;
`;

export const AlertOnIcon = styled(AlarmOn)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const AlertPanel = styled.div`
  width: 22rem;
  padding: 1.5rem;
  border-radius: 2rem;
  min-height: 16rem;
  max-height: 32rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.label.disable};
`;

export const AlertHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AlertTitle = styled.p`
  ${font.title2.medium}
`;

export const CloseIcon = styled(Close)``;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top: 1rem;
  gap: 0.75rem;
`;

export const SearchUsers = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: 0.5rem 3.5rem 0.5rem 1rem;
  border-radius: 0.75rem;
  border: none;
  background-color: ${({ theme }) => theme.fill.alternative};
  ${font.body.medium}
  color: ${({ theme }) => theme.label.neutral};

  &::placeholder {
    color: ${({ theme }) => theme.label.assistive};
  }

  &:focus {
    outline: none;
  }
`;

export const SearchIconBox = styled.div`
  color: ${({ theme }) => theme.label.neutral};
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  right: 1rem;
  top: 43%;
  transform: translateY(-50%);
  width: 1.85rem;
  height: 1.85rem;
  pointer-events: none;
`;

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  overflow-y: auto;
  margin-top: 0.75rem;
`;

export const AlertBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
`;

export const AlertProfileIcon = styled(Profile)``;

export const AlertTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 11rem;
`;

export const NameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export const AlertName = styled.p`
  ${font.headline2.medium}
`;

export const Mention = styled.p`
  ${font.label.regular};
  color: ${({ theme }) => theme.label.assistive};
`;

export const Explain = styled.p`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const NoneAlert = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
  gap: 0.75rem;
  color: ${({ theme }) => theme.label.assistive};
`;

export const CryIcon = styled(Cry)`
  width: 12rem;
`;

export const ChoiceBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  flex: 1;
  gap: 0.75rem;
`;

export const ChoiceButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export const ConfirmIcon = styled(Confirm)``;
export const DenyIcon = styled(Deny)``;
export const TrashIcon = styled(Trash)``;
