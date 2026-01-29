import styled from "styled-components";

export const Background = styled.div`
  width: 46.25rem;
  height: 24.375rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.alternative};
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 6.25rem;
`;
