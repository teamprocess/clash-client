import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

import CloseIconSrc from "../../../../assets/close.svg?url";
import RivalProfileSrc from "../../../../assets/rival-profile.png";
import FirstFrameSrc from "../../../../assets/first-frame.svg?url";
import SecondFrameSrc from "../../../../assets/second-frame.svg?url";
import ThirdFrameSrc from "../../../../assets/third-frame.svg?url";
import MyPageProfileSrc from "../../../../assets/mypage-profile.png";

const FRAME_SRC: Record<1 | 2 | 3, string> = {
  1: FirstFrameSrc,
  2: SecondFrameSrc,
  3: ThirdFrameSrc,
};

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.section`
  width: 63.5rem;
  height: 40rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.normal};
  position: relative;
  overflow: hidden;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 3.125rem;
  height: 3.125rem;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover img {
    opacity: 1;
  }
`;

export const CloseIconImg = styled.img.attrs({
  src: CloseIconSrc,
})`
  width: 3.125rem;
  height: 3.125rem;
  object-fit: contain;
  opacity: 0.85;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
  box-sizing: border-box;
`;

export const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 2rem;
  align-items: flex-end;
`;

export const Left = styled.section`
  width: 25.5rem;
  height: 100%;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.background.alternative};
  padding: 2.75rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Top3Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2.25rem;
`;

export const Top3Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const FrameWrap = styled.div<{ $rank: 1 | 2 | 3 }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $rank }) => ($rank === 1 ? "3.875rem" : "3.75rem")};
  height: ${({ $rank }) => ($rank === 1 ? "5.75rem" : "4.75rem")};
`;

export const FrameImg = styled.img.attrs<{ $rank: 1 | 2 | 3 }>(props => ({
  src: FRAME_SRC[props.$rank],
}))`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 2;
  pointer-events: none;
`;

export const Top3Profile = styled.img.attrs({
  src: RivalProfileSrc,
})<{ $rank: 1 | 2 | 3 }>`
  position: absolute;
  z-index: 1;
  width: ${({ $rank }) => ($rank === 1 ? "3.625rem" : "2.875rem")};
  height: ${({ $rank }) => ($rank === 1 ? "3.625rem" : "2.875rem")};
  top: ${({ $rank }) => ($rank === 1 ? "0.875rem" : "0.75rem")};
  object-fit: cover;
`;

export const Top3Name = styled.div`
  ${font.label.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const Top3Sub = styled.div`
  ${font.caption.regular};
  color: ${({ theme }) => theme.label.assistive};
`;

export const Top3Count = styled.span<{ $rank: 1 | 2 | 3 }>`
  ${font.label.bold};
  margin-right: 0.1rem;
  color: ${({ $rank }) =>
    $rank === 1 ? palette.yellow["50"] : $rank === 2 ? palette.blue["80"] : palette.red["70"]};
`;

export const Top3Info = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const List = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ListItem = styled.div`
  width: 100%;
  height: 3.5rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.line.neutral};
  display: flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  box-sizing: border-box;
`;

export const ListLeft = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const RankNum = styled.div`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.neutral};
`;

export const UserPill = styled.div`
  width: 15.5rem;
  height: 2rem;
  border-radius: 1rem;
  background: #2f547b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.125rem 0.875rem;
  box-sizing: border-box;
  gap: 6.875rem;
`;

export const UserAvatar = styled.img.attrs({
  src: RivalProfileSrc,
})`
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 2rem;
  object-fit: cover;
  box-sizing: border-box;
  border: 0.25rem solid #2f547b;
`;

export const UserName = styled.div`
  ${font.body.bold};
  color: ${palette.neutral[90]};
`;

export const ListRight = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.1rem;
  ${font.headline2.regular};
  color: ${({ theme }) => theme.label.alternative};
  white-space: nowrap;
`;

export const DoneCount = styled.span`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.primary.normal};
`;

export const Right = styled.section`
  width: 26rem;
  height: 27.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
`;

export const RightTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const RightRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LongPill = styled.div<{ $dim?: boolean }>`
  width: 14.25rem;
  height: 1.625rem;
  border-radius: 0.875rem;
  background: ${({ theme }) => theme.line.neutral};
  opacity: 30%;
`;

export const ShortPill = styled.div<{ $dim?: boolean }>`
  width: 14.25rem;
  height: 1.625rem;
  border-radius: 0.875rem;
  background: ${({ theme }) => theme.line.neutral};
  opacity: 30%;
`;

export const RightMainRow = styled.div`
  width: 26rem;
`;

export const MainCard = styled.div`
  width: 26rem;
  height: 4.1rem;
  border-radius: 1.1rem;
  background: ${({ theme }) => theme.line.neutral};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.25rem 1rem;
  box-sizing: border-box;
`;

export const MainPill = styled.div`
  flex: 1;
  width: 20rem;
  height: 2.5rem;
  border-radius: 1.1rem;
  background: #2f547b;
`;

export const ProductName = styled.div`
  margin-top: 6.25rem;
  ${font.title1.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const Actions = styled.div`
  margin-top: 6.625rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const GhostBtn = styled.button`
  width: 4.25rem;
  height: 2rem;
  border-radius: 0.625rem;
  border: none;
  background: ${({ theme }) => theme.line.normal};
  color: ${palette.neutral[97]};
  cursor: pointer;
  ${font.label.medium};
`;

export const PrimaryBtn = styled.button`
  width: 4.25rem;
  height: 2rem;
  border-radius: 0.625rem;
  border: none;
  background: ${({ theme }) => theme.primary.normal};
  color: ${palette.neutral[97]};
  cursor: pointer;
  ${font.label.medium};
`;

export const SmallAvatarImg = styled.img.attrs({
  src: MyPageProfileSrc,
})<{ $dim?: boolean }>`
  width: 2.375rem;
  height: 2.375rem;
  border-radius: 50%;
  object-fit: cover;
  border: 0.25rem solid #2f547b;
  box-sizing: border-box;
  opacity: 30%;
`;

export const BigAvatarImg = styled.img.attrs({
  src: MyPageProfileSrc,
})`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 0.375rem solid #2f547b;
  box-sizing: border-box;
`;
