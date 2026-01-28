import styled from "styled-components";

export const RivalList = styled.div`
  width: 24.8rem;
  margin-top: 6rem;
  flex-direction: column;
  display: flex;
  gap: 1.2rem;
`;

export const RivalBox = styled.div`
  width: 21rem;
  height: 5.3rem;
  background: ${({ theme }) => theme.background.alternative};
  padding: 0.75rem;
  border-radius: 0.7rem;
  display: flex;
`;
