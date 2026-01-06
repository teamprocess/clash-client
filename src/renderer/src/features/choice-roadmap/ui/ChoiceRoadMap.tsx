import * as S from "./ChoiceRoadMap.style";
import { useChoiceRoadMap } from "@/features/choice-roadmap/model/useChoiceRoadMap";

export const ChoiceRoadMap = () => {
  const { selected, select, submit, isValid } = useChoiceRoadMap();

  return (
    <>
      <S.ChoiceWrapper>
        <S.ChoiceTop>
          <S.ChoiceBox onClick={() => select("WEB")} $isSelected={selected === "WEB"}>
            <S.ChoiceItem>
              {selected === "WEB" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.WebIcon />
              <S.ChoiceText>웹</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
          <S.ChoiceBox onClick={() => select("APP")} $isSelected={selected === "APP"}>
            <S.ChoiceItem>
              {selected === "APP" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.AppIcon />
              <S.ChoiceText>앱</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
          <S.ChoiceBox onClick={() => select("SERVER")} $isSelected={selected === "SERVER"}>
            <S.ChoiceItem>
              {selected === "SERVER" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.ServerIcon />
              <S.ChoiceText>서버</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
        </S.ChoiceTop>
        <S.ChoiceBottom>
          <S.ChoiceBox onClick={() => select("AI")} $isSelected={selected === "AI"}>
            <S.ChoiceItem>
              {selected === "AI" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.AiIcon />
              <S.ChoiceText>Ai</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
          <S.ChoiceBox onClick={() => select("GAME")} $isSelected={selected === "GAME"}>
            <S.ChoiceItem>
              {selected === "GAME" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
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
