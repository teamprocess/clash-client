import styled from "styled-components";

export const HomeContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  gap: 1.5rem;

  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));

  justify-content: stretch;
  align-items: stretch;

  > * {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
  }

  @media (max-width: 64rem) {
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(18rem, 1fr));
  }

  @media (max-width: 48rem) {
    gap: 1rem;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: none;
    grid-auto-rows: minmax(18rem, auto);
    overflow-y: auto;
  }
`;
