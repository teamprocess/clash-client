import * as S from "./FeatureChoice.style";
import { FeatureProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";
import { ChoiceBox } from "../choice-box/ChoiceBox";

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
            안녕하세요. {username}님. 원하는 기능을 선택하여 주세요.
            <br />
            선택한 기능에 따라 전공을 검사하거나 나의 전공을 선택할 수 있습니다.
          </S.RoadMapDescription>
        </S.RoadMapTop>

        <S.ChoiceWrapper>
          <ChoiceBox
            size="md"
            selected={selected === "TEST"}
            icon={<S.TestIcon />}
            label="전공 성향 검사"
            onClick={() => select("TEST")}
          />
          <ChoiceBox
            size="md"
            selected={selected === "CHOICE"}
            icon={<S.ChoiceIcon />}
            label="전공 선택"
            onClick={() => select("CHOICE")}
          />
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
