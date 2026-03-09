import styled from "styled-components";

export const TodoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.background.normal};
`;
