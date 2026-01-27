export interface Chapter {
  id: number;
  title: string;
  orderIndex: number;
  completedMissions: number;
  totalMissions: number;
}

export interface GetSectionDetailsResponse {
  sectionId: number;
  sectionTitle: string;
  totalChapters: number;
  currentChapterId: number;
  currentOrderIndex: number;
  currentMissionIndex: number;
  chapters: Chapter[];
}

export interface Mission {
  id: number;
  title: string;
  completed: boolean;
}

export interface Stage {
  id: number;
  title: string;
  status: "locked" | "current" | "completed";
  currentProgress: number;
  totalMissions: number;
  missions: Mission[];
}

export interface GetSectionDetailsRequest {
  sectionId: number;
}

export interface GetChapterDetailsRequest {
  chapterId: number;
}

export interface GetChapterDetailsResponse {
  chapterId: number;
  title: string;
  description: string;
  currentMissionId: number;
  currentQuestionId: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  missions: Mission[] | [];
}
