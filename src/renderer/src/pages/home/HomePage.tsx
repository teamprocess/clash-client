import * as S from "./HomePage.style";
import { Transition } from "@/features/home/ui/transition/Transition";
import { Rival } from "@/features/home/ui/rival/Rival";
import { Active } from "@/features/home/ui/active/Active";
import { Ranking } from "@/features/home/ui/ranking/Ranking";
import { useIsFetching } from "@tanstack/react-query";
import { Dialog } from "@/shared/ui";

export const HomePage = () => {
  const isFetching = useIsFetching();

  return (
    // 깃허브 연동 디아로그 추가 버전
    <S.HomeContainer>
      {isFetching > 0 ? (
        <Dialog width={21.5} height={21.5} isOpen={true}>
          연결중입니다..
        </Dialog>
      ) : (
        <>
          <Transition />
          <Rival />
          <Active />
          <Ranking />
        </>
      )}
    </S.HomeContainer>
  );

  // 기존
  // return (
  //   <S.HomeContainer>
  //     <Transition />
  //     <Rival />
  //     <Active />
  //     <Ranking />
  //   </S.HomeContainer>
  // );
};
