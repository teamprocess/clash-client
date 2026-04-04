import styled, { css } from "styled-components";

const skeleton = css`
  background-color: ${({ theme }) => theme.fill.neutral};
`;

export const LoadingContainer = styled.div<{ $variant: "main" | "products" }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: ${({ $variant }) => ($variant === "main" ? "0" : "1.5rem")};
  gap: 1.5rem;
  overflow: hidden;
`;

export const BannerSkeleton = styled.div`
  ${skeleton};
  width: 100%;
  aspect-ratio: 74.5 / 15;
  border-radius: 1rem;
`;

export const SectionSkeleton = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 1.5rem;
`;

export const TitleSkeleton = styled.div<{ $width: string }>`
  ${skeleton};
  width: ${({ $width }) => $width};
  height: 1.75rem;
  border-radius: 0.5rem;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13.5rem, 1fr));
  gap: 1rem;
`;

export const ProductCardSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.625rem;
  width: 100%;
  height: 13.75rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  box-sizing: border-box;
`;

export const ImageSkeleton = styled.div`
  ${skeleton};
  flex: 1;
  width: 100%;
  border-radius: 0.25rem;
`;

export const InfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const TextSkeleton = styled.div<{ $width: string; $height?: string }>`
  ${skeleton};
  width: ${({ $width }) => $width};
  height: ${({ $height = "1rem" }) => $height};
  border-radius: 0.375rem;
`;
