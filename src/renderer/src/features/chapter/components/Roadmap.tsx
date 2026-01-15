import { roadmapNodes } from "../roadmapData";
import { generatePath } from "../utils/pathGenerator";
import { RoadmapNode } from "../components/RoadmapNode";
import * as S from "./Roadmap.style";

export const Roadmap = () => {
  const allPath = generatePath(roadmapNodes);
  const completedNodes = roadmapNodes.filter(n => n.status === "completed");
  const completedPath = generatePath(completedNodes);

  const handleNodeClick = (nodeId: number) => {
    console.log("Node clicked:", nodeId);
    // 여기에 클릭 로직 추가
  };

  return (
    <S.RoadmapSvg viewBox="0 0 900 700">
      {/* 전체 경로 배경 */}
      <S.PathLine d={allPath} />

      {/* 완료된 경로 빛나는 효과 */}
      {completedNodes.length > 1 && <S.PathGlow d={completedPath} />}

      {/* 노드들 */}
      {roadmapNodes.map(node => (
        <RoadmapNode key={node.id} node={node} onClick={() => handleNodeClick(node.id)} />
      ))}
    </S.RoadmapSvg>
  );
};
