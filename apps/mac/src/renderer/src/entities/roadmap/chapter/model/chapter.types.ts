export interface SectionChapter {
  id?: number | null;
  chapterId?: number | null;
  title: string;
  orderIndex: number;
  completedMissions: number | null;
  totalMissions: number | null;
  description?: string | null;
  studyMaterialUrl?: string | null;
}

export interface GetSectionDetailsResponse {
  sectionId: number;
  sectionTitle: string;
  totalChapters: number;
  currentChapterId: number | null;
  currentOrderIndex: number | null;
  chapters: SectionChapter[];
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
  orderIndex: number;
  studyMaterialUrl: string | null;
  questions: ChapterQuestion[];
  totalQuestions: number;
  currentQuestionIndex: number;
  correctCount: number;
  isCleared: boolean;
}

export interface ChapterQuestion {
  questionId: number;
  content: string;
  explanation: string;
  orderIndex: number;
  difficulty: number;
  choices: ChapterChoice[];
}

export interface ChapterChoice {
  choiceId: number;
  content: string;
}

export interface SubmitAnswerRequest {
  questionId: number;
  submittedChoiceId: number;
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  explanation: string;
  currentProgress: number;
  totalQuestion: number;
  correctChoiceId: number | null;
  isChapterCleared: boolean;
  nextChapterId: number | null;
  nextChapterOrderIndex: number | null;
}

export interface GetChapterResultResponse {
  isCleared: boolean;
  correctCount: number;
  totalCount: number;
  scorePercentage: number;
}

export interface ResetChapterRequest {
  chapterId: number;
}
