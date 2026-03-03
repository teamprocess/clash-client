import React, { useMemo, useState } from "react";
import * as S from "./ItemPanel.style";
import { NameplateModal, NameplateModalContent } from "./nameplate-modal/NameplateModal";
import { useOwnedItemsQuery } from "@/entities/profile/api/query/useOwnedItems.query";
import { OwnedItemCategory } from "@/entities/profile/model/ownedItems.types";

export type ItemPreviewPayload =
  | { kind: "none" }
  | { kind: "background"; accentColor?: string; bgImageUrl?: string }
  | { kind: "badge"; accentColor?: string; bgImageUrl?: string }
  | { kind: "nameplate"; accentColor?: string; bgImageUrl?: string };

export type ItemCategory = "all" | "badge" | "background" | "nameplate";

type BaseItem = {
  id: string;
  title: string;
  accentColor?: string;
  bgImageUrl?: string;
};

type BadgeItem = BaseItem & { category: "badge" };
type BackgroundItem = BaseItem & { category: "background" };
type NameplateItem = BaseItem & { category: "nameplate" };

type Item = BadgeItem | BackgroundItem | NameplateItem;

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

export type ItemPanelProps = {
  onPreviewChange?: (payload: ItemPreviewPayload) => void;
  onStartEdit?: () => void;
};

const chipLabel: Record<ItemCategory, string> = {
  all: "전체",
  badge: "휘장",
  background: "배경",
  nameplate: "이름표",
};

const pillLabel: Record<Exclude<ItemCategory, "all">, string> = {
  badge: "휘장",
  background: "배경",
  nameplate: "이름표",
};

const uiToApiCategory: Record<ItemCategory, OwnedItemCategory> = {
  all: OwnedItemCategory.ALL,
  badge: OwnedItemCategory.INSIGNIA,
  nameplate: OwnedItemCategory.NAMEPLATE,
  background: OwnedItemCategory.BANNER,
};

const apiToUiCategory = (category: string): Item["category"] | null => {
  switch (category) {
    case OwnedItemCategory.INSIGNIA:
      return "badge";
    case OwnedItemCategory.NAMEPLATE:
      return "nameplate";
    case OwnedItemCategory.BANNER:
      return "background";
    default:
      return null;
  }
};

export const ItemPanel = ({ onPreviewChange, onStartEdit }: ItemPanelProps) => {
  const [filter, setFilter] = useState<ItemCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isNameplateModalOpen, setIsNameplateModalOpen] = useState(false);

  const { data, isLoading, error, setCategory } = useOwnedItemsQuery();

  const items: Item[] = useMemo(() => {
    const apiItems = data?.data?.items ?? [];

    return apiItems
      .map(apiItem => {
        const uiCategory = apiToUiCategory(apiItem.category);
        if (!uiCategory) return null;

        return {
          id: String(apiItem.id),
          title: apiItem.title,
          category: uiCategory,
          accentColor: undefined,
          bgImageUrl: undefined,
        } as Item;
      })
      .filter((v): v is Item => v !== null);
  }, [data]);

  const clearPreview = () => onPreviewChange?.({ kind: "none" });

  const emitPreview = (item: Item) => {
    const payload: ItemPreviewPayload =
      item.category === "background"
        ? { kind: "background", accentColor: item.accentColor, bgImageUrl: item.bgImageUrl }
        : item.category === "badge"
          ? { kind: "badge", accentColor: item.accentColor, bgImageUrl: item.bgImageUrl }
          : { kind: "nameplate", accentColor: item.accentColor, bgImageUrl: item.bgImageUrl };

    onPreviewChange?.(payload);
    onStartEdit?.();
  };

  const openNameplateModal = () => {
    clearPreview();
    setIsNameplateModalOpen(true);
  };

  const closeNameplateModal = () => setIsNameplateModalOpen(false);

  const handleCardClick = (item: Item) => {
    setSelectedId(item.id);

    if (item.category === "nameplate") {
      openNameplateModal();
      return;
    }

    emitPreview(item);
  };

  const handleFilterClick = (key: ItemCategory) => {
    setFilter(key);
    setSelectedId(null);
    clearPreview();

    setCategory(uiToApiCategory[key]);
  };

  if (isLoading) {
    return <S.Wrapper>로딩 중...</S.Wrapper>;
  }

  if (error) {
    return <S.Wrapper>아이템을 불러오지 못했어요.</S.Wrapper>;
  }

  return (
    <>
      <S.Wrapper>
        <S.Header>
          <S.Title>아이템</S.Title>

          <S.FilterRow>
            {(["all", "badge", "background", "nameplate"] as const).map(key => (
              <S.FilterChip
                key={key}
                $active={filter === key}
                onClick={() => handleFilterClick(key)}
                type="button"
              >
                {chipLabel[key]}
              </S.FilterChip>
            ))}
          </S.FilterRow>
        </S.Header>

        <S.GridScrollArea>
          <S.Grid>
            {items.map(item => {
              const isActive = selectedId === item.id;

              const styleVars: CSSVars = {};
              if (item.accentColor) styleVars["--item-accent"] = item.accentColor;
              if (item.bgImageUrl) styleVars["--item-bg-image"] = `url(${item.bgImageUrl})`;

              return (
                <S.CardButton
                  key={item.id}
                  type="button"
                  $active={isActive}
                  onClick={() => handleCardClick(item)}
                >
                  <S.CardInner>
                    {item.category === "background" && (
                      <>
                        <S.ThumbBackground style={styleVars} />
                        <S.CardFooter>
                          <S.ItemTitle>{item.title}</S.ItemTitle>
                          <S.BadgePill>{pillLabel[item.category]}</S.BadgePill>
                        </S.CardFooter>
                      </>
                    )}

                    {item.category === "badge" && (
                      <S.ThumbBadgeCard>
                        <S.BadgeLeftRing style={styleVars}>
                          <S.BadgeAvatar alt="profile" />
                        </S.BadgeLeftRing>

                        <S.BadgeRight>
                          <S.BadgePillInline>{pillLabel[item.category]}</S.BadgePillInline>
                          <S.BadgeTitle>{item.title}</S.BadgeTitle>
                        </S.BadgeRight>
                      </S.ThumbBadgeCard>
                    )}

                    {item.category === "nameplate" && (
                      <>
                        <S.ThumbName>
                          <S.NameSmallRow>
                            <S.NameSmallAvatar alt="" />
                            <S.NameSmallBar />
                          </S.NameSmallRow>

                          <S.NameMainRow>
                            <S.NameMainAvatar alt="" style={styleVars} />
                            <S.NameMainBar style={styleVars} />
                          </S.NameMainRow>

                          <S.NameSmallRow>
                            <S.NameSmallAvatar alt="" />
                            <S.NameSmallBar />
                          </S.NameSmallRow>
                        </S.ThumbName>

                        <S.CardFooter>
                          <S.ItemTitle>{item.title}</S.ItemTitle>
                          <S.BadgePill>{pillLabel[item.category]}</S.BadgePill>
                        </S.CardFooter>
                      </>
                    )}
                  </S.CardInner>
                </S.CardButton>
              );
            })}
          </S.Grid>
        </S.GridScrollArea>
      </S.Wrapper>

      <NameplateModal open={isNameplateModalOpen} onClose={closeNameplateModal}>
        <NameplateModalContent onClose={closeNameplateModal} />
      </NameplateModal>
    </>
  );
};
