import * as S from "./Rival.style";
import { MyRivalUsers } from "@/features/home/ui/rival/myrival-users/MyRivalUsers";
import { useRival } from "@/shared/lib/useRival";
import { AddRivalsDialog, DeleteRivalsDialog } from "@/features/home/lib";
import { Button } from "@/shared/ui";

export const Rival = () => {
  const rival = useRival();

  const rivals = rival.rivalsData?.myRivals ?? [];
  const hasRivals = rivals.length > 0;
  const canAddMore = rivals.length < 4;

  return (
    <S.RivalContainer>
      <S.TitleBox>
        <S.TitleLeft>
          <S.Title>내 라이벌</S.Title>
          {hasRivals && (
            <Button size="sm" variant="primary" onClick={rival.handleDeleteModalOpen}>
              라이벌 끊기
            </Button>
          )}
        </S.TitleLeft>

        <S.MoreLink to="/competition">
          자세히보기
          <S.DetailArrowIcon />
        </S.MoreLink>
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
        <AddRivalsDialog isOpen={rival.modalOpen} onClose={rival.handleClose} rival={rival} />
      )}

      {rival.rivalDeleteOpen && (
        <DeleteRivalsDialog
          isOpen={rival.rivalDeleteOpen}
          onClose={rival.handleDeleteModalClose}
          rival={rival}
        />
      )}
    </S.RivalContainer>
  );
};
