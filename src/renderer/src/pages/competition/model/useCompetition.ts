import { useState } from "react";

type CompeteTab = "ME" | "RIVAL";

export const useCompetition = () => {
  const [competitionTab, setCompetitionTab] = useState<CompeteTab>("ME");

  return {
    competition: {
      competitionTab,
      setCompetitionTab,
    },
  };
};
