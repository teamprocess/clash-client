import { useMyRivalsQuery } from "@/entities/rival";

export const useRivalCompetition = () => {
  const { data } = useMyRivalsQuery();

  return {
    myRivalsData: data,
  };
};
