import styled from "styled-components";
import { font } from "@/shared/config/font";

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

export const RivalCompareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  height: 100%;
  max-height: 21rem;
`;

export const DropDownBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

export const EmptyText = styled.p`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;
