import { useState } from "react";
import { useMyRivalsQuery } from "@/entities/competition";

type CompeteTab = "ME" | "RIVAL";

export const useCompetition = () => {
  const [competitionTab, setCompetitionTab] = useState<CompeteTab>("ME");

  const { data } = useMyRivalsQuery();

  return {
    myRivalsData: data,
    competitionTab,
    setCompetitionTab,
  };
};
