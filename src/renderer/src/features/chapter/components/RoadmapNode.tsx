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

      {node.stars && node.stars > 0 && (
        <>
          {Array.from({ length: node.stars }).map((_, i) => (
            <S.Star key={i} x={node.x - 20 + i * 20} y={node.y - 50}>
              ⭐
            </S.Star>
          ))}
        </>
      )}
    </S.NodeGroup>
  );
};
