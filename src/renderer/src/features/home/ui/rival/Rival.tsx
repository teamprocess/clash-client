import * as S from "./Rival.style";
import { Link } from "react-router-dom";
import { RivalProps } from "@/features/home/model/useHome"; // 전체 props
import { RivalsProps } from "@/features/home/model/useHome"; // 단독 props

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
          <Rivals key={user.username} user={user} getStatus={getStatus} />
        ))}
      </S.RivalBox>
    </S.RivalContainer>
  );
};

export const Rivals = ({ user, getStatus }: RivalsProps) => {
  return (
    <S.ProfileContainer>
      <S.ProfileBox>
        <S.ProfileContent>
          <S.ProfileIcon />
          <S.NameBox>
            <S.ProfileName>{user.name}</S.ProfileName>
            <S.ProfileMention>@{user.username}</S.ProfileMention>
          </S.NameBox>
        </S.ProfileContent>
        <S.Status $status={user.status}>{getStatus(user.status)}</S.Status>
      </S.ProfileBox>
      <S.ActiveBox>
        <S.UsingAppContainer>
          <S.UsingApp />
          <S.UsingAppText>{user.using_app}</S.UsingAppText>
        </S.UsingAppContainer>
        <S.ActiveTime $status={user.status}>{user.active_time}</S.ActiveTime>
      </S.ActiveBox>
    </S.ProfileContainer>
  );
};
