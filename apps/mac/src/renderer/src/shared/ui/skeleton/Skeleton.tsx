import type { CSSProperties, HTMLAttributes } from "react";
import * as S from "./Skeleton.style";

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: CSSProperties["borderRadius"];
}

export const Skeleton = ({
  width = "100%",
  height = "1rem",
  radius = "0.5rem",
  ...props
}: SkeletonProps) => (
  <S.SkeletonBlock aria-hidden="true" $width={width} $height={height} $radius={radius} {...props} />
);

interface SkeletonRowsProps {
  ariaLabel: string;
  rows?: number;
  showAvatar?: boolean;
  showTrailing?: boolean;
  surface?: boolean;
  compact?: boolean;
  className?: string;
}

export const SkeletonRows = ({
  ariaLabel,
  rows = 4,
  showAvatar = true,
  showTrailing = true,
  surface = false,
  compact = false,
  className,
}: SkeletonRowsProps) => (
  <S.SkeletonStatus className={className} role="status" aria-live="polite" aria-label={ariaLabel}>
    {Array.from({ length: rows }, (_, index) => (
      <S.SkeletonRow key={index} $surface={surface} $compact={compact} aria-hidden="true">
        {showAvatar && <Skeleton width="2.5rem" height="2.5rem" radius="999px" />}
        <S.SkeletonTextGroup>
          <Skeleton width={index % 2 === 0 ? "58%" : "46%"} height="0.95rem" />
          <Skeleton width={index % 3 === 0 ? "38%" : "30%"} height="0.7rem" />
        </S.SkeletonTextGroup>
        {showTrailing && <Skeleton width="3.75rem" height="1.5rem" radius="0.75rem" />}
      </S.SkeletonRow>
    ))}
  </S.SkeletonStatus>
);

interface SkeletonCardsProps {
  ariaLabel: string;
  cards?: number;
  columns?: number;
  className?: string;
}

export const SkeletonCards = ({
  ariaLabel,
  cards = 4,
  columns = 2,
  className,
}: SkeletonCardsProps) => (
  <S.SkeletonCardGrid
    className={className}
    role="status"
    aria-live="polite"
    aria-label={ariaLabel}
    $columns={columns}
  >
    {Array.from({ length: cards }, (_, index) => (
      <S.SkeletonCard key={index} aria-hidden="true">
        <S.SkeletonCardHeader>
          <Skeleton width="2.5rem" height="2.5rem" radius="999px" />
          <S.SkeletonTextGroup>
            <Skeleton width={index % 2 === 0 ? "62%" : "52%"} height="1rem" />
            <Skeleton width="38%" height="0.7rem" />
          </S.SkeletonTextGroup>
        </S.SkeletonCardHeader>
        <Skeleton width="100%" height="3rem" radius="0.75rem" />
      </S.SkeletonCard>
    ))}
  </S.SkeletonCardGrid>
);

interface SkeletonPanelProps {
  ariaLabel?: string;
  className?: string;
  compact?: boolean;
}

export const SkeletonPanel = ({ ariaLabel, className, compact = false }: SkeletonPanelProps) => (
  <S.SkeletonPanel
    className={className}
    role={ariaLabel ? "status" : undefined}
    aria-live={ariaLabel ? "polite" : undefined}
    aria-label={ariaLabel}
    aria-hidden={ariaLabel ? undefined : "true"}
    $compact={compact}
  >
    <Skeleton width="32%" height={compact ? "1rem" : "1.5rem"} />
    <Skeleton width="100%" height={compact ? "0.75rem" : "2.75rem"} radius="0.75rem" />
    <Skeleton width="78%" height={compact ? "0.75rem" : "1rem"} />
    {!compact && <Skeleton width="54%" height="1rem" />}
  </S.SkeletonPanel>
);

interface DashboardCardSkeletonProps {
  ariaLabel?: string;
}

export const DashboardCardSkeleton = ({ ariaLabel }: DashboardCardSkeletonProps) => (
  <S.DashboardCardSkeleton
    role={ariaLabel ? "status" : undefined}
    aria-live={ariaLabel ? "polite" : undefined}
    aria-label={ariaLabel}
  >
    <Skeleton width="34%" height="1.5rem" />
    <Skeleton width="100%" height="1px" radius="0" />
    <Skeleton width="100%" height="42%" radius="0.75rem" />
    <S.DashboardSkeletonRow>
      <Skeleton width="45%" height="28%" radius="0.75rem" />
      <Skeleton width="45%" height="28%" radius="0.75rem" />
    </S.DashboardSkeletonRow>
  </S.DashboardCardSkeleton>
);
