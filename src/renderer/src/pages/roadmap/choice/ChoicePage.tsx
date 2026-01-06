import * as S from "./ChoicePage.style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Item = "WEB" | "APP" | "SERVER" | "AI" | "GAME" | null;

const username = "조상철";

export const ChoicePage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Item>(null);

  const select = (path: Item) => setSelected(path);

  const submit = () => {
    if (selected) {
      navigate(`/roadmap/${selected.toLocaleLowerCase()}`);
    }
  };

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
        <S.RoadMapButton disabled={selected === null} onClick={submit}>
          선택 완료하기
        </S.RoadMapButton>
      </S.ChoiceContents>
    </S.ChoiceContainer>
  );
};
