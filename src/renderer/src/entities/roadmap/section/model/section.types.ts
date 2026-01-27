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
}

export interface getMajorSectionRequest {
  major: MajorEnum | undefined;
}

export interface getAllSectionsResponse {
  sections: section[];
  categories: string[];
}

export interface getMyProfileResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
  totalExp: number;
  totalCookie: number;
  totalToken: number;
  major: string;
  userStatus: string;
}
