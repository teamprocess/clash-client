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
  questions: Question[];
}

export interface Question {
  id: number;
  title: string;
  choices: Choice[];
  answerId: number;
  explanation: string;
}

export interface Choice {
  id: number;
  text: string;
}
