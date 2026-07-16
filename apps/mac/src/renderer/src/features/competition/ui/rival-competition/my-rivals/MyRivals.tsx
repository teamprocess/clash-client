import * as S from "./MyRivals.style";
import { formatTime, resolveUsingApp, useRealtimeRivalActiveTime } from "@/shared/lib";
import type { MyRivalsRequest, MyRivalsResponse } from "@/entities/rival";
import { USER_STATUS_LABELS } from "@/entities/rival";
import { DefaultProfileIcon, QuestionTooltip, RankTier, Tooltip } from "@/shared/ui";
import { useHelpContent } from "@/entities/help-content";
import { IDEIcons } from "@/shared/ui/assets/ide-img";

interface MyRivalsProps {
  data: MyRivalsResponse;
  onManageRivals: () => void;
}

const RivalRow = ({ user }: { user: MyRivalsRequest }) => {
  const displayActiveTime = useRealtimeRivalActiveTime({
    activeTime: user.activeTime,
    isStudying: user.isStudying,
  });
  const resolvedApp = user.status === "ONLINE" ? resolveUsingApp(user.usingApp) : null;
  const Icon = resolvedApp ? IDEIcons[resolvedApp.id as keyof typeof IDEIcons] : null;

  return (
    <S.ProfileContainer>
      <S.ProfileContent>
        <S.RankTierWrap>
          <RankTier tier={user.tier} />
        </S.RankTierWrap>

        <S.RivalAvatar
          profileImage={user.profileImage}
          fallbackIcon={<DefaultProfileIcon />}
          alt="프로필"
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

        <S.Status $status={user.status}>{USER_STATUS_LABELS[user.status]}</S.Status>
      </S.ProfileContent>

      <S.PlayTime>
        {resolvedApp && (
          <>
            <S.UsingBox>
              {Icon ? <Icon aria-hidden /> : null}
              <S.UsingAppText>{resolvedApp.name}</S.UsingAppText>
            </S.UsingBox>
            <S.Point>·</S.Point>
          </>
        )}

        <S.ActiveTime $status={user.status}>{formatTime(displayActiveTime)}</S.ActiveTime>
      </S.PlayTime>
    </S.ProfileContainer>
  );
};

export const MyRivals = ({ data, onManageRivals }: MyRivalsProps) => {
  const rivals = data.myRivals;
  const rivalLimitTooltipContent = useHelpContent("rival-limit-tooltip");

  return (
    <>
      <S.ListContent>
        <S.RivalList>
          <S.TitleBox>
            <S.TitleGroup>
              <S.Title>내 라이벌</S.Title>
              <QuestionTooltip content={rivalLimitTooltipContent} label="라이벌 최대 인원 안내" />
            </S.TitleGroup>
            <S.ArrowBox type="button" onClick={onManageRivals}>
              라이벌 관리
              <S.DetailArrowIcon aria-hidden />
            </S.ArrowBox>
          </S.TitleBox>

          <S.HorizontalLine />

          <S.ProfileWrapper>
            {rivals.length > 0 ? (
              rivals.map(user => <RivalRow key={user.username} user={user} />)
            ) : (
              <S.DetailWrapper>
                <S.DefaultBattleBox>
                  <S.DefaultBattleText>
                    등록된 라이벌이 없습니다. 라이벌을 추가해 보세요.
                  </S.DefaultBattleText>
                </S.DefaultBattleBox>
              </S.DetailWrapper>
            )}
          </S.ProfileWrapper>
        </S.RivalList>
      </S.ListContent>
    </>
  );
};
