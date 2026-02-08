import { useMemo, useState } from "react";
import * as S from "./ProfilePage.style";
import { TopProfile } from "@/pages/profile/components/top-profile/TopProfile";
import { RivalContainer } from "@/pages/profile/components/rival-container/RivalContainer";
import { ProfileTabs } from "@/pages/profile/components/profile-tabs/ProfileTabs";
import type { ItemPreviewPayload } from "@/pages/profile/components/profile-tabs/item-panel/ItemPanel";

type BgState = { accentColor?: string; bgImageUrl?: string };

export const ProfilePage = () => {
  const [savedBg, setSavedBg] = useState<BgState>({});
  const [draftBg, setDraftBg] = useState<BgState | null>(null);
  const isBackgroundEditing = draftBg !== null;

  const handlePreviewChange = (payload: ItemPreviewPayload) => {
    if (payload.kind !== "background") return;

    setDraftBg({
      accentColor: payload.accentColor,
      bgImageUrl: payload.bgImageUrl,
    });
  };

  const handleCancelBackground = () => {
    setDraftBg(null);
  };

  const handleSaveBackground = () => {
    if (!draftBg) return;
    setSavedBg(draftBg);
    setDraftBg(null);
  };

  const applied = useMemo(() => {
    return isBackgroundEditing ? (draftBg ?? {}) : savedBg;
  }, [isBackgroundEditing, draftBg, savedBg]);

  return (
    <S.Background>
      <TopProfile
        bannerAccentColor={applied.accentColor}
        bannerBgImageUrl={applied.bgImageUrl}
        isBackgroundEditing={isBackgroundEditing}
        onCancelBackground={handleCancelBackground}
        onSaveBackground={handleSaveBackground}
      />

      <S.BodyRow>
        <RivalContainer />
        <ProfileTabs onPreviewChange={handlePreviewChange} />
      </S.BodyRow>
    </S.Background>
  );
};
