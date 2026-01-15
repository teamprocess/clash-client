import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 74.5rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const BannerImage = styled.div<{ $imgUrl: string }>`
  width: 100%;
  height: 15rem;
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-repeat: no-repeat;
  border-radius: 0.75rem 0.75rem 0 0;
`;
