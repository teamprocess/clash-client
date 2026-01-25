import styled from "styled-components";

export const RecordPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.background.normal};
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;
