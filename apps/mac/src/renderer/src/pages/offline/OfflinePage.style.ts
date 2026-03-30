import styled from "styled-components";
import { ClashLoadingIcon } from "./ClashLoadingIcon";
import { font, palette } from "@clash/design-tokens";

export const OfflineContainer = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 4rem;
`;

export const OfflineBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingIcon = styled(ClashLoadingIcon)`
  width: min(3rem, 14vw);
  height: auto;
  display: block;

  @media (max-width: 640px) {
    width: min(3.25rem, 20vw);
  }
`;

export const ActionBox = styled.div`
  position: absolute;
  left: 50%;
  bottom: 4rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: default;
  text-align: center;
  ${font.body.regular}
  color: ${({ theme }) => theme.label.alternative};
`;

export const ActionButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const ActionHelpText = styled.p``;

export const ActionButton = styled.button`
  ${font.body.regular}
  color: ${palette.blue["50"]};
  cursor: pointer;
`;
