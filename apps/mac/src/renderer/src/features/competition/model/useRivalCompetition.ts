import { useMyRivalsQuery } from "@/entities/competition";

export const useRivalCompetition = () => {
  const { data } = useMyRivalsQuery();

  return {
    myRivalsData: data,
  };
};
