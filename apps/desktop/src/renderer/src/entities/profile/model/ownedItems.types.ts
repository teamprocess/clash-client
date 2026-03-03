export enum OwnedItemCategory {
  ALL = "ALL",
  INSIGNIA = "INSIGNIA",
  NAMEPLATE = "NAMEPLATE",
  BANNER = "BANNER",
}

export type OwnedItemRequest = {
  category: OwnedItemCategory;
};

export type OwnedItemResponse = {
  items: {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    priceType: string;
    discount: string;
    popularity: string;
    isSeasonal: boolean;
  }[];
};
