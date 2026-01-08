import * as S from "./MajorChoice.style";
import { useRoadMap } from "@/features/roadmap/model/useRoadMap";

export const MajorChoice = () => {
  const {
    major: { selectedMajor, submit, major, isValid },
  } = useRoadMap();

  return (
    <>
      <S.ChoiceWrapper>
        <S.ChoiceTop>
          <S.ChoiceBox onClick={() => selectedMajor("WEB")} $isSelected={major === "WEB"}>
            <S.ChoiceItem>
              {major === "WEB" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.WebIcon />
              <S.ChoiceText>웹</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
          <S.ChoiceBox onClick={() => selectedMajor("APP")} $isSelected={major === "APP"}>
            <S.ChoiceItem>
              {major === "APP" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.AppIcon />
              <S.ChoiceText>앱</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
          <S.ChoiceBox onClick={() => selectedMajor("SERVER")} $isSelected={major === "SERVER"}>
            <S.ChoiceItem>
              {major === "SERVER" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.ServerIcon />
              <S.ChoiceText>서버</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
        </S.ChoiceTop>
        <S.ChoiceBottom>
          <S.ChoiceBox onClick={() => selectedMajor("AI")} $isSelected={major === "AI"}>
            <S.ChoiceItem>
              {major === "AI" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.AiIcon />
              <S.ChoiceText>Ai</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
          <S.ChoiceBox onClick={() => selectedMajor("GAME")} $isSelected={major === "GAME"}>
            <S.ChoiceItem>
              {major === "GAME" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.GameIcon />
              <S.ChoiceText>게임</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
        </S.ChoiceBottom>
      </S.ChoiceWrapper>
      <S.RoadMapButton disabled={!isValid} onClick={submit}>
        선택 완료하기
      </S.RoadMapButton>
    </>
  );
};
