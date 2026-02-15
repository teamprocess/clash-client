import * as S from "./HomePage.style";
import { Transition } from "@/features/home/ui/transition/Transition";
import { Rival } from "@/features/home/ui/rival/Rival";
import { Active } from "@/features/home/ui/active/Active";
import { Ranking } from "@/features/home/ui/ranking/Ranking";
import { useIsFetching } from "@tanstack/react-query";
import { Dialog } from "@/shared/ui";
import { MiniGame } from "@/shared/ui/minigame/ui/MiniGame";

export const HomePage = () => {
  const isFetching = useIsFetching();

  // 깃허브 연동 디아로그 추가 버전 2
  return (
    <S.HomeContainer>
      {isFetching > 0 ? (
        <Dialog width={40} height={40} isOpen={true}>
          <S.ConnectingContainer>
            {/*<S.GithubIcon />*/}
            {/*<S.FontBox>*/}
            {/*  <S.HugeFont>깃허브 계정을 연동 중입니다</S.HugeFont>*/}
            {/*  <S.TinyFont>잠시만 기다려주세요.</S.TinyFont>*/}
            {/*</S.FontBox>*/}
            <MiniGame></MiniGame>
          </S.ConnectingContainer>
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

  // 깃허브 연동 디아로그 추가 버전 1
  // return (
  //   <S.HomeContainer>
  //     {isFetching > 0 ? (
  //       <Dialog width={21.5} height={21.5} isOpen={true}>
  //         <S.ConnectingContainer>
  //           <S.GithubIcon />
  //           <S.FontBox>
  //             <S.HugeFont>깃허브 계정을 연동 중입니다</S.HugeFont>
  //             <S.TinyFont>잠시만 기다려주세요.</S.TinyFont>
  //           </S.FontBox>
  //         </S.ConnectingContainer>
  //       </Dialog>
  //     ) : (
  //       <>
  //         <Transition />
  //         <Rival />
  //         <Active />
  //         <Ranking />
  //       </>
  //     )}
  //   </S.HomeContainer>
  // );
};
