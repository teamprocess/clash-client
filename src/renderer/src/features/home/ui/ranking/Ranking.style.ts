import styled from "styled-components";
import { font } from "@/shared/config/font";
import Arrow from "../../assets/home/arrow.svg";

export const RankingContainer = styled.div`
  position: relative;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
  display: flex;
  flex-direction: column;
`;

// 상단 타이틀 박스
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

// 드랍다운
export const DropDown = styled.div`
  width: 15rem;
  height: 100%;
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

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

// 경계선
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
  margin: 0.75rem;
`;

// 유저정보 및 랭킹 내용 => 또 다른 함수형으로 제작함
export const UserWrapper = styled.div`
  width: 100%;
  height: 16rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-width: none;
`;

export const StickyUser = styled.div<{ $position: "top" | "bottom" }>`
  position: absolute;
  left: 2.5%;
  ${({ $position }) => ($position === "top" ? `top: 3.75rem;` : `bottom: 0;`)}
  z-index: 50;
  background: ${({ theme }) => theme.fill.neutral};
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 95%;
  margin: 1rem 0;
`;
