import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  height: 100%;
  min-width: 0;

  > * {
    flex: 1 1 0;
    min-width: 0;
  }
`;

export const CompareContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 0;
  width: 100%;
  height: 100%;
  gap: 1rem;
  min-width: 0;
`;
