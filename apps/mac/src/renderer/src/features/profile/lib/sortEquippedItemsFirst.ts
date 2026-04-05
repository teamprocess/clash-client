import type { OwnedItem } from "@/entities/profile/model/ownedItems.types";

export const sortEquippedItemsFirst = (
  items: OwnedItem[],
  isEquippedItem: (item: OwnedItem) => boolean
) => {
  return items
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const isLeftEquipped = isEquippedItem(left.item);
      const isRightEquipped = isEquippedItem(right.item);

      if (isLeftEquipped === isRightEquipped) {
        return left.index - right.index;
      }

      return isLeftEquipped ? -1 : 1;
    })
    .map(({ item }) => item);
};
