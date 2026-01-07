import styled from "styled-components";

export const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  min-height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  padding: 6rem 11rem;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9rem;
`;
