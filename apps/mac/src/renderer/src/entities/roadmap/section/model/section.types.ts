export interface section {
  id: number;
  title: string;
  categoryId: number;
  categoryImageUrl: string | null;
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

export interface getAllSectionsResponse {
  sections: section[];
  categories: number[];
  completedSections: number;
  totalSections: number;
}
