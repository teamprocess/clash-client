import * as S from "./RivalCompetitionPage.style";
import { RivalCompetition } from "@/features/competition";
import { useRivalCompetition } from "@/features/competition/model/useRivalCompetition";
import { useRival } from "@/shared/lib";
import { Button, RivalsManagementDialog } from "@/shared/ui";

export const RivalCompetitionPage = () => {
  const { myRivalsData } = useRivalCompetition();
  const rival = useRival();
  const isEmptyRivals = (myRivalsData?.data?.myRivals.length ?? 0) === 0;

  return (
    <S.Wrapper>
      {isEmptyRivals ? (
        <S.EmptyState>
          <S.EmptyText>
            현재 등록된 라이벌이 없습니다. 라이벌을 추가해서 경쟁을 시작해보세요!
          </S.EmptyText>
          <Button variant="primary" onClick={rival.handleOpen}>
            라이벌 추가
          </Button>
        </S.EmptyState>
      ) : myRivalsData?.data ? (
        <RivalCompetition data={myRivalsData.data} />
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
