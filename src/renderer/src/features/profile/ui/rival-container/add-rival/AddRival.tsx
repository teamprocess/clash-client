import * as S from "./AddRival.style";

type Props = {
  onClick?: () => void;
};

export function AddRival({ onClick }: Props) {
  return <S.AddBox onClick={onClick}>+ 라이벌 추가하기</S.AddBox>;
}
