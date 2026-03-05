import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.p`
  ${font.headline2.medium}
`;

export const DialogBody = styled.div`
  ${flexCol};
  height: 100%;
  justify-content: space-between;
`;

export const ButtonBox = styled.div`
  width: 100%;
  ${flexRow};
  align-items: center;
  gap: 0.75rem;
`;

export const ErrorText = styled.span`
  ${font.caption.medium};
  color: ${palette.red[60]};
  margin-top: 0.5rem;
  display: block;
`;
