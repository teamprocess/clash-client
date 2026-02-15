import { Suspense, ReactNode } from "react";
import { Dialog } from "@/shared/ui";
// import { MiniGame } from "@/shared/ui/minigame/ui/MiniGame";
import * as S from "./HomePageSuspense.style";

interface HomeSuspenseProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const HomeSectionSuspense = ({ children, fallback }: HomeSuspenseProps) => {
  return (
    <Suspense
      fallback={
        fallback ?? (
          <Dialog width={21.5} height={21.5} isOpen={true}>
            <S.ConnectingContainer>
              <S.GithubIcon />
              <S.FontBox>
                <S.HugeFont>깃허브 계정을 연동 중입니다</S.HugeFont>
                <S.TinyFont>잠시만 기다려주세요.</S.TinyFont>
              </S.FontBox>
            </S.ConnectingContainer>
          </Dialog>
        )
      }
    >
      {children}
    </Suspense>
  );
};

// 초기 사용자 서스펜스
// export const HomeBootSuspense = ({ children, fallback }: HomeSuspenseProps) => {
//   const defaultFallback = <MiniGame />;
//
//   return <Suspense fallback={fallback ?? defaultFallback}>{children}</Suspense>;
// };
