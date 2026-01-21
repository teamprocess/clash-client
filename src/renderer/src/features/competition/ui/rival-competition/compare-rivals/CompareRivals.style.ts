import styled from "styled-components";
import { font } from "@/shared/config/font";
import Arrow from "@/features/home/assets/home/arrow.svg";

export const GaroLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const Content = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.p`
  ${font.title2.bold}
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
  width: 100%;
  display: flex;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.background.alternative};
  border-radius: 0.5rem;
  position: relative;
`;

export const Svg = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
`;

export const LineGroup = styled.g``;

export const LinePath = styled.path<{ $isMe?: boolean }>`
  fill: none;
  stroke-width: ${({ $isMe }) => ($isMe ? 0.5 : 0.5)};
  opacity: ${({ $isMe }) => ($isMe ? 1 : 1)};
  transition: 0.2s;
`;

export const Dot = styled.circle<{ $isMe?: boolean }>`
  r: ${({ $isMe }) => ($isMe ? 2.5 : 2.5)};
  cursor: pointer;
`;

export const ScrollArea = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
`;

export const GraphInner = styled.div`
  width: max-content;
  min-width: 100%;
  padding-bottom: 0.5rem;
`;
