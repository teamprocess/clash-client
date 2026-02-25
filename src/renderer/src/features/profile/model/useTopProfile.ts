export interface TopProfileProps {
  bannerAccentColor?: string;
  bannerBgImageUrl?: string;
  badgeAccentColor?: string;
  badgeBgImageUrl?: string;
  isEditing?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  onEditProfile?: () => void;
  onLogout?: () => void;
}

export const useTopProfile = () => {
  return {};
};
