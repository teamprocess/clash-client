export interface section {
  id: string;
  title: string;
  category: string;
  categoryId?: string | number;
  icon?: string | null;
  completed: boolean;
  locked: boolean;
}

export interface sectionServer {
  id: string | number;
  title: string;
  category?: string | number;
  categoryId?: string | number;
  categoryImageUrl?: string | null;
  icon?: string | null;
  iconUrl?: string | null;
  iconURL?: string | null;
  icon_url?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  completed: boolean;
  locked: boolean;
}

export enum MajorEnum {
  SERVER = "SERVER",
  WEB = "WEB",
  APP = "APP",
  AI = "AI",
  GAME = "GAME",
  NONE = "NONE",
}

export interface getMajorSectionRequest {
  major: MajorEnum;
}

export interface getAllSectionsServerResponse {
  sections: sectionServer[];
  categories: Array<string | number>;
}

export interface getAllSectionsResponse {
  sections: section[];
  categories: string[];
}
