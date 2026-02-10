import * as S from "./FeatureChoice.style";
import { FeatureProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";

export const FeatureChoice = ({
  selected,
  select,
  username,
  isValid,
  handleFeatureChoiceSubmit,
}: FeatureProps) => {
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
          <S.ChoiceBox onClick={() => select("TEST")} $isSelected={selected === "TEST"}>
            <S.ChoiceItem>
              {selected === "TEST" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.TestIcon />
              <S.ChoiceText>전공 성향 검사</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>

          <S.ChoiceBox onClick={() => select("CHOICE")} $isSelected={selected === "CHOICE"}>
            <S.ChoiceItem>
              {selected === "CHOICE" ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
              <S.ChoiceIcon />
              <S.ChoiceText>전공 선택</S.ChoiceText>
            </S.ChoiceItem>
          </S.ChoiceBox>
        </S.ChoiceWrapper>

        <Button
          variant="primary"
          size="lg"
          disabled={!isValid}
          onClick={handleFeatureChoiceSubmit}
          fullWidth={true}
        >
          선택 완료하기
        </Button>
      </S.RoadMapContents>
    </S.RoadMapContainer>
  );
};
