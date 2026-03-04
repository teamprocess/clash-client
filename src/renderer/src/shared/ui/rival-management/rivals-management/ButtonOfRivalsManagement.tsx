import { Button, ButtonVariant } from "@/shared/ui";

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
    disabled?: boolean;
  }
> = {
  ACCEPTED: {
    title: "수락됨",
    variant: "accept",
    disabled: true,
  },
  REJECTED: {
    title: "거절됨",
    variant: "primary",
    disabled: true,
  },
  PENDING: {
    title: "대기중",
    variant: "primary",
  },
  CANCELED: {
    title: "취소됨",
    variant: "secondary",
    disabled: true,
  },
};

export const RivalLinkingStatusButton = ({
  status,
  onClick,
  size = "sm",
  className,
}: ButtonOfRivalsManagementProps) => {
  const ui = STATUS_UI[status];

  return (
    <Button
      size={size}
      variant={ui.variant}
      disabled={ui.disabled}
      onClick={ui.disabled ? undefined : onClick}
      className={className}
    >
      {ui.title}
    </Button>
  );
};
