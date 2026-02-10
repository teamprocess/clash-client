import * as S from "./MajorChoice.style";
import { MajorProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";

export const MajorChoice = ({ selectedMajor, major, isValid, username, onSubmit }: MajorProps) => {
  return (
    <>
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
          <Button
            variant="primary"
            size="lg"
            disabled={!isValid}
            onClick={onSubmit}
            fullWidth={true}
          >
            선택 완료하기
          </Button>
        </S.ChoiceContents>
      </S.ChoiceContainer>
    </>
  );
};
