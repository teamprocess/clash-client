import * as S from "./RecordHeader.style";
import { useNavigate } from "react-router-dom";

interface RecordHeaderProps {
  active: "PERSONAL" | "GROUP";
}

export const RecordHeader = ({ active = "PERSONAL" }: RecordHeaderProps) => {
  const navigate = useNavigate();

  return (
    <S.HeaderBox>
      <S.HeaderItem
        $isActive={active === "PERSONAL"}
        onClick={() => {
          navigate("/record");
        }}
      >
        개인 기록
      </S.HeaderItem>
      <S.HeaderItem
        $isActive={active === "GROUP"}
        onClick={() => {
          navigate("/record/group");
        }}
      >
        그룹 스터디
      </S.HeaderItem>
    </S.HeaderBox>
  );
};
