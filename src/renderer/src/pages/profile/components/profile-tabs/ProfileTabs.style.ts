import styled from "styled-components";

export const Background = styled.div`
  width: 43.25rem;
  height: 26.25rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.alternative};
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  margin-left: auto;
  align-items: center;
  margin-top: 3.125rem;
`;
