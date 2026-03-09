import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const GaroLine = styled.div`
  width: 100%;
  height: 1px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};

  @media (max-height: 56.25rem) {
    height: clamp(16rem, 35vh, 24rem);
  }

  @media (max-height: 48rem) {
    height: clamp(14rem, 32vh, 20rem);
  }
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;

  @media (max-width: 48rem) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Title = styled.p`
  ${font.title2.bold};
  min-width: 0;
  color: ${({ theme }) => theme.label.normal};
`;

export const RivalCompareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
`;

export const DropDownBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  flex-wrap: wrap;

  @media (max-width: 48rem) {
    width: 100%;
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 0;
  position: relative;
  flex: 1;

  @media (max-height: 56.25rem) {
    flex: none;
    height: clamp(10rem, 28vh, 13rem);
  }

  @media (max-height: 48rem) {
    height: clamp(9rem, 24vh, 12rem);
  }
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  min-height: 12rem;
  height: 100%;
  background-color: ${({ theme }) => theme.background.alternative};

  @media (max-width: 48rem) {
    padding: 1rem;
  }
`;

export const DefaultBattleBox = styled.div`
  display: flex;
  height: 100%;
  min-height: 10rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const DefaultBattleText = styled.p`
  ${font.label.medium};
  text-align: center;
  color: ${({ theme }) => theme.label.assistive};
`;
