import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const BannerImage = styled.div<{ $imgUrl: string }>`
  width: 100%;
  aspect-ratio: 74.5 / 15;
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-size: cover;
  background-position: center;
  border-radius: 0.75rem 0.75rem 0 0;
`;
