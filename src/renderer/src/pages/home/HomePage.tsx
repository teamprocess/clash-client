import * as S from "./HomePage.style";
import { Transition } from "@/features/home/ui/transition/Transition";
import { Rival } from "@/features/home/ui/rival/Rival";
import { Active } from "@/features/home/ui/active/Active";
import { Ranking } from "@/features/home/ui/ranking/Ranking";
import { HomeSectionSuspense } from "@/pages/home/homepage-suspense/HomePageSuspense";

export const HomePage = () => {
  return (
    <S.HomeContainer>
      <HomeSectionSuspense>
        <Transition />
        <Rival />
        <Active />
        <Ranking />
      </HomeSectionSuspense>
    </S.HomeContainer>
  );
};
