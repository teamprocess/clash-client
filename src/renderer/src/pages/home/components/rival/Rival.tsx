import * as S from "./Rival.style";

type UserStatus = "ONLINE" | "AWAY" | "OFFLINE";

interface RivalUser {
  name: string;
  username: string;
  profile_image: string;
  active_time: number;
  using_app: string;
  status: UserStatus;
}

interface RivalsProps {
  user: RivalUser;
}

interface RivalsResponse {
  data: {
    total_count: number;
    my_rivals: RivalUser[];
  };
}

const RivalsData: RivalsResponse = {
  data: {
    total_count: 4,
    my_rivals: [
      {
        name: "멧돼지",
        username: "seunga_418",
        profile_image: "https://example.com/profile/seunga_418.png",
        active_time: 21522,
        using_app: "VSCode",
        status: "ONLINE",
      },
      {
        name: "채근영",
        username: "chaeyn",
        profile_image: "https://example.com/profile/chaeyn.png",
        active_time: 18340,
        using_app: "IntelliJ",
        status: "AWAY",
      },
      {
        name: "한승환",
        username: "h.7xn",
        profile_image: "https://example.com/profile/h7xn.png",
        active_time: 9720,
        using_app: "Chrome",
        status: "OFFLINE",
      },
      {
        name: "권대형",
        username: "gorani",
        profile_image: "https://example.com/profile/gorani.png",
        active_time: 14380,
        using_app: "Notion",
        status: "ONLINE",
      },
    ],
  },
};

export const Rival = () => {
  return (
    <S.RivalContainer>
      <S.Title>내 라이벌</S.Title>

      <S.RivalBox>
        {RivalsData.data.my_rivals.map(user => (
          <Rivals key={user.username} user={user} />
        ))}
      </S.RivalBox>
    </S.RivalContainer>
  );
};

export const Rivals = ({ user }: RivalsProps) => {
  const getStatus = (status: UserStatus) => {
    switch (status) {
      case "ONLINE":
        return "온라인";
      case "AWAY":
        return "자리비움";
      case "OFFLINE":
        return "오프라인";
      default:
        return "";
    }
  };

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
