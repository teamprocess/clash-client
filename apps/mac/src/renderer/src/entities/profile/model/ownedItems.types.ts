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
  category: OwnedItemDisplayCategory;
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
