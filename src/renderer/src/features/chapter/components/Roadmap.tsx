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
  };

  return (
    <S.RoadmapSvg viewBox="0 0 900 700">
      <S.PathLine d={allPath} />

      {completedNodes.length > 1 && <S.PathGlow d={completedPath} />}

      {roadmapNodes.map(node => (
        <RoadmapNode key={node.id} node={node} onClick={() => handleNodeClick(node.id)} />
      ))}
    </S.RoadmapSvg>
  );
};
