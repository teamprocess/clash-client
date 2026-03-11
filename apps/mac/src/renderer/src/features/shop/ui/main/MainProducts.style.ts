import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const BannerImage = styled.div`
  width: 100%;
  aspect-ratio: 74.5 / 15;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.22), transparent 32%),
    linear-gradient(120deg, #1f6b5c 0%, #2d8a72 45%, #c0e36f 100%);
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
