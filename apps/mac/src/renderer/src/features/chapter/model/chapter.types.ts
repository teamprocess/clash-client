export type StageStatus = "locked" | "current" | "completed";

export interface Stage {
  id: number;
  orderIndex: number;
  title: string;
  currentProgress: number;
  totalMissions: number;
  missions: Mission[];
  status: StageStatus;
}

export interface Mission {
  id: number;
  title: string;
  completed: boolean;
  currentQuestionIndex: number;
  correctCount: number;
  studyMaterialUrl: string | null;
  questions: Question[];
}

export interface Question {
  id: number;
  content: string;
  choices: Choice[];
  explanation: string;
  orderIndex: number;
  difficulty: number;
}

export interface Choice {
  id: number;
  content: string;
}
