import { useEffect, useState } from "react";
import { OwnedItemCategory, OwnedItemResponse } from "@/entities/profile/model/ownedItems.types";
import { ownedItemsApi } from "@/entities/profile/api/ownedItemsApi";

export const UseOwnedItems = () => {
  const [category, setCategory] = useState<OwnedItemCategory>(OwnedItemCategory.ALL);
  const [ownedItemsData, setOwnedItemsData] = useState<OwnedItemResponse | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await ownedItemsApi.getOwnedItems({ category });
      setOwnedItemsData(response.data);
    };

    fetchItems();
  }, [category]);

  return {
    category,
    setCategory,
    ownedItemsData,
  };
};
