import * as S from "./HomePage.style";
import { Transition } from "@/features/home/ui/transition/Transition";
import { Rival } from "@/features/home/ui/rival/Rival";
import { Active } from "@/features/home/ui/active/Active";
import { Ranking } from "@/features/home/ui/ranking/Ranking";
import { useHome } from "@/features/home/model/useHome";

export const HomePage = () => {
  const { transition, rival, active, ranking } = useHome();

  return (
    <S.HomeContainer>
      <Transition {...transition}></Transition>
      <Rival {...rival}></Rival>
      <Active {...active}></Active>
      <Ranking {...ranking}></Ranking>
    </S.HomeContainer>
  );
};

// pages 폴더: 순수하게 컴포넌트 렌더링만
// features 폴더: 기능, ui 컴포넌트
// features/{home}/ui: 최대한의 비즈니스 로직(useState, useEffect, 함수, 변수 등)을 제거한 ui만 렌더링
// features/{home}/model/use{home}: 비즈니스 로직만 모아놓은 React Custom Hook, 비즈니스 로직을 모두 수행 후 리턴

// !IMPORTANT
// pages 폴더에서 use{home}을 실행하고, props로 features/ui 컴포넌트에 return 해준다
// 이렇게 하지 않고 컴포넌트에서 바로 use{home}을 실행해 함수를 사용하면 데이터 불일치 문제가 생겨 오류가 발생한다
