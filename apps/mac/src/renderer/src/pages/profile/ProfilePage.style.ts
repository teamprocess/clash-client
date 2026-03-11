import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Background = styled.div`
  width: 100%;
  height: 95%;
  background: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
`;

export const BodyRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-start;
  > * {
    min-width: 0;
  }
`;
