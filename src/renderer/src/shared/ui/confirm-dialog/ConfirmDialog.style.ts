import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 0 0 0;
  height: 100%;
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Description = styled.p`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const ConfirmMessage = styled.p`
  ${font.body.medium};
  color: ${palette.red[60]};
`;

export const ActionBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;
