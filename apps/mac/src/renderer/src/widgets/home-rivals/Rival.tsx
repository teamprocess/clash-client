import * as S from "./Rival.style";
import { RivalsManagementDialog, useRival } from "@/features/rival-management";
import { Button, QuestionTooltip } from "@/shared/ui";
import { MyRivalUsers } from "./MyRivalUsers";
import { getErrorMessage } from "@/shared/lib";

export const Rival = () => {
  const rival = useRival();

  const rivals = rival.rivalsData?.myRivals ?? [];
  const canAddMore = rivals.length < 4;

  return (
    <S.RivalContainer>
      <S.TitleBox>
        <S.TitleLeft>
          <S.Title>내 라이벌</S.Title>
          <QuestionTooltip content="최대 라이벌 수는 4명입니다." label="라이벌 최대 인원 안내" />
        </S.TitleLeft>

        <S.RightSide>
          <S.ArrowBox
            type="button"
            disabled={rival.queries.myRivals.isPending || rival.queries.myRivals.isError}
            onClick={rival.handleOpen}
          >
            라이벌 관리
            <S.DetailArrowIcon aria-hidden />
          </S.ArrowBox>
        </S.RightSide>
      </S.TitleBox>

      {rival.queries.myRivals.isError && rival.rivalsData && (
        <S.RefreshWarning role="alert">
          <span>새 라이벌 정보를 불러오지 못해 이전 결과를 표시해요.</span>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => void rival.queries.myRivals.refetch()}
          >
            다시 시도
          </Button>
        </S.RefreshWarning>
      )}

      <S.RivalBox aria-busy={rival.queries.myRivals.isFetching || undefined}>
        {rival.queries.myRivals.isPending ? (
          <S.RivalState role="status" aria-live="polite">
            <S.RivalStateTitle>라이벌을 불러오는 중이에요.</S.RivalStateTitle>
          </S.RivalState>
        ) : rival.queries.myRivals.isError && !rival.rivalsData ? (
          <S.RivalState role="alert">
            <S.RivalStateTitle>라이벌을 불러오지 못했어요.</S.RivalStateTitle>
            <S.RivalStateDescription>
              {getErrorMessage(rival.queries.myRivals.error, "잠시 후 다시 시도해 주세요.")}
            </S.RivalStateDescription>
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={() => void rival.queries.myRivals.refetch()}
            >
              다시 시도
            </Button>
          </S.RivalState>
        ) : (
          <>
            {rivals.map(user => (
              <MyRivalUsers key={user.username} user={user} />
            ))}

            {canAddMore && (
              <S.AddRivalButton type="button" onClick={rival.handleOpen}>
                <S.AddRivalBox>
                  <S.PlusIcon aria-hidden />
                  <S.AddRivalText>버튼을 눌러 라이벌을 추가할 수 있어요.</S.AddRivalText>
                </S.AddRivalBox>
              </S.AddRivalButton>
            )}
          </>
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
