import styled from "styled-components";
import { font } from "@/shared/config/font";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Description = styled.p`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
  line-height: 1.45;
`;

export const SubDescription = styled.p`
  ${font.label.regular}
  color: ${({ theme }) => theme.label.alternative};
`;

export const ErrorText = styled.p`
  ${font.caption.medium}
  color: ${({ theme }) => theme.primary.normal};
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
`;
