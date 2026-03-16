import { generatePath } from "../utils/pathGenerator";
import { RoadmapNode } from "../components/RoadmapNode";
import * as S from "./Roadmap.style";
import type { Node } from "../roadmapData";

const VIEWBOX_PADDING_X = 90;
const VIEWBOX_PADDING_Y = 110;

interface RoadmapProps {
  nodes: Node[];
  onSelectStage: (stageId: number) => void;
}

export const Roadmap = ({ nodes, onSelectStage }: RoadmapProps) => {
  const xValues = nodes.map(node => node.x);
  const yValues = nodes.map(node => node.y);
  const minX = (xValues.length > 0 ? Math.min(...xValues) : 0) - VIEWBOX_PADDING_X;
  const maxX = (xValues.length > 0 ? Math.max(...xValues) : 900) + VIEWBOX_PADDING_X;
  const minY = (yValues.length > 0 ? Math.min(...yValues) : 0) - VIEWBOX_PADDING_Y;
  const maxY = (yValues.length > 0 ? Math.max(...yValues) : 700) + VIEWBOX_PADDING_Y;
  const width = maxX - minX;
  const height = maxY - minY;
  const viewBox = `${minX} ${minY} ${width} ${height}`;

  // 모든 노드를 기준으로 로드맵 전체 경로를 생성
  const allPath = generatePath(nodes);
  // 상태가 completed인 노드만 필터링
  const completedNodes = nodes.filter(n => n.status === "completed");
  // 완료된 노드들만 다시 path로 연결
  const completedPath = generatePath(completedNodes);

  const handleNodeClick = (nodeId: number) => {
    // 클릭된 nodeId에 해당하는 노드 데이터 탐색
    const node = nodes.find(n => n.id === nodeId);
    // 노드가 없거나, 잠긴 상태라면 클릭 무시
    if (!node || node.status === "locked") return;
    // 검증을 통과한 경우에만 스테이지 변경
    onSelectStage(nodeId);
  };

  return (
    <S.RoadmapSvg
      viewBox={viewBox}
      width={width}
      height={height}
      preserveAspectRatio="xMaxYMax meet"
    >
      <S.PathLine d={allPath} />
      {completedNodes.length > 1 && <S.PathGlow d={completedPath} />}

      {nodes.map(node => (
        <RoadmapNode key={node.id} node={node} onClick={() => handleNodeClick(node.id)} />
      ))}
    </S.RoadmapSvg>
  );
};
