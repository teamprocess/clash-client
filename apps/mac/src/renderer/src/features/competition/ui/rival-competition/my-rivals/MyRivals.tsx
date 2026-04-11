import * as S from "./MyRivals.style";
import {
  formatTime,
  resolveProfileDecorations,
  resolveUsingApp,
  useRealtimeRivalActiveTime,
  useRival,
} from "@/shared/lib";
import {
  MyRivalsRequest,
  MyRivalsResponse,
  USER_STATUS_LABELS,
} from "@/entities/competition";
import {
  DefaultProfileIcon,
  QuestionTooltip,
  RankTier,
  RivalsManagementDialog,
  Tooltip,
} from "@/shared/ui";
import { IdeIcons } from "@/shared/ui/assets/ide-img";

interface MyRivalsProps {
  data: MyRivalsResponse;
}

const RivalRow = ({ user }: { user: MyRivalsRequest }) => {
  const displayActiveTime = useRealtimeRivalActiveTime({
    activeTime: user.activeTime,
    isStudying: user.isStudying,
  });
  const { badgeImage, nameplateImage } = resolveProfileDecorations(user.equippedItems);
  const resolvedApp = user.status === "ONLINE" ? resolveUsingApp(user.usingApp) : null;
  const Icon = resolvedApp ? IdeIcons[resolvedApp.id as keyof typeof IdeIcons] : null;
  const identity = (
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
  );

  return (
    <S.ProfileContainer>
      <S.ProfileContent>
        <S.RankTierWrap>
          <RankTier tier={user.tier} />
        </S.RankTierWrap>

        <S.RivalAvatar
          profileImage={user.profileImage}
          badgeImage={badgeImage}
          fallbackIcon={<DefaultProfileIcon />}
          alt="프로필"
        />

        {nameplateImage ? (
          <S.NameplateSurface $image={nameplateImage}>{identity}</S.NameplateSurface>
        ) : (
          identity
        )}

        <S.Status $status={user.status}>{USER_STATUS_LABELS[user.status]}</S.Status>
      </S.ProfileContent>

      <S.PlayTime>
        {resolvedApp && (
          <>
            <S.UsingBox>
              {Icon ? <Icon /> : null}
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

export const MyRivals = ({ data }: MyRivalsProps) => {
  const rival = useRival();
  const rivals = data.myRivals;

  return (
    <>
      <S.ListContent>
        <S.RivalList>
          <S.TitleBox>
            <S.TitleGroup>
              <S.Title>내 라이벌</S.Title>
              <QuestionTooltip
                content="최대 라이벌 수는 4명입니다."
                label="라이벌 최대 인원 안내"
              />
            </S.TitleGroup>
            <S.ArrowBox onClick={rival.handleOpen}>
              라이벌 관리
              <S.DetailArrowIcon />
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
                    위 배틀을 선택하여 배틀의 상세 내용을 확인해보세요!
                  </S.DefaultBattleText>
                </S.DefaultBattleBox>
              </S.DetailWrapper>
            )}
          </S.ProfileWrapper>
        </S.RivalList>
      </S.ListContent>

      {rival.modalOpen && (
        <RivalsManagementDialog
          isOpen={rival.modalOpen}
          onClose={rival.handleClose}
          rival={rival}
        />
      )}
    </>
  );
};
