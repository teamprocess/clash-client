import { generatePath } from "../utils/pathGenerator";
import { RoadmapNode } from "../components/RoadmapNode";
import * as S from "./Roadmap.style";

type RoadmapNodeType = {
  id: number;
  x: number;
  y: number;
  status: "locked" | "current" | "completed";
  label: string;
};

interface RoadmapProps {
  nodes: RoadmapNodeType[];
  onSelectStage: (stageId: number) => void;
}

export const Roadmap = ({ nodes, onSelectStage }: RoadmapProps) => {
  const allPath = generatePath(nodes);
  const completedNodes = nodes.filter(n => n.status === "completed");
  const completedPath = generatePath(completedNodes);

  const handleNodeClick = (nodeId: number) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node || node.status === "locked") return;

    onSelectStage(nodeId);
  };

  return (
    <S.RoadmapSvg viewBox="0 0 900 700">
      <S.PathLine d={allPath} />
      {completedNodes.length > 1 && <S.PathGlow d={completedPath} />}

      {nodes.map(node => (
        <RoadmapNode key={node.id} node={node} onClick={() => handleNodeClick(node.id)} />
      ))}
    </S.RoadmapSvg>
  );
};
