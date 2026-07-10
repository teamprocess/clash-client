export interface Section {
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

export interface GetMajorSectionRequest {
  major: MajorEnum;
}

export interface GetAllSectionsResponse {
  sections: Section[];
  categories: number[];
  completedSections: number;
  totalSections: number;
}
