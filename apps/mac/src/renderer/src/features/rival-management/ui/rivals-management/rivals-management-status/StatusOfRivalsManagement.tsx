import * as S from "./StatusOfRivalsManagement.style";
import type { RivalStatusVariant } from "./StatusOfRivalsManagement.style";

type RivalLinkingStatus = "ACCEPTED" | "REJECTED" | "PENDING" | "CANCELED";

interface ButtonOfRivalsManagementProps {
  status: RivalLinkingStatus;
  className?: string;
}

const STATUS_UI: Record<
  RivalLinkingStatus,
  {
    title: string;
    variant: RivalStatusVariant;
  }
> = {
  ACCEPTED: {
    title: "수락됨",
    variant: "accepted",
  },
  REJECTED: {
    title: "거절됨",
    variant: "rejected",
  },
  PENDING: {
    title: "대기중",
    variant: "pending",
  },
  CANCELED: {
    title: "취소됨",
    variant: "canceled",
  },
};

export const RivalLinkingStatusButton = ({ status, className }: ButtonOfRivalsManagementProps) => {
  const ui = STATUS_UI[status];

  return (
    <S.RivalStatusBadge $variant={ui.variant} className={className}>
      {ui.title}
    </S.RivalStatusBadge>
  );
};
