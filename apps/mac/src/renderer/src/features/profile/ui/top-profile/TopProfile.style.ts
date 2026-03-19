import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import MypageProfileSrc from "../../assets/rival-profile.png";
import AddProfileImg from "../../assets/add-profile-img-icon.svg";
import ChangeProfileImg from "../../assets/change-profile-img-icon.svg";

export const Banner = styled.div<{ $accent?: string; $bgImage?: string }>`
  width: 100%;
  //aspect-ratio: 19 / 4;
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
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;

export const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

export const ProfileCard = styled.div`
  @media (min-height: 56.25rem) {
    top: 60%;
  }
`;

export const ProfileImgWrap = styled.div<{ $accent?: string; $bgImage?: string }>`
  position: relative;
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
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

export const RankTierWrap = styled.div`
  position: absolute;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  bottom: 0;
  transform: translate(35%, 35%);
  z-index: 3;
`;

export const ProfileImg = styled.img.attrs(() => ({
  alt: "프로필",
}))`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const AddProfileImageIconWrap = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.32);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
`;

export const ChangeProfileImageIconWrap = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.32);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
`;

export const ProfileImageButton = styled.button<{ $hasImage: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;

  &:hover ${AddProfileImageIconWrap}, &:hover ${ChangeProfileImageIconWrap} {
    opacity: 1;
    visibility: visible;
  }
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
  width: 2rem;
  height: 2rem;
  margin-bottom: 0.625rem;
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

export const FallbackProfileImage = MypageProfileSrc;

export const AddProfileImageIcon = styled(AddProfileImg)`
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export const ChangeProfileImageIcon = styled(ChangeProfileImg)`
  width: 100%;
  height: 100%;
  z-index: 2;
`;
