import * as S from "./StatusOfRivalsManagement.style";
import { ButtonVariant } from "@/shared/ui";

type RivalLinkingStatus = "ACCEPTED" | "REJECTED" | "PENDING" | "CANCELED";

interface ButtonOfRivalsManagementProps {
  status: RivalLinkingStatus;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const STATUS_UI: Record<
  RivalLinkingStatus,
  {
    title: string;
    variant: ButtonVariant;
  }
> = {
  ACCEPTED: {
    title: "수락됨",
    variant: "accept",
  },
  REJECTED: {
    title: "거절됨",
    variant: "primary",
  },
  PENDING: {
    title: "대기중",
    variant: "pending",
  },
  CANCELED: {
    title: "취소됨",
    variant: "secondary",
  },
};

export const RivalLinkingStatusButton = ({ status, className }: ButtonOfRivalsManagementProps) => {
  const ui = STATUS_UI[status];

  return (
    <S.RivalStatusButton type="button" $variant={ui.variant} className={className}>
      {ui.title}
    </S.RivalStatusButton>
  );
};
