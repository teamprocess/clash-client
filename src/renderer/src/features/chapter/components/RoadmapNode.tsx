import * as S from "../components/RoadmapNode.style";
import { Node } from "@/features/chapter/roadmapData";

interface RoadmapNodeProps {
  node: Node;
  onClick: () => void;
}

export const RoadmapNode = ({ node, onClick }: RoadmapNodeProps) => {
  const R = 35;
  const CHECK_SIZE = R * 1.9;
  const LOCK_SIZE = R * 0.8;
  const STAR_WIDTH = R * 2;
  const STAR_HEIGHT = R;

  const StarIcon =
    node.stars === 1
      ? S.Star1Icon
      : node.stars === 2
        ? S.Star2Icon
        : node.stars === 3
          ? S.Star3Icon
          : null;

  return (
    <S.NodeGroup onClick={onClick}>
      <S.NodeCircle cx={node.x} cy={node.y} r={R} $status={node.status} />

      {node.status === "completed" && (
        <g transform={`translate(${node.x - CHECK_SIZE / 2}, ${node.y - CHECK_SIZE / 2})`}>
          <S.CheckIcon $width={CHECK_SIZE} $height={CHECK_SIZE} />
        </g>
      )}

      {node.status === "current" && (
        <S.NodeNumber x={node.x} y={node.y + 12} textAnchor="middle">
          {node.id}
        </S.NodeNumber>
      )}

      {node.status === "locked" && (
        <g transform={`translate(${node.x - LOCK_SIZE / 2}, ${node.y - LOCK_SIZE / 2})`}>
          <S.LockIcon $width={LOCK_SIZE} $height={LOCK_SIZE} />
        </g>
      )}

      {node.stars && node.stars > 0 && StarIcon && (
        <g transform={`translate(${node.x - STAR_WIDTH / 2}, ${node.y - R - STAR_HEIGHT - 10})`}>
          <StarIcon $width={STAR_WIDTH} $height={STAR_HEIGHT} />
        </g>
      )}
    </S.NodeGroup>
  );
};
