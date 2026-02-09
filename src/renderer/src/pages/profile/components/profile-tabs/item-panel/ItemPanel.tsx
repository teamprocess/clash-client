import { useMemo, useState } from "react";
import * as S from "./ItemPanel.style";
import MypageProfile from "@/pages/profile/assets/MypageProfile.png";
import { NameplateModal, NameplateModalContent } from "./nameplate-modal/NameplateModal";

type ItemCategory = "all" | "badge" | "background" | "nameplate";

type BaseItem = {
  id: string;
  title: string;
  category: Exclude<ItemCategory, "all">;
  accentColor?: string;
  bgImageUrl?: string;
};

type BadgeItem = BaseItem & { category: "badge" };
type BackgroundItem = BaseItem & { category: "background" };
type NameplateItem = BaseItem & { category: "nameplate" };
type Item = BadgeItem | BackgroundItem | NameplateItem;

export type ItemPreviewPayload =
  | { kind: "none" }
  | { kind: "background"; accentColor?: string; bgImageUrl?: string }
  | { kind: "badge"; accentColor?: string; bgImageUrl?: string }
  | { kind: "nameplate"; accentColor?: string; bgImageUrl?: string };

const MOCK_ITEMS: Item[] = [
  { id: "bg-1", category: "background", title: "상품명입니다.", accentColor: "#2F547B" },
  { id: "badge-1", category: "badge", title: "상품명", accentColor: "#2F547B" },
  { id: "bg-2", category: "background", title: "상품명입니다.", accentColor: "#2F547B" },
  { id: "name-1", category: "nameplate", title: "상품명입니다.", accentColor: "#2F547B" },
  { id: "bg-3", category: "background", title: "상품명입니다.", accentColor: "#2F547B" },
  { id: "name-2", category: "nameplate", title: "상품명입니다.", accentColor: "#2F547B" },
  { id: "badge-2", category: "badge", title: "상품명", accentColor: "#2F547B" },
  { id: "bg-4", category: "background", title: "상품명입니다.", accentColor: "#2F547B" },
];

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

type ItemPanelProps = {
  onPreviewChange?: (payload: ItemPreviewPayload) => void;
  onStartEdit?: () => void;
};

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

export const ItemPanel = ({ onPreviewChange, onStartEdit }: ItemPanelProps) => {
  const [filter, setFilter] = useState<ItemCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isNameplateModalOpen, setIsNameplateModalOpen] = useState(false);

  const items = useMemo(() => {
    if (filter === "all") return MOCK_ITEMS;
    return MOCK_ITEMS.filter(i => i.category === filter);
  }, [filter]);

  const clearPreview = () => {
    onPreviewChange?.({ kind: "none" });
  };

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

  const closeNameplateModal = () => {
    setIsNameplateModalOpen(false);
  };

  const handleCardClick = (item: Item) => {
    setSelectedId(item.id);

    if (item.category === "nameplate") {
      openNameplateModal();
      return;
    }

    emitPreview(item);
  };

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
                onClick={() => setFilter(key)}
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
                          <S.BadgeAvatar src={MypageProfile} alt="profile" />
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
                            <S.NameSmallAvatar src={MypageProfile} alt="" />
                            <S.NameSmallBar />
                          </S.NameSmallRow>

                          <S.NameMainRow>
                            <S.NameMainAvatar src={MypageProfile} alt="" style={styleVars} />
                            <S.NameMainBar style={styleVars} />
                          </S.NameMainRow>

                          <S.NameSmallRow>
                            <S.NameSmallAvatar src={MypageProfile} alt="" />
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
