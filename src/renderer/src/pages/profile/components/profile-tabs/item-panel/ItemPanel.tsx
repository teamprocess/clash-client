import { useMemo, useState } from "react";
import * as S from "./ItemPanel.style";
import MypageProfile from "@/pages/profile/assets/MypageProfile.png";

type ItemCategory = "all" | "badge" | "background" | "nameplate";

type BaseItem = {
  id: string;
  title: string;
  category: Exclude<ItemCategory, "all">;
};

type BadgeItem = BaseItem & { category: "badge" };
type BackgroundItem = BaseItem & { category: "background" };
type NameplateItem = BaseItem & { category: "nameplate" };

type Item = BadgeItem | BackgroundItem | NameplateItem;

const MOCK_ITEMS: Item[] = [
  { id: "bg-1", category: "background", title: "상품명입니다." },
  { id: "badge-1", category: "badge", title: "상품명" },
  { id: "bg-2", category: "background", title: "상품명입니다." },
  { id: "name-1", category: "nameplate", title: "상품명입니다." },
  { id: "bg-3", category: "background", title: "상품명입니다." },
  { id: "name-2", category: "nameplate", title: "상품명입니다." },
  { id: "badge-2", category: "badge", title: "상품명" },
  { id: "bg-4", category: "background", title: "상품명입니다." },
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

export const ItemPanel = () => {
  const [filter, setFilter] = useState<ItemCategory>("all");

  const items = useMemo(() => {
    if (filter === "all") return MOCK_ITEMS;
    return MOCK_ITEMS.filter(i => i.category === filter);
  }, [filter]);

  return (
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
          {items.map(item => (
            <S.Card key={item.id}>
              {item.category === "background" && (
                <>
                  <S.ThumbBackground />
                  <S.CardFooter>
                    <S.ItemTitle>{item.title}</S.ItemTitle>
                    <S.BadgePill>{pillLabel[item.category]}</S.BadgePill>
                  </S.CardFooter>
                </>
              )}

              {item.category === "badge" && (
                <S.ThumbBadgeCard>
                  <S.BadgeLeftRing>
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
                      <S.NameMainAvatar src={MypageProfile} alt="" />
                      <S.NameMainBar />
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
            </S.Card>
          ))}
        </S.Grid>
      </S.GridScrollArea>
    </S.Wrapper>
  );
};
