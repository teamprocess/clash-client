import * as S from "./Rival.style";
import { MyRivalUsers } from "@/features/home/ui/rival/myrival-users/MyRivalUsers";
import { Link } from "react-router-dom";
import { useRival } from "@/features/home/model/useRival";
import { AddRivalsDialog } from "@/features/home/lib/AddRivals";
import { Button } from "@/shared/ui";

export const Rival = () => {
  const rival = useRival();

  return (
    <S.RivalContainer>
      <S.TitleBox>
        <S.ActiveBox style={{ flexDirection: "row", gap: "1rem" }}>
          <S.Title>내 라이벌</S.Title>
          {rival.rivalsData?.myRivals.length !== 0 && (
            <Button size={"sm"} variant={"primary"}>
              라이벌 끊기
            </Button>
          )}
        </S.ActiveBox>
        <Link to="/competition">
          <S.ArrowBox style={{ cursor: "pointer" }}>
            자세히보기
            <S.DetailArrowIcon />
          </S.ArrowBox>
        </Link>
      </S.TitleBox>

      <S.RivalBox>
        {rival.rivalsData?.myRivals.map(user => (
          <MyRivalUsers key={user.username} user={user} getStatus={rival.getStatus} />
        ))}
        {(rival.rivalsData?.myRivals.length ?? 0) < 4 && (
          <S.ProfileContainer onClick={rival.handleOpen} style={{ cursor: "pointer" }}>
            <S.AddRivalBox>
              <S.PlusIcon />
              <S.AddRivalText>버튼을 눌러 라이벌을 추가할 수 있어요.</S.AddRivalText>
            </S.AddRivalBox>
          </S.ProfileContainer>
        )}
      </S.RivalBox>

      {rival.modalOpen && (
        <AddRivalsDialog isOpen={rival.modalOpen} onClose={rival.handleClose} rival={rival} />
      )}
    </S.RivalContainer>
  );
};
