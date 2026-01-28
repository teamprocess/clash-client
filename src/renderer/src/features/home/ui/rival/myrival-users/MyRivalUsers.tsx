import * as S from "@/features/home/ui/rival/Rival.style";
import { formatTime } from "@/shared/lib";
import { MyRivalItem } from "@/features/home/model/useRival"; // 단독 props

export const MyRivalUsers = ({ user, getStatus }: MyRivalItem) => {
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
          <S.UsingAppText>{user.usingApp}</S.UsingAppText>
        </S.UsingAppContainer>
        <S.ActiveTime $status={user.status}>{formatTime(Number(user.activeTime))}</S.ActiveTime>
      </S.ActiveBox>
    </S.ProfileContainer>
  );
};
