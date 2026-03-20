import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  flex: 1;
`;

export const Background = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  padding: 2rem;
`;

export const BodyRow = styled.div`
  margin-top: 3.25rem;
  align-items: center;
  width: 100%;
  flex: 1;
  justify-content: space-between;
  > * {
    min-width: 0;
  }
`;
