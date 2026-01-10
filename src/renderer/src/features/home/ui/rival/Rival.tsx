import * as S from "./Rival.style";
import { Link } from "react-router-dom";
import { RivalProps } from "@/features/home/model/useHome"; // 전체 props
import { MyRivalUsers } from "@/features/home/ui/rival/myrival-users/MyRivalUsers";

export const Rival = ({ RivalsData, getStatus }: RivalProps) => {
  return (
    <S.RivalContainer>
      <S.TitleBox>
        <S.Title>내 라이벌</S.Title>
        <Link to="">
          <S.ArrowBox>
            자세히보기
            <S.DetailArrowIcon />
          </S.ArrowBox>
        </Link>
      </S.TitleBox>

      <S.RivalBox>
        {RivalsData.data.my_rivals.map(user => (
          <MyRivalUsers key={user.username} user={user} getStatus={getStatus} />
        ))}
      </S.RivalBox>
    </S.RivalContainer>
  );
};
