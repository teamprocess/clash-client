import * as S from "./HomePage.style";
import { Transition } from "@/features/home/ui/transition/Transition";
import { Rival } from "@/features/home/ui/rival/Rival";
import { Active } from "@/features/home/ui/active/Active";
import { Ranking } from "@/features/home/ui/ranking/Ranking";
import { Suspense } from "react";
import { Dialog } from "@/shared/ui";
import { MiniGame } from "@/shared/ui/minigame/ui/MiniGame";

export const HomePage = () => {
  return (
    <S.HomeContainer>
      <Suspense
        fallback={
          <Dialog width={40} height={40} isOpen={true}>
            <MiniGame />
          </Dialog>
        }
      >
        <Transition />
      </Suspense>

      <Suspense fallback={<MiniGame />}>
        <Rival />
      </Suspense>

      <Suspense fallback={<MiniGame />}>
        <Active />
      </Suspense>

      <Suspense fallback={<MiniGame />}>
        <Ranking />
      </Suspense>
    </S.HomeContainer>
  );
};
