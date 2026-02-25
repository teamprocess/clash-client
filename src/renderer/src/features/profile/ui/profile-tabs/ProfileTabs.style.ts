import styled from "styled-components";

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  width: 43.25rem;
  margin-left: 0;
  margin-top: 3.125rem;
  align-items: stretch;
  flex: 0 0 43.25rem;
  min-width: 0;
`;

export const Background = styled.div`
  width: 100%;
  height: 26.25rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.alternative};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow: hidden;
  gap: 0.5rem;
`;
