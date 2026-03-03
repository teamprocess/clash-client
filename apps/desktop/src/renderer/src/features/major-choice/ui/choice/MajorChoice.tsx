import * as S from "./MajorChoice.style";
import { MajorProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";
import { ChoiceBox } from "@/features/major-choice/ui/choice-box/ChoiceBox";

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
            <ChoiceBox
              size="md"
              selected={major === "WEB"}
              icon={<S.WebIcon />}
              label="웹"
              onClick={() => selectedMajor("WEB")}
            />
            <ChoiceBox
              size="md"
              selected={major === "SERVER"}
              icon={<S.ServerIcon />}
              label="서버"
              onClick={() => selectedMajor("SERVER")}
            />
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
