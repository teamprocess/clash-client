import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Smile from "@/shared/ui/assets/sweating-smile-face.svg";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const EmptyText = styled.p`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const PreDialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ContentDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SmileIcon = styled(Smile)`
  width: 4.5rem;
  height: 4.5rem;
`;

export const ContentText = styled.p`
  ${font.headline1.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const ContentSubText = styled.p`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.alternative};
`;
