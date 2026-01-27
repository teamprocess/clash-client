import * as S from "@/features/home/ui/rival/Rival.style";
import { RivalsProps } from "@/features/home/model/useHome";
import { formatTime } from "@/shared/lib"; // 단독 props

export const MyRivalUsers = ({ user, getStatus }: RivalsProps) => {
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
        <S.ActiveTime $status={user.status}>{formatTime(user.active_time)}</S.ActiveTime>
      </S.ActiveBox>
    </S.ProfileContainer>
  );
};
