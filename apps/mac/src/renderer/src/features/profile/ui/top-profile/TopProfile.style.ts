import styled from "styled-components";
import MypageProfileSrc from "../../assets/rival-profile.png";
import AddProfileImg from "../../assets/add-profile-img-icon.svg";
import ChangeProfileImg from "../../assets/change-profile-img-icon.svg";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";

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

  padding: 1.25rem 1.5rem;
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
  height: 100%;
  min-height: 9.75rem;
`;

export const ProfileImgWrapper = styled.div`
  position: absolute;
  bottom: -31%;
  left: 13%;
`;

export const ProfileImgContainer = styled.div`
  position: relative;
  width: 6.25rem;
  height: 6.25rem;
  margin-bottom: 0.95rem;
`;

export const ProfileAvatarWrap = styled(ProfileAvatar)`
  width: 100%;
  height: 100%;
`;

export const RankTierWrap = styled.div`
  position: absolute;
  right: 0.7rem;
  width: 2.4rem;
  height: 2.4rem;
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
`;

export const DisplayNameWrap = styled.div`
  margin-left: 1.15rem;
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
