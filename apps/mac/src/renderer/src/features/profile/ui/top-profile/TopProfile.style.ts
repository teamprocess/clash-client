import styled from "styled-components";
import { palette } from "@clash/design-tokens/theme";
import { font } from "@clash/design-tokens/font";
import MypageProfileSrc from "../../assets/mypage-profile.png";

export const Banner = styled.div<{ $accent?: string; $bgImage?: string }>`
  width: 100%;
  height: 20.5%;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.alternative};

  ${({ $accent, $bgImage }) =>
    $accent || $bgImage
      ? `
        background-color: ${$accent ?? "transparent"};
        background-image: ${$bgImage ? `url(${$bgImage})` : "none"};
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `
      : ""}

  padding: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;

  @media (min-height: 56.25rem) {
    height: 30%;
  }
`;

export const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.875rem;
`;

export const ButtonEdit = styled.button`
  width: 4rem;
  height: 2rem;
  background: ${({ theme }) => theme.line.normal};
  border-radius: 0.75rem;
  color: ${palette.neutral[97]};
  ${font.label.medium};
  border: none;
  cursor: pointer;
`;

export const ButtonLogout = styled.button`
  width: 5rem;
  height: 2rem;
  background: ${({ theme }) => theme.primary.normal};
  border-radius: 0.75rem;
  color: ${palette.neutral[97]};
  ${font.label.medium};
  border: none;
  cursor: pointer;
`;

export const ProfileCard = styled.div`
  position: absolute;
  left: 4rem;
  top: 30%;
  width: 100%;
  height: 100%;

  @media (min-height: 56.25rem) {
    top: 60%;
  }
`;

export const ProfileImgWrap = styled.div<{ $accent?: string; $bgImage?: string }>`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: border-box;
  border: ${({ $accent }) => ($accent ? `0.5rem solid ${$accent}` : "none")};

  ${({ $bgImage }) =>
    $bgImage
      ? `
        background-image: url(${$bgImage});
        background-size: cover;
        background-position: center;
      `
      : ""}
`;

export const ProfileImg = styled.img.attrs(() => ({
  alt: "프로필",
}))`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.875rem;
`;

export const Name = styled.div`
  color: ${({ theme }) => theme.label.normal};
  ${font.title1.medium};
  margin-left: 1.5rem;
`;

export const BadgeDot = styled.div<{ $accent?: string }>`
  position: absolute;
  right: 0.5rem;
  bottom: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  background: ${({ $accent, theme }) => $accent ?? theme.label.normal};
  transform: translate(15%, 15%);
`;

export const ImgBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ActionGuide = styled.p<{ $tone?: "default" | "error" | "success" }>`
  max-width: 14rem;
  margin: 0;
  text-align: right;
  ${font.caption.medium};
  color: ${({ $tone, theme }) => {
    if ($tone === "error") {
      return palette.red[60];
    }

    if ($tone === "success") {
      return palette.green[50];
    }

    return theme.label.assistive;
  }};
`;

export const FallbackProfileImage = MypageProfileSrc;
