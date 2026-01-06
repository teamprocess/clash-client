import * as S from "./ChoicePage.style";
import { ChoiceRoadMap } from "@/features/choice-roadmap";

const username = "조상철";

export const ChoicePage = () => {
  return (
    <S.ChoiceContainer>
      <S.ChoiceContents>
        <S.ChoiceContentsTop>
          <S.ChoiceTitle>원하는 전공을 선택해주세요!</S.ChoiceTitle>
          <S.ChoiceDescription>
            안녕하세요. {username}님. 원하는 전공을 선택하여 주세요.
            <br />
            희망하는 전공을 선택하여 나의 전공에 맞는 로드맵을 수행할 수 있습니다.
          </S.ChoiceDescription>
        </S.ChoiceContentsTop>
        <ChoiceRoadMap />
      </S.ChoiceContents>
    </S.ChoiceContainer>
  );
};
