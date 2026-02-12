import State from "../state/State";
import * as S from "./RivalCard.style";
import type { Status } from "../state/State.style";

type Props = {
  profileSrc: string;
  name: string;
  status: Status;
};

export default function RivalCard({ profileSrc, name, status }: Props) {
  return (
    <S.RivalBox>
      <S.RivalInfo>
        <S.RivalProfileImg src={profileSrc} alt="라이벌 프로필" />
        <S.NameText>{name}</S.NameText>
        <State status={status} />
      </S.RivalInfo>
    </S.RivalBox>
  );
}
