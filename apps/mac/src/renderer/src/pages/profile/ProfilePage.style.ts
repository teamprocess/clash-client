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
  gap: 2rem;
  background: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  padding: 1.75rem;
  overflow: hidden;
`;

export const BodyRow = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  flex: 1;
  min-height: 0;
  justify-content: center;
  overflow: hidden;
  > * {
    min-width: 0;
  }
`;
