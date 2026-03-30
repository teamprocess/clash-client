export enum OwnedItemCategory {
  ALL = "ALL",
  INSIGNIA = "INSIGNIA",
  NAMEPLATE = "NAMEPLATE",
  BANNER = "BANNER",
}

export type OwnedItemDisplayCategory =
  | OwnedItemCategory.INSIGNIA
  | OwnedItemCategory.NAMEPLATE
  | OwnedItemCategory.BANNER;

export type OwnedItemApiCategory = OwnedItemDisplayCategory | "INSIGMA";

export interface OwnedItemSeason {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface OwnedItem {
  id: number;
  title: string;
  image: string;
  description: string;
  category: OwnedItemApiCategory;
  price: number;
  discount: number;
  popularity: number;
  isSeasonal: boolean;
  season?: OwnedItemSeason | null;
}

export type OwnedItemRequest = {
  category: OwnedItemCategory;
};

export type OwnedItemResponse = {
  items: OwnedItem[];
};

export const normalizeOwnedItemCategory = (
  category: string
): OwnedItemDisplayCategory | null => {
  switch (category) {
    case "INSIGMA":
    case OwnedItemCategory.INSIGNIA:
      return OwnedItemCategory.INSIGNIA;
    case OwnedItemCategory.NAMEPLATE:
      return OwnedItemCategory.NAMEPLATE;
    case OwnedItemCategory.BANNER:
      return OwnedItemCategory.BANNER;
    default:
      return null;
  }
};
