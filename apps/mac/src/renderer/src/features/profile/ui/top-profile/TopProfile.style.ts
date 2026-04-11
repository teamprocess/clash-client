import styled from "styled-components";
import AddProfileImg from "../../assets/add-profile-img-icon.svg";
import ChangeProfileImg from "../../assets/change-profile-img-icon.svg";
import {
  createNameplateOverlayTuningCss,
  nameplateFrameCss,
} from "@/shared/lib";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";
import { font } from "@clash/design-tokens";

const topProfileNameplateTuningCss = createNameplateOverlayTuningCss({
  insetX: "-0.5rem",
  scaleX: 2,
  scaleY: 2.25,
  shiftY: "1.5rem",
});

export const Banner = styled.div<{ $bgImage?: string }>`
  width: 100%;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.alternative};

  ${({ $bgImage }) =>
    $bgImage
      ? `
        background-image: ${$bgImage ? `url(${$bgImage})` : "none"};
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `
      : ""}

  padding: clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;

  @media (max-width: 56rem) {
    border-radius: 0.875rem;
  }

  @media (max-height: 52rem) {
    padding: 0.875rem 1rem;
  }
`;

export const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

export const ProfileCard = styled.div`
  height: 100%;
  min-height: clamp(7rem, 14vh, 9.75rem);
`;

export const ProfileImgWrapper = styled.div`
  position: absolute;
  bottom: clamp(-4rem, -7vh, -2.75rem);
  left: clamp(1rem, 13%, 7rem);

  @media (max-width: 56rem) {
    left: 50%;
    bottom: -3.5rem;
    transform: translateX(-50%);
    width: min(100%, 16rem);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ProfileImgContainer = styled.div`
  position: relative;
  width: clamp(4.6rem, 8vh, 6.25rem);
  height: clamp(4.6rem, 8vh, 6.25rem);
  margin-bottom: clamp(0.55rem, 1vh, 0.95rem);
`;

export const ProfileAvatarWrap = styled(ProfileAvatar)`
  width: 100%;
  height: 100%;
`;

export const RankTierWrap = styled.div`
  position: absolute;
  right: clamp(0.35rem, 1vw, 0.7rem);
  width: clamp(2rem, 3.8vw, 2.4rem);
  height: clamp(2rem, 3.8vw, 2.4rem);
  bottom: 0;
  transform: translate(35%, 35%);
  z-index: 3;
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
  z-index: 3;
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
  z-index: 3;
`;

export const ProfileImageButton = styled.button<{ $hasImage: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  display: block;
  overflow: visible;

  &:hover ${AddProfileImageIconWrap}, &:hover ${ChangeProfileImageIconWrap} {
    opacity: 1;
    visibility: visible;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 56rem) {
    justify-content: center;
    width: 100%;
  }
`;

export const DisplayNameWrap = styled.div`
  margin-left: 0.5rem;
  margin-top: clamp(0.25rem, 0.8vh, 0.5rem);
  max-width: min(60vw, 16rem);

  @media (max-width: 56rem) {
    margin-left: 0;
    margin-top: 0.35rem;
    max-width: 100%;
  }
`;

export const DisplayNamePlate = styled.div<{ $image?: string }>`
  ${topProfileNameplateTuningCss};
  min-width: 0;
  max-width: min(100%, 16rem);
  padding: 0.28rem 1.25rem 0.34rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  ${nameplateFrameCss}
`;

export const DisplayName = styled.p`
  ${font.title2.bold};
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 56rem) {
    text-align: center;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

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
