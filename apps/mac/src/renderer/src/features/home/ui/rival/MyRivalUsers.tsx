import * as S from "./Rival.style";
import { MyRivalsRequest, USER_STATUS_LABELS } from "@/entities/competition";
import {
  formatTime,
  resolveUsingApp,
  useRealtimeRivalActiveTime,
} from "@/shared/lib";
import { DefaultProfileIcon } from "@/shared/ui";
import { IdeIcons } from "@/shared/ui/assets/ide-img";
import { Tooltip } from "@/shared/ui/tooltip";

interface MyRivalUsersProps {
  user: MyRivalsRequest;
}

export const MyRivalUsers = ({ user }: MyRivalUsersProps) => {
  const displayActiveTime = useRealtimeRivalActiveTime({
    activeTime: user.activeTime,
    isStudying: user.isStudying,
  });
  const resolvedApp = user.status === "ONLINE" ? resolveUsingApp(user.usingApp) : null;
  const Icon = resolvedApp ? IdeIcons[resolvedApp.id as keyof typeof IdeIcons] : null;

  return (
    <S.ProfileContainer>
      <S.ProfileBox>
        <S.ProfileContent>
          <S.RivalProfileAvatar
            profileImage={user.profileImage}
            fallbackIcon={<DefaultProfileIcon />}
          />

          <S.NameBox>
            <S.ProfileName>{user.name}</S.ProfileName>
            <Tooltip
              content={user.username}
              position="top"
              maxWidth="10rem"
              wrapperStyle={{ flex: 1, minWidth: 0 }}
            >
              <S.ProfileMention>
                <span>@{user.username}</span>
              </S.ProfileMention>
            </Tooltip>
          </S.NameBox>
        </S.ProfileContent>
        <S.Status $status={user.status}>{USER_STATUS_LABELS[user.status]}</S.Status>
      </S.ProfileBox>

      <S.ActiveBox>
        <S.UsingAppContainer>
          {Icon ? <Icon /> : null}
          {resolvedApp && <S.UsingAppText>{resolvedApp.name}</S.UsingAppText>}
        </S.UsingAppContainer>

        <S.ActiveTime $status={user.status}>{formatTime(displayActiveTime)}</S.ActiveTime>
      </S.ActiveBox>
    </S.ProfileContainer>
  );
};
