import styled from "styled-components";

export const Background = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
  -webkit-app-region: no-drag;
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
