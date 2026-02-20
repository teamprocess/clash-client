import * as S from "./Rival.style";
import { MyRivalUsers } from "@/features/home/ui/rival/myrival-users/MyRivalUsers";
import { Link } from "react-router-dom";
import { useRival } from "@/features/home/model/useRival";
import { AddRivalsDialog } from "@/features/home/lib/AddRivals";

export const Rival = () => {
  const getRivalData = useRival();

  return (
    <S.RivalContainer>
      <S.TitleBox>
        <S.Title>내 라이벌</S.Title>
        <Link to="/competition">
          <S.ArrowBox style={{ cursor: "pointer" }}>
            자세히보기
            <S.DetailArrowIcon />
          </S.ArrowBox>
        </Link>
      </S.TitleBox>

      <S.RivalBox>
        {getRivalData.rivalsData?.myRivals.map(user => (
          <MyRivalUsers key={user.username} user={user} getStatus={getRivalData.getStatus} />
        ))}
        {(getRivalData.rivalsData?.myRivals.length ?? 0) < 4 && (
          <S.ProfileContainer onClick={getRivalData.handleOpen} style={{ cursor: "pointer" }}>
            <S.AddRivalBox>
              <S.PlusIcon />
              <S.AddRivalText>버튼을 눌러 라이벌을 추가할 수 있어요.</S.AddRivalText>
            </S.AddRivalBox>
          </S.ProfileContainer>
        )}
      </S.RivalBox>

      {getRivalData.modalOpen && (
        <AddRivalsDialog isOpen={getRivalData.modalOpen} onClose={getRivalData.handleClose} />
      )}
    </S.RivalContainer>
  );
};
