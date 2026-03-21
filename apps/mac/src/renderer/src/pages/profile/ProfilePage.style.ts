import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 3.25rem;
  background: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  padding: 2rem;
`;

export const BodyRow = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  flex: 1;
  min-height: 0;
  justify-content: center;
  > * {
    min-width: 0;
  }
`;
