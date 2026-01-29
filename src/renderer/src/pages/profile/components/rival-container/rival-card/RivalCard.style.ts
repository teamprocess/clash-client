import styled from "styled-components";

export const RivalBox = styled.div`
  width: 100%;
  height: 22.375rem;
  background: ${({ theme }) => theme.background.alternative};
  padding: 0.75rem;
  border-radius: 0.75rem;

  display: flex;
  align-items: center;
`;

export const RivalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
`;

export const RivalProfileImg = styled.img`
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
`;

export const NameText = styled.div`
  font-size: 1.375rem;
  font-weight: 800;
`;
