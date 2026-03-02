import * as S from "./Rival.style";
import { useRival } from "@/shared/lib";
import { AddRivalsDialog, Button, MyRivalUsers } from "@/shared/ui";

export const Rival = () => {
  const rival = useRival();

  const rivals = rival.rivalsData?.myRivals ?? [];
  const canAddMore = rivals.length < 4;

  return (
    <S.RivalContainer>
      <S.TitleBox>
        <S.TitleLeft>
          <S.Title>내 라이벌</S.Title>
        </S.TitleLeft>

        <S.RightSIde>
          <Button size={"sm"} variant={"secondary"} onClick={rival.handleOpen}>
            라이벌 관리하러 가기!
          </Button>
          <S.MoreLink to="/competition">
            자세히보기
            <S.DetailArrowIcon />
          </S.MoreLink>
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
        <AddRivalsDialog isOpen={rival.modalOpen} onClose={rival.handleClose} rival={rival} />
      )}
    </S.RivalContainer>
  );
};
