import * as S from "./MajorChoice.style";
import { MajorProps } from "@/features/major-choice/model/useMajorChoice";
import { ChoiceBox } from "@/features/major-choice/ui/choice-box/ChoiceBox";

export const MajorChoice = ({ selectedMajor, major, isValid, username, onSubmit }: MajorProps) => {
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
            <ChoiceBox
              size="sm"
              selected={major === "WEB"}
              icon={<S.WebIcon />}
              label="웹"
              onClick={() => selectedMajor("WEB")}
            />
            <ChoiceBox
              size="sm"
              selected={major === "APP"}
              icon={<S.AppIcon />}
              label="앱"
              onClick={() => selectedMajor("APP")}
            />
            <ChoiceBox
              size="sm"
              selected={major === "SERVER"}
              icon={<S.ServerIcon />}
              label="서버"
              onClick={() => selectedMajor("SERVER")}
            />
          </S.ChoiceTop>

          <S.ChoiceBottom>
            <ChoiceBox
              size="sm"
              selected={major === "AI"}
              icon={<S.AiIcon />}
              label="AI"
              onClick={() => selectedMajor("AI")}
            />
            <ChoiceBox
              size="sm"
              selected={major === "GAME"}
              icon={<S.GameIcon />}
              label="게임"
              onClick={() => selectedMajor("GAME")}
            />
          </S.ChoiceBottom>
        </S.ChoiceWrapper>

        <S.RoadMapButton disabled={!isValid} onClick={onSubmit}>
          선택 완료하기
        </S.RoadMapButton>
      </S.ChoiceContents>
    </S.ChoiceContainer>
  );
};
