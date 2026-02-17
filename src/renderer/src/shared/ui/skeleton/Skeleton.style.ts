import styled from "styled-components";

export const SkeletonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const SkeletonBox = styled.div<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}%;
  height: ${({ $height }) => $height}%;
`;
