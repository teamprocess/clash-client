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
