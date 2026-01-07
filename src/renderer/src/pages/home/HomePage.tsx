import * as S from "./HomePage.style";
import { Transition } from "@/pages/home/components/transition/Transition";
import { Rival } from "@/pages/home/components/rival/Rival";
import { Active } from "@/pages/home/components/active/Active";
import { Ranking } from "@/pages/home/components/ranking/Ranking";

export const HomePage = () => {
  return (
    <S.HomeContainer>
      <Transition></Transition>
      <Rival></Rival>
      <Active></Active>
      <Ranking></Ranking>
    </S.HomeContainer>
  );
};
