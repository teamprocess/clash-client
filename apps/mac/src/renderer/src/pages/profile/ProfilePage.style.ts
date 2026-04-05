import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
  overflow: hidden;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: clamp(1.5rem, 2vw, 2rem);
  background: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  padding: clamp(1rem, 2.5vw, 1.75rem);
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 64rem) {
    border-radius: 0.75rem;
  }

  @media (max-height: 52rem) {
    gap: 1rem;
    padding: 0.875rem 1rem 1rem;
  }
`;

export const BodyRow = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  justify-content: stretch;
  overflow: hidden;

  > * {
    min-width: 0;
    min-height: 0;
  }
`;
