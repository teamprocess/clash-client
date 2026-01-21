import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const LockedModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1.5rem 0.4rem;
  gap: 3rem;
`;

export const LockedModalLabel = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.neutral};
  text-align: center;
`;

export const LockedModalButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.label.medium}
  color: ${palette.neutral["99"]};
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: 0.25rem;
  width: 8rem;
  height: 2rem;
  cursor: pointer;
`;
