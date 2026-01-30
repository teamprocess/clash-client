export interface section {
  id: string;
  title: string;
  category: string;
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
