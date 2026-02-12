import * as S from "./RivalContainer.style";
import State from "./state/State";
import RivalProfileImg from "../../assets/RivalProfile.png";
import VscodeImg from "../../assets/Vscode.svg?url";

const MaxRivals = 4;

export const RivalContainer = () => {
  const rivals: {
    id: number;
    name: string;
    status: "online" | "offline" | "away";
    time: string;
    appName: string;
    appIcon: string;
    profile: string;
  }[] = [
    {
      id: 1,
      name: "황정빈",
      status: "online",
      time: "03:32:12",
      appName: "Visual Studio Code",
      appIcon: VscodeImg,
      profile: RivalProfileImg,
    },
    {
      id: 1,
      name: "황정빈",
      status: "online",
      time: "03:32:12",
      appName: "Visual Studio Code",
      appIcon: VscodeImg,
      profile: RivalProfileImg,
    },
    {
      id: 1,
      name: "황정빈",
      status: "online",
      time: "03:32:12",
      appName: "Visual Studio Code",
      appIcon: VscodeImg,
      profile: RivalProfileImg,
    },
    {
      id: 1,
      name: "황정빈",
      status: "online",
      time: "03:32:12",
      appName: "Visual Studio Code",
      appIcon: VscodeImg,
      profile: RivalProfileImg,
    },
  ];

  return (
    <S.RivalList>
      {rivals.map(rival => (
        <S.RivalBox key={rival.id}>
          <S.RivalInfo>
            <S.RivalProfileImg src={rival.profile} alt="라이벌 프로필" />
            <S.NameText>{rival.name}</S.NameText>
            <State status={rival.status} />
          </S.RivalInfo>

          <S.Timer>
            <S.Vscode>
              <S.VscodeImg src={rival.appIcon} alt="VsCode" />
              <S.VscodeText>{rival.appName}</S.VscodeText>
            </S.Vscode>
            <S.TimeText>{rival.time}</S.TimeText>
          </S.Timer>
        </S.RivalBox>
      ))}

      {rivals.length < MaxRivals && <S.AddRivalBox type="button">+ 라이벌 추가하기</S.AddRivalBox>}
    </S.RivalList>
  );
};
