export type UserStatus = "ONLINE" | "AWAY" | "OFFLINE";

interface RivalUser {
  name: string;
  username: string;
  profile_image: string;
  active_time: number;
  using_app: string;
  status: UserStatus;
}

interface RivalsResponse {
  data: {
    my_rivals: RivalUser[];
  };
}

export const useMyRivals = () => {
  const RivalsData: RivalsResponse = {
    data: {
      my_rivals: [
        {
          name: "멧돼지",
          username: "seunga_418",
          profile_image: "https://example.com/profile/seunga_418.png",
          active_time: 21522,
          using_app: "Visual Studio Code",
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

  return {
    myRivals: {
      RivalsData,
    },
  };
};
