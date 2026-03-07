import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import CompleteIcon from "../assets/complete.svg";
import Lock from "../assets/lock.svg";

export const SectionItemBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
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

export const SectionIconWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  background: ${({ theme }) => theme.line.neutral};
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.label.disable};
  }
`;

export const SectionIcon = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  flex-shrink: 0;
`;

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
