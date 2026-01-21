export interface Weight {
  web: number;
  app: number;
  server: number;
  ai: number;
  game: number;
}

export interface MajorQuestion {
  id: number;
  content: string;
  weight: Weight;
}

export interface MajorQuestionsResponse {
  majorQuestions: MajorQuestion[];
}

export enum Major {
  SERVER = "SERVER",
  WEB = "WEB",
  APP = "APP",
  AI = "AI",
  GAME = "GAME",
}

export interface PostMyMajorRequest {
  major: Major;
}
