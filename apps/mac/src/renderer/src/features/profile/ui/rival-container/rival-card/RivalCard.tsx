import * as S from "./RivalCard.style";
import {
  formatTime,
  resolveProfileDecorations,
  resolveUsingApp,
  useRealtimeRivalActiveTime,
} from "@/shared/lib";
import {
  type RivalEquippedItems,
  USER_STATUS_LABELS,
  type UserStatus,
} from "@/entities/competition";
import { IdeIcons } from "@/shared/ui/assets/ide-img";
import { DefaultProfileIcon, RankTier } from "@/shared/ui";

interface RivalCardProps {
  profileSrc: string;
  name: string;
  status: UserStatus;
  activeTime: number;
  usingApp: string | null;
  isStudying: boolean;
  username: string;
  tier: string;
  equippedItems: RivalEquippedItems;
}

export function RivalCard({
  profileSrc,
  name,
  status,
  activeTime,
  usingApp,
  isStudying,
  username,
  tier,
  equippedItems,
}: RivalCardProps) {
  const displayActiveTime = useRealtimeRivalActiveTime({
    activeTime,
    isStudying,
  });
  const { badgeImage, nameplateImage } = resolveProfileDecorations(equippedItems);
  const formattedDisplayTime = formatTime(displayActiveTime);
  const resolvedApp = status === "ONLINE" ? resolveUsingApp(usingApp) : null;
  const Icon = resolvedApp ? IdeIcons[resolvedApp.id as keyof typeof IdeIcons] : null;
  const identity = (
    <S.NameBox>
      <S.Name>{name}</S.Name>
      <S.UserName>{username}</S.UserName>
    </S.NameBox>
  );

  return (
    <S.RivalBox>
      <S.Left>
        <S.RankTierWrap>
          <RankTier tier={tier} />
        </S.RankTierWrap>
        <S.RivalAvatar
          profileImage={profileSrc}
          badgeImage={badgeImage}
          fallbackIcon={<DefaultProfileIcon />}
          alt="라이벌 프로필"
        />
        <S.NameStatus>
          {nameplateImage ? (
            <S.NameplateSurface $image={nameplateImage}>{identity}</S.NameplateSurface>
          ) : (
            identity
          )}
          <S.StatusBadge $status={status}>{USER_STATUS_LABELS[status]}</S.StatusBadge>
        </S.NameStatus>
      </S.Left>

      <S.Right>
        {resolvedApp && (
          <S.AppRow>
            {Icon ? <Icon /> : null}
            <S.AppName>{resolvedApp.name}</S.AppName>
          </S.AppRow>
        )}

        <S.Time>{formattedDisplayTime}</S.Time>
      </S.Right>
    </S.RivalBox>
  );
}
