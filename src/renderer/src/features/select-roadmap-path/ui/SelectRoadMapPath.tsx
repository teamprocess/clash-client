import * as S from "./SelectRoadMapPath.style";
import { useSelectPath } from "@/features/select-roadmap-path/model/useSelectPath";

export const SelectRoadMapPath = () => {
  const { selected, select, submit, isValid } = useSelectPath();

  return (
    <>
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
      <S.RoadMapButton disabled={!isValid} onClick={submit}>
        선택 완료하기
      </S.RoadMapButton>
    </>
  );
};
