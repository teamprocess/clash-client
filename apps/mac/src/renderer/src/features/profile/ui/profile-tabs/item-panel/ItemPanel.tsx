import { useState } from "react";
import * as S from "./ItemPanel.style";
import { ItemDetailModal } from "./item-detail-modal/ItemDetailModal";
import { useEquipItemMutation } from "@/entities/profile/api/query/useEquipItem.mutation";
import { useOwnedItemsQuery } from "@/entities/profile/api/query/useOwnedItems.query";
import {
  OwnedItemCategory,
  type OwnedItem,
  type OwnedItemDisplayCategory,
} from "@/entities/profile/model/ownedItems.types";
import { sortEquippedItemsFirst } from "@/features/profile/lib/sortEquippedItemsFirst";
import { useGetMyProfile } from "@/entities/user";
import { getErrorMessage } from "@/shared/lib";

const FILTER_OPTIONS = [
  { key: OwnedItemCategory.ALL, label: "전체" },
  { key: OwnedItemCategory.INSIGNIA, label: "휘장" },
  { key: OwnedItemCategory.BANNER, label: "배경" },
  { key: OwnedItemCategory.NAMEPLATE, label: "이름표" },
] as const;

const CATEGORY_LABEL: Record<OwnedItemDisplayCategory, string> = {
  [OwnedItemCategory.INSIGNIA]: "휘장",
  [OwnedItemCategory.BANNER]: "배경",
  [OwnedItemCategory.NAMEPLATE]: "이름표",
};

export const ItemPanel = () => {
  const [filter, setFilter] = useState<OwnedItemCategory>(OwnedItemCategory.ALL);
  const [selectedItem, setSelectedItem] = useState<OwnedItem | null>(null);
  const { data, isLoading, isFetching, error } = useOwnedItemsQuery(filter);
  const { data: user } = useGetMyProfile();
  const equipItemMutation = useEquipItemMutation();

  const items = data?.data?.items ?? [];

  const isEquippedItem = (category: OwnedItemDisplayCategory, itemId: number) => {
    switch (category) {
      case OwnedItemCategory.INSIGNIA:
        return user?.equippedItems?.insigma?.id === itemId;
      case OwnedItemCategory.NAMEPLATE:
        return user?.equippedItems?.nameplate?.id === itemId;
      case OwnedItemCategory.BANNER:
        return user?.equippedItems?.banner?.id === itemId;
      default:
        return false;
    }
  };

  const selectedCategory = selectedItem?.category ?? null;
  const equipErrorMessage = equipItemMutation.isError
    ? getErrorMessage(equipItemMutation.error, "아이템을 장착하지 못했어요.")
    : null;
  const sortedItems = sortEquippedItemsFirst(items, item => isEquippedItem(item.category, item.id));

  const handleCloseModal = () => {
    setSelectedItem(null);
    equipItemMutation.reset();
  };

  const handleFilterChange = (nextFilter: OwnedItemCategory) => {
    if (nextFilter === filter) {
      return;
    }

    handleCloseModal();
    setFilter(nextFilter);
  };

  const handleEquipItem = async () => {
    if (!selectedItem) {
      return;
    }

    try {
      await equipItemMutation.mutateAsync({
        productId: selectedItem.id,
        shouldUnequip: selectedCategory ? isEquippedItem(selectedCategory, selectedItem.id) : false,
      });
      handleCloseModal();
    } catch {
      return;
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.Header>
          <S.Title>아이템</S.Title>

          <S.FilterRow>
            {FILTER_OPTIONS.map(option => (
              <S.FilterChip
                key={option.key}
                $active={filter === option.key}
                type="button"
                onClick={() => handleFilterChange(option.key)}
              >
                {option.label}
              </S.FilterChip>
            ))}
          </S.FilterRow>
        </S.Header>

        {error ? (
          <S.StateBox>
            <S.StateTitle>아이템을 불러오지 못했어요.</S.StateTitle>
            <S.StateDescription>잠시 후 다시 시도해 주세요.</S.StateDescription>
          </S.StateBox>
        ) : isLoading ? (
          <S.StateBox aria-busy="true">
            <S.StateTitle>아이템을 불러오는 중...</S.StateTitle>
            <S.StateDescription>잠시만 기다려 주세요.</S.StateDescription>
          </S.StateBox>
        ) : items.length === 0 ? (
          <S.StateBox>
            <S.StateTitle>보유한 아이템이 아직 없어요.</S.StateTitle>
            <S.StateDescription>상점에서 아이템을 구매하면 이 탭에 표시됩니다.</S.StateDescription>
          </S.StateBox>
        ) : (
          <S.GridScrollArea aria-busy={isFetching}>
            <S.Grid>
              {sortedItems.map(item => {
                const category = item.category;

                return (
                  <S.CardButton
                    key={item.id}
                    type="button"
                    $equipped={isEquippedItem(category, item.id)}
                    onClick={() => setSelectedItem(item)}
                  >
                    <S.CardPreview>
                      {category === OwnedItemCategory.BANNER && (
                        <S.BannerPreview>
                          <S.BannerArtwork $image={item.image} />
                        </S.BannerPreview>
                      )}

                      {category === OwnedItemCategory.INSIGNIA && (
                        <S.BadgePreview>
                          <S.BadgeStage>
                            <S.BadgeAvatarShell>
                              <S.BadgeAvatar />
                            </S.BadgeAvatarShell>
                            <S.BadgeItemImage $image={item.image} />
                          </S.BadgeStage>
                        </S.BadgePreview>
                      )}

                      {category === OwnedItemCategory.NAMEPLATE && (
                        <S.NameplatePreview>
                          <S.NameplateMutedRow>
                            <S.NameplateDot />
                            <S.NameplateMutedBar />
                          </S.NameplateMutedRow>

                          <S.NameplateActiveRow>
                            <S.NameplateHeroAvatar />
                            <S.NameplateBar $image={item.image} />
                          </S.NameplateActiveRow>

                          <S.NameplateMutedRow>
                            <S.NameplateDot />
                            <S.NameplateMutedBar />
                          </S.NameplateMutedRow>
                        </S.NameplatePreview>
                      )}
                    </S.CardPreview>

                    <S.CardFooter>
                      <S.ItemTitle title={item.title}>{item.title}</S.ItemTitle>
                      <S.CategoryPill>{CATEGORY_LABEL[category]}</S.CategoryPill>
                    </S.CardFooter>
                  </S.CardButton>
                );
              })}
            </S.Grid>
          </S.GridScrollArea>
        )}
      </S.Wrapper>

      {selectedItem && selectedCategory && (
        <ItemDetailModal
          isOpen
          item={selectedItem}
          category={selectedCategory}
          user={user}
          isEquipped={isEquippedItem(selectedCategory, selectedItem.id)}
          isSubmitting={equipItemMutation.isPending}
          errorMessage={equipErrorMessage}
          onClose={handleCloseModal}
          onEquip={handleEquipItem}
        />
      )}
    </>
  );
};
