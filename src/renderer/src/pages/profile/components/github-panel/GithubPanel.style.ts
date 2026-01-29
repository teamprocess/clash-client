import styled from "styled-components";

export const Background = styled.div`
  width: 39rem;
  height: 24.375rem;
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
  margin-top: 2.1rem;
`;
