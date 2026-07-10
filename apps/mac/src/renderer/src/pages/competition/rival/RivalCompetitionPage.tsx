import * as S from "./RivalCompetitionPage.style";
import { RivalCompetition } from "@/features/competition";
import { RivalsManagementDialog, useRival } from "@/features/rival-management";
import { Button } from "@/shared/ui";
import { getErrorMessage } from "@/shared/lib";

export const RivalCompetitionPage = () => {
  const rival = useRival();
  const isEmptyRivals = (rival.rivalsData?.myRivals.length ?? 0) === 0;

  return (
    <S.Wrapper>
      {rival.queries.myRivals.isError && rival.rivalsData && (
        <S.RefreshNotice role="alert">
          <span>새 라이벌 정보를 불러오지 못해 이전 결과를 표시해요.</span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => void rival.queries.myRivals.refetch()}
          >
            다시 시도
          </Button>
        </S.RefreshNotice>
      )}
      {rival.queries.myRivals.isPending ? (
        <S.EmptyState role="status" aria-live="polite">
          <S.EmptyText>라이벌 경쟁 정보를 불러오는 중이에요.</S.EmptyText>
        </S.EmptyState>
      ) : rival.queries.myRivals.isError && !rival.rivalsData ? (
        <S.EmptyState role="alert">
          <S.EmptyText>
            {getErrorMessage(rival.queries.myRivals.error, "라이벌 경쟁 정보를 불러오지 못했어요.")}
          </S.EmptyText>
          <Button
            type="button"
            variant="primary"
            onClick={() => void rival.queries.myRivals.refetch()}
          >
            다시 시도
          </Button>
        </S.EmptyState>
      ) : isEmptyRivals ? (
        <S.EmptyState>
          <S.EmptyText>
            현재 등록된 라이벌이 없습니다. 라이벌을 추가해서 경쟁을 시작해보세요!
          </S.EmptyText>
          <Button variant="primary" onClick={rival.handleOpen}>
            라이벌 추가
          </Button>
        </S.EmptyState>
      ) : rival.rivalsData ? (
        <RivalCompetition data={rival.rivalsData} onManageRivals={rival.handleOpen} />
      ) : null}

      {rival.modalOpen && (
        <RivalsManagementDialog
          isOpen={rival.modalOpen}
          onClose={rival.handleClose}
          rival={rival}
        />
      )}
    </S.Wrapper>
  );
};
