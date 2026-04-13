import * as S from "../components/RoadmapNode.style";
import { Node } from "@/features/chapter/roadmapData";

interface RoadmapNodeProps {
  node: Node;
  onClick: () => void;
}

const NODE_RADIUS = 35;
const CHECK_SIZE = NODE_RADIUS * 1.9;
const LOCK_SIZE = NODE_RADIUS * 0.8;
const STAR_WIDTH = NODE_RADIUS * 2;
const STAR_HEIGHT = NODE_RADIUS;
const STAR_VIEWBOX_WIDTH = 65;
const STAR_CENTER_OFFSETS = {
  1: 22.5,
  2: 11.25,
  3: 0,
} as const;

export const RoadmapNode = ({ node, onClick }: RoadmapNodeProps) => {
  const StarIcon =
    node.stars === 1
      ? S.Star1Icon
      : node.stars === 2
        ? S.Star2Icon
        : node.stars === 3
          ? S.Star3Icon
          : null;
  const starOffsetInViewBox =
    node.stars && node.stars in STAR_CENTER_OFFSETS
      ? STAR_CENTER_OFFSETS[node.stars as keyof typeof STAR_CENTER_OFFSETS]
      : 0;
  const starCenterOffset = (starOffsetInViewBox * STAR_WIDTH) / STAR_VIEWBOX_WIDTH;

  return (
    <S.NodeGroup
      onClick={onClick}
      data-roadmap-node-id={node.id}
      data-roadmap-node-order-index={node.orderIndex}
      data-roadmap-node-status={node.status}
    >
      <S.NodeCircle cx={node.x} cy={node.y} r={NODE_RADIUS} $status={node.status} />

      {node.status === "completed" && (
        <S.CheckIcon
          x={node.x - CHECK_SIZE / 2}
          y={node.y - CHECK_SIZE / 2}
          width={CHECK_SIZE}
          height={CHECK_SIZE}
          preserveAspectRatio="xMidYMid meet"
        />
      )}

      {node.status === "current" && (
        <S.NodeNumber x={node.x} y={node.y} textAnchor="middle" dy="0.04em">
          {node.orderIndex + 1}
        </S.NodeNumber>
      )}

      {node.status === "locked" && (
        <S.LockIcon
          x={node.x - LOCK_SIZE / 2}
          y={node.y - LOCK_SIZE / 2}
          width={LOCK_SIZE}
          height={LOCK_SIZE}
          preserveAspectRatio="xMidYMid meet"
        />
      )}

      {node.stars && node.stars > 0 && StarIcon && (
        <StarIcon
          x={node.x - STAR_WIDTH / 2 + starCenterOffset}
          y={node.y - NODE_RADIUS - STAR_HEIGHT - 10}
          width={STAR_WIDTH}
          height={STAR_HEIGHT}
          preserveAspectRatio="xMidYMid meet"
        />
      )}
    </S.NodeGroup>
  );
};
