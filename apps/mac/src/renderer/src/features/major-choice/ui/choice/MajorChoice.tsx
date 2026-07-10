import * as S from "./MajorChoice.style";
import type { MajorProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";
import { ChoiceBox } from "@/features/major-choice/ui/choice-box/ChoiceBox";
import { Major } from "@/entities/major";

export const MajorChoice = ({
  selectedMajor,
  major,
  isValid,
  isSubmittingMajor,
  username,
  onSubmit,
  submitError,
}: MajorProps) => {
  return (
    <>
      <S.ChoiceContainer>
        <S.ChoiceContents>
          <S.ChoiceContentsTop>
            <S.ChoiceTitle>원하는 전공을 선택해주세요!</S.ChoiceTitle>
            <S.ChoiceDescription>
              안녕하세요. {username}님. 원하는 전공을 선택해 주세요.
              <br />
              희망하는 전공을 선택하여 나의 전공에 맞는 로드맵을 수행할 수 있습니다.
            </S.ChoiceDescription>
          </S.ChoiceContentsTop>
          <S.ChoiceWrapper role="group" aria-label="전공 선택">
            <ChoiceBox
              size="md"
              selected={major === Major.WEB}
              icon={<S.WebIcon />}
              label="웹"
              disabled={isSubmittingMajor}
              onClick={() => selectedMajor(Major.WEB)}
            />
            <ChoiceBox
              size="md"
              selected={major === Major.SERVER}
              icon={<S.ServerIcon />}
              label="서버"
              disabled={isSubmittingMajor}
              onClick={() => selectedMajor(Major.SERVER)}
            />
          </S.ChoiceWrapper>
          {submitError && <S.ErrorText role="alert">{submitError}</S.ErrorText>}
          <Button
            variant="primary"
            size="lg"
            disabled={!isValid || isSubmittingMajor}
            isLoading={isSubmittingMajor}
            onClick={onSubmit}
            fullWidth={true}
          >
            {isSubmittingMajor ? <S.SubmitLoading>선택 중...</S.SubmitLoading> : "선택하기"}
          </Button>
        </S.ChoiceContents>
      </S.ChoiceContainer>
    </>
  );
};
