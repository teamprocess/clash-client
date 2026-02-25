export interface section {
  id: string;
  title: string;
  category: string;
  categoryId?: string | number;
  completed: boolean;
  locked: boolean;
}

export interface sectionServer {
  id: string | number;
  title: string;
  category?: string | number;
  categoryId?: string | number;
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
  major: MajorEnum | undefined;
}

export interface getAllSectionsResponse {
  sections: section[];
  categories: string[];
}
