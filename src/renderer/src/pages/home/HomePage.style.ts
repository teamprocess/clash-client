import styled from "styled-components";

export const HomeContainer = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 1.5rem;
  height: 100%;
  width: 100%;
`;
