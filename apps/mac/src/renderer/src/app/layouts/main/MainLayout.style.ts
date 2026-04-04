import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2.5rem 2.5rem 2.5rem 2.5rem;
  overflow: auto;
  scrollbar-gutter: stable;
  background-color: ${({ theme }) => theme.background.alternative};
`;
