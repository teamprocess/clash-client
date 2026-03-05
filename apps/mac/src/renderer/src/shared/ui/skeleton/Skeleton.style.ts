import styled from "styled-components";

export const SkeletonContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  gap: 1rem;
`;

export const SkeletonBox = styled.div<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}%;
  height: ${({ $height }) => $height}%;
  background-color: ${({ theme }) => theme.fill.neutral};
  border-radius: 0.5rem;
`;
