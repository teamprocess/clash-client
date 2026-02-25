import * as S from "./AddRival.style";

interface AddRivalProps {
  onClick?: () => void;
}

export function AddRival({ onClick }: AddRivalProps) {
  return <S.AddBox onClick={onClick}>+ 라이벌 추가하기</S.AddBox>;
}
