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

export interface SubmitAnswerRequest {
  missionId: number;
  questionId: number;
  submittedChoiceId: number;
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  explanation: string;
  currentProgress: number;
  totalQuestion: number;
  correctChoiceId: number | null;
  isMissionCleared: boolean;
  nextMissionId: number | null;
  nextMissionOrderIndex: number | null;
  isChapterCleared: boolean;
  nextChapterId: number | null;
  nextChapterOrderIndex: number | null;
}

export interface SubmitResultResponse {
  missionId: number;
  isCleared: boolean;
  correctCount: number;
  totalCount: number;
  nextMissionId: number | null;
  nextMissionOrderIndex: number | null;
  nextChapterId: number | null;
  nextChapterOrderIndex: number | null;
}
