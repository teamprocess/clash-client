import * as S from "./HomePage.style";
import { Transition } from "@/features/home/ui/transition/Transition";
import { Rival } from "@/features/home/ui/rival/Rival";
import { Active } from "@/features/home/ui/active/Active";
import { Ranking } from "@/features/home/ui/ranking/Ranking";
import { Dialog } from "@/shared/ui";
import { useHomeQuery } from "@/pages/home/useHomeQuery";

export const HomePage = () => {
  const { isLoading } = useHomeQuery();

  return (
    <S.HomeContainer>
      {isLoading && (
        <Dialog width={21.5} height={21.5} isOpen={true}>
          <S.ConnectingContainer>
            <S.GithubIcon />
            <S.FontBox>
              <S.HugeFont>깃허브 계정을 연동 중입니다</S.HugeFont>
              <S.TinyFont>잠시만 기다려주세요.</S.TinyFont>
            </S.FontBox>
          </S.ConnectingContainer>
        </Dialog>
      )}

      <Transition />
      <Rival />
      <Active />
      <Ranking />
    </S.HomeContainer>
  );
};
