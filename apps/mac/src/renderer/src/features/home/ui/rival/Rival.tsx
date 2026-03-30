import * as S from "./Rival.style";
import { useRival } from "@/shared/lib";
import { MyRivalUsers, QuestionTooltip, RivalsManagementDialog } from "@/shared/ui";

export const Rival = () => {
  const rival = useRival();

  const rivals = rival.rivalsData?.myRivals ?? [];
  const canAddMore = rivals.length < 4;

  return (
    <S.RivalContainer>
      <S.TitleBox>
        <S.TitleLeft>
          <S.Title>내 라이벌</S.Title>
          <QuestionTooltip
            content="라이벌은 최대 4명까지 가능합니다."
            label="라이벌 최대 인원 안내"
          />
        </S.TitleLeft>

        <S.RightSIde>
          <S.ArrowBox onClick={rival.handleOpen}>
            라이벌 관리
            <S.DetailArrowIcon />
          </S.ArrowBox>
        </S.RightSIde>
      </S.TitleBox>

      <S.RivalBox>
        {rivals.map(user => (
          <MyRivalUsers key={user.username} user={user} getStatus={rival.getStatus} />
        ))}

        {canAddMore && (
          <S.AddRivalButton type="button" onClick={rival.handleOpen}>
            <S.AddRivalBox>
              <S.PlusIcon />
              <S.AddRivalText>버튼을 눌러 라이벌을 추가할 수 있어요.</S.AddRivalText>
            </S.AddRivalBox>
          </S.AddRivalButton>
        )}
      </S.RivalBox>

      {rival.modalOpen && (
        <RivalsManagementDialog
          isOpen={rival.modalOpen}
          onClose={rival.handleClose}
          rival={rival}
        />
      )}
    </S.RivalContainer>
  );
};
