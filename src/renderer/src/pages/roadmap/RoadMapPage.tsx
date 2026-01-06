import * as S from "./RoadMapPage.style";
import { SelectRoadMapPath } from "@/features/select-roadmap-path";

const username = "조상철";

export const RoadMapPage = () => {
  return (
    <S.RoadMapContainer>
      <S.RoadMapContents>
        <S.RoadMapTop>
          <S.RoadMapTitle>원하는 기능을 선택해주세요!</S.RoadMapTitle>
          <S.RoadMapDescription>
            안녕하세요. {username}님.
            <br />
            원하는 기능을 선택하여 주세요. 전공 성향 검사 기능은 나에게 더 맞는 전공을 탐색하기 위한
            <br />
            기능입니다. 전공 선택 기능은 나의 전공을 선택할 수 있는 기능입니다.
          </S.RoadMapDescription>
        </S.RoadMapTop>
        <SelectRoadMapPath />
      </S.RoadMapContents>
    </S.RoadMapContainer>
  );
};
