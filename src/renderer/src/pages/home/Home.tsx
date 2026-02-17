import { Active, Ranking, Rival, Transition } from "@/features/home";
import { useTransitionQuery } from "@/entities/home";
import { useMyRivalsQuery } from "@/entities/competition";

export const Home = () => {
  const transitionQuery = useTransitionQuery();
  const myRivalQuery = useMyRivalsQuery();

  return (
    <>
      <Transition data={transitionQuery.data?.data ?? null} />
      <Rival rivalsData={myRivalQuery.data?.data ?? null} />
      <Active />
      <Ranking />
    </>
  );
};
