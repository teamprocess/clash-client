import styled from "styled-components";
import { font } from "@/shared/config/font";

export const RivalList = styled.div`
  width: 24.875rem;
  margin-top: 7.25rem;
  flex-direction: column;
  display: flex;
  gap: 1.25rem;
  margin-right: auto;
  align-self: flex-start;
  margin-left: 0;
`;

export const RivalBox = styled.div`
  width: 100%;
  height: 5.625rem;
  background: ${({ theme }) => theme.background.alternative};
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  gap: 4.5rem;
  align-items: center;
  justify-content: center;
`;

export const RivalProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

export const NameText = styled.span`
  ${font.body.bold};
  color: ${({ theme }) => theme.label.neutral};
`;

export const RivalInfo = styled.span`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const Timer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Vscode = styled.span`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const VscodeImg = styled.img`
  width: 0.75rem;
  height: 0.75rem;
`;

export const VscodeText = styled.span`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.label.neutral};
`;

export const TimeText = styled.span`
  ${font.title2.bold};
  color: ${({ theme }) => theme.label.neutral};
`;

export const AddRivalBox = styled.button`
  width: 21rem;
  height: 2.75rem;
  background: ${({ theme }) => theme.background.alternative};
  border: none;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.alternative};

  &:hover {
    filter: brightness(1.1);
  }
`;
