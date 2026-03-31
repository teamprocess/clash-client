import * as S from "./ItemDetailModal.style";
import type { OwnedItem, OwnedItemDisplayCategory } from "@/entities/profile/model/ownedItems.types";
import type { getMyProfileResponse } from "@/entities/user";
import { formatPrice, resolveProfileDecorations } from "@/shared/lib";
import { Dialog, NameTag } from "@/shared/ui";

interface ItemDetailModalProps {
  isOpen: boolean;
  item: OwnedItem;
  category: OwnedItemDisplayCategory;
  user?: getMyProfileResponse | null;
  isEquipped: boolean;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onEquip: () => void;
}

const categoryLabelMap: Record<OwnedItemDisplayCategory, string> = {
  INSIGNIA: "휘장",
  NAMEPLATE: "이름표",
  BANNER: "배경",
};

const buildInfoValue = (value?: string | null) => {
  if (!value || value.trim().length === 0) {
    return "-";
  }

  return value;
};

export const ItemDetailModal = ({
  isOpen,
  item,
  category,
  user,
  isEquipped,
  isSubmitting,
  errorMessage,
  onClose,
  onEquip,
}: ItemDetailModalProps) => {
  const { bannerImage, badgeImage, nameplateImage } = resolveProfileDecorations(user?.equippedItems);
  const previewProfileImage = user?.profileImage || S.FallbackProfileImage;
  const previewName = buildInfoValue(user?.name || user?.username);
  const previewBannerImage = category === "BANNER" ? item.image : bannerImage;
  const previewBadgeImage = category === "INSIGNIA" ? item.image : badgeImage;
  const previewNameplateImage = category === "NAMEPLATE" ? item.image : nameplateImage;
  const previewHandle = `@${buildInfoValue(user?.username)}`;
  const submitLabel = isSubmitting
    ? isEquipped
      ? "장착 해제 중..."
      : "장착 중..."
    : isEquipped
      ? "장착 해제"
      : "장착하기";

  return (
    <Dialog
      title="착용 미리보기 / 아이템 정보"
      width={72}
      height={43}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={true}
    >
      <S.DialogLayout>
        <S.PreviewSection>
          <S.PreviewShell>
            <S.PreviewCanvas>
              <S.PreviewPanel>
                <S.PreviewPanelTitle>프로필 페이지 미리보기</S.PreviewPanelTitle>

                <S.PreviewHero $image={previewBannerImage}>
                  <S.PreviewHeroContent>
                    <S.PreviewAvatarSlot>
                      <S.PreviewAvatarWrap
                        profileImage={previewProfileImage}
                        badgeImage={previewBadgeImage}
                        fallbackSrc={S.FallbackProfileImage}
                        alt="프로필 미리보기"
                      />
                    </S.PreviewAvatarSlot>

                    <S.PreviewIdentity>
                      <S.PreviewNameRow>
                        <NameTag
                          text={previewName}
                          backgroundImage={previewNameplateImage}
                          size="hero"
                        />
                      </S.PreviewNameRow>
                      <S.PreviewHandle>{previewHandle}</S.PreviewHandle>
                    </S.PreviewIdentity>
                  </S.PreviewHeroContent>
                </S.PreviewHero>
              </S.PreviewPanel>

              <S.PreviewContent>
                <S.PreviewRankingCard>
                  <S.PreviewRankingHeader>
                    <S.PreviewRankingTitle>랭킹 목록 미리보기</S.PreviewRankingTitle>
                  </S.PreviewRankingHeader>

                  <S.PreviewRankingList>
                    <S.PreviewRankingMutedRow>
                      <S.PreviewRankingMutedAvatar />
                      <S.PreviewRankingMutedBar />
                    </S.PreviewRankingMutedRow>

                    <S.PreviewRankingFocusRow $image={previewBannerImage}>
                      <S.PreviewRankingAvatarSlot>
                        <S.PreviewRankingAvatarWrap
                          profileImage={previewProfileImage}
                          badgeImage={previewBadgeImage}
                          fallbackSrc={S.FallbackProfileImage}
                          alt=""
                        />
                      </S.PreviewRankingAvatarSlot>

                      <S.PreviewRankingInfo>
                        <S.PreviewRankingIdentityRow>
                          <NameTag
                            text={previewName}
                            backgroundImage={previewNameplateImage}
                            size="compact"
                          />
                          <S.PreviewRankingHandle>{previewHandle}</S.PreviewRankingHandle>
                        </S.PreviewRankingIdentityRow>
                      </S.PreviewRankingInfo>
                    </S.PreviewRankingFocusRow>

                    <S.PreviewRankingMutedRow>
                      <S.PreviewRankingMutedAvatar />
                      <S.PreviewRankingMutedBar $short />
                    </S.PreviewRankingMutedRow>
                  </S.PreviewRankingList>
                </S.PreviewRankingCard>
              </S.PreviewContent>
            </S.PreviewCanvas>
          </S.PreviewShell>
        </S.PreviewSection>

        <S.InfoSection>
          <S.InfoPanel>
            <S.InfoHero>
              {category === "BANNER" && <S.InfoBannerHero $image={item.image} />}

              {category === "INSIGNIA" && (
                <S.InfoBadgeHero>
                  <S.InfoBadgeImage src={item.image} alt={item.title} />
                </S.InfoBadgeHero>
              )}

              {category === "NAMEPLATE" && (
                <S.InfoNameplateHero>
                  <S.InfoNameplateMuted />
                  <S.InfoNameplateShowcase $image={item.image} />
                  <S.InfoNameplateMuted />
                </S.InfoNameplateHero>
              )}
            </S.InfoHero>

            <S.MetaRow>
              <S.MetaPill $accent="primary">{categoryLabelMap[category]}</S.MetaPill>
              {item.isSeasonal && <S.MetaPill>시즌 한정</S.MetaPill>}
            </S.MetaRow>

            <S.ItemTitle>{item.title}</S.ItemTitle>
            <S.Description>{buildInfoValue(item.description)}</S.Description>

            <S.InfoList>
              <S.InfoRow>
                <S.InfoLabel>획득 가격</S.InfoLabel>
                <S.InfoValueWithIcon>
                  <S.CookieIcon aria-hidden />
                  <S.InfoValue>{formatPrice(item.price)}</S.InfoValue>
                </S.InfoValueWithIcon>
              </S.InfoRow>

              <S.InfoRow>
                <S.InfoLabel>인기도</S.InfoLabel>
                <S.InfoValue>{item.popularity.toLocaleString("ko-KR")}</S.InfoValue>
              </S.InfoRow>

              <S.InfoRow>
                <S.InfoLabel>시즌</S.InfoLabel>
                <S.InfoValue>{buildInfoValue(item.season?.name ?? "상시 아이템")}</S.InfoValue>
              </S.InfoRow>
            </S.InfoList>

            {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}

            <S.PrimaryButton
              type="button"
              onClick={onEquip}
              disabled={isSubmitting}
            >
              {submitLabel}
            </S.PrimaryButton>
          </S.InfoPanel>
        </S.InfoSection>
      </S.DialogLayout>
    </Dialog>
  );
};
