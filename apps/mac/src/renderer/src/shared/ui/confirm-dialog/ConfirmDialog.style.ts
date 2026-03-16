import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  box-sizing: border-box;
  padding: 1rem 0 0.25rem;
  height: 100%;
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Description = styled.p`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const ConfirmMessage = styled.p`
  ${font.body.medium};
  color: ${palette.red[60]};
`;
