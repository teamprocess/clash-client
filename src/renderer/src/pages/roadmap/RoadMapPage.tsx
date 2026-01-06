import * as S from "./RoadMapPage.style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Item = "TEST" | "CHOICE" | null;

const username = "조상철";

export const RoadMapPage = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<Item>(null);

  const handleNextStep = () => {
    if (selectedItem === "TEST") {
      navigate(`/roadmap/test`);
    } else if (selectedItem === "CHOICE") {
      navigate(`/roadmap/choice`);
    }
  };

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
        <S.ChoiceWrapper>
          <S.ChoiceBox
            onClick={() => setSelectedItem("TEST")}
            $isSelected={selectedItem === "TEST"}
          >
            <S.ChoiceItem>
              {selectedItem === "TEST" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.TestIcon />
              <S.ChoiceText>전공 성향 검사</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
          <S.ChoiceBox
            onClick={() => setSelectedItem("CHOICE")}
            $isSelected={selectedItem === "CHOICE"}
          >
            <S.ChoiceItem>
              {selectedItem === "CHOICE" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.ChoiceIcon />
              <S.ChoiceText>전공 선택</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
        </S.ChoiceWrapper>
        <S.RoadMapButton
          disabled={!selectedItem}
          onClick={handleNextStep}
          $isSelected={!!selectedItem}
        >
          선택 완료하기
        </S.RoadMapButton>
      </S.RoadMapContents>
    </S.RoadMapContainer>
  );
};
