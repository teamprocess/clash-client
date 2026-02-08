import { useMemo, useState } from "react";
import * as S from "./ProfilePage.style";
import { TopProfile } from "@/pages/profile/components/top-profile/TopProfile";
import { RivalContainer } from "@/pages/profile/components/rival-container/RivalContainer";
import { ProfileTabs } from "@/pages/profile/components/profile-tabs/ProfileTabs";
import type { ItemPreviewPayload } from "@/pages/profile/components/profile-tabs/item-panel/ItemPanel";

type BgState = { accentColor?: string; bgImageUrl?: string };
type BadgeState = { accentColor?: string; bgImageUrl?: string };

type EditingKind = "background" | "badge" | null;

export const ProfilePage = () => {
  const [savedBg, setSavedBg] = useState<BgState>({});
  const [savedBadge, setSavedBadge] = useState<BadgeState>({});
  const [draftBg, setDraftBg] = useState<BgState | null>(null);
  const [draftBadge, setDraftBadge] = useState<BadgeState | null>(null);
  const [editingKind, setEditingKind] = useState<EditingKind>(null);
  const isEditing = editingKind !== null;

  const appliedBg = useMemo(
    () => (editingKind === "background" ? draftBg : null) ?? savedBg,
    [editingKind, draftBg, savedBg]
  );

  const appliedBadge = useMemo(
    () => (editingKind === "badge" ? draftBadge : null) ?? savedBadge,
    [editingKind, draftBadge, savedBadge]
  );

  const handlePreviewChange = (payload: ItemPreviewPayload) => {
    if (payload.kind === "background") {
      setEditingKind("background");
      setDraftBg({
        accentColor: payload.accentColor,
        bgImageUrl: payload.bgImageUrl,
      });
      return;
    }

    if (payload.kind === "badge") {
      setEditingKind("badge");
      setDraftBadge({
        accentColor: payload.accentColor ?? "#2F547B",
        bgImageUrl: payload.bgImageUrl,
      });
      return;
    }
  };

  const handleCancel = () => {
    if (editingKind === "background") setDraftBg(null);
    if (editingKind === "badge") setDraftBadge(null);
    setEditingKind(null);
  };

  const handleSave = () => {
    if (editingKind === "background") {
      if (draftBg) setSavedBg(draftBg);
      setDraftBg(null);
    }

    if (editingKind === "badge") {
      if (draftBadge) setSavedBadge(draftBadge);
      setDraftBadge(null);
    }

    setEditingKind(null);
  };

  return (
    <S.Background>
      <TopProfile
        bannerAccentColor={appliedBg?.accentColor}
        bannerBgImageUrl={appliedBg?.bgImageUrl}
        badgeAccentColor={appliedBadge?.accentColor}
        badgeBgImageUrl={appliedBadge?.bgImageUrl}
        isEditing={isEditing}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <S.BodyRow>
        <RivalContainer />
        <ProfileTabs onPreviewChange={handlePreviewChange} />
      </S.BodyRow>
    </S.Background>
  );
};
