import * as S from "./State.style";

interface StateTagProps {
  status: S.Status;
}

const label = {
  online: "온라인",
  offline: "오프라인",
  away: "자리비움",
} as const;

export function StateTag({ status }: StateTagProps) {
  return <S.StateTag $status={status}>{label[status]}</S.StateTag>;
}
