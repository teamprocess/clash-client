import * as S from "./RivalCompetitionPage.style";
import { RivalCompetition } from "@/features/competition";
import { useRivalCompetition } from "@/features/competition/model/useRivalCompetition";
import { useRival } from "@/shared/lib";
import { useState } from "react";
import { Button, Dialog, RivalsManagementDialog } from "@/shared/ui";

export const RivalCompetitionPage = () => {
  const { myRivalsData } = useRivalCompetition();
  const rival = useRival();

  const isEmptyRivals = (myRivalsData?.data?.myRivals.length ?? 0) === 0;

  const [isPreDialogOpen, setIsPreDialogOpen] = useState(isEmptyRivals);

  const handleConfirmPreDialog = () => {
    setIsPreDialogOpen(false);
    rival.handleOpen();
  };

  const handleClosePreDialog = () => {
    setIsPreDialogOpen(false);
  };

  return (
    <S.Wrapper>
      {isEmptyRivals ? (
        <S.EmptyText>등록된 라이벌이 없습니다.</S.EmptyText>
      ) : myRivalsData?.data ? (
        <RivalCompetition data={myRivalsData.data} />
      ) : null}

      {isPreDialogOpen && (
        <Dialog width={21.625} height={25.175} isOpen onClose={handleClosePreDialog}>
          <S.PreDialogContainer>
            <S.Content>
              <S.ContentDetail
                style={{
                  gap: "1rem",
                }}
              >
                <S.SmileIcon />
                <S.ContentDetail
                  style={{
                    gap: "0.25rem",
                  }}
                >
                  <S.ContentText>현재 라이벌이 존재하지 않습니다.</S.ContentText>
                  <S.ContentSubText>라이벌을 추가하여 함께 경쟁하며 성장해보세요!</S.ContentSubText>
                </S.ContentDetail>
              </S.ContentDetail>
            </S.Content>
            <Button
              onClick={handleConfirmPreDialog}
              variant={"primary"}
              fullWidth={true}
              size={"lg"}
            >
              라이벌 추가 하기
            </Button>
          </S.PreDialogContainer>
        </Dialog>
      )}

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
