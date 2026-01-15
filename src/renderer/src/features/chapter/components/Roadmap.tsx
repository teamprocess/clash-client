import { roadmapNodes } from "../roadmapData";
import { generatePath } from "../utils/pathGenerator";
import { RoadmapNode } from "../components/RoadmapNode";
import * as S from "./Roadmap.style";
import { Dispatch, SetStateAction } from "react";
import { Stage, stagesData } from "@/features/chapter/mocks/missionData";

interface RoadmapProps {
  stageSetFn: Dispatch<SetStateAction<Stage>>;
}

export const Roadmap = ({ stageSetFn }: RoadmapProps) => {
  const allPath = generatePath(roadmapNodes);
  const completedNodes = roadmapNodes.filter(n => n.status === "completed");
  const completedPath = generatePath(completedNodes);

  const handleNodeClick = (nodeId: number) => {
    if (roadmapNodes.find(node => node.id === nodeId)?.status === "locked") return;
    const selectedStage = stagesData.find(s => s.id == nodeId);
    if (!selectedStage) return;
    stageSetFn(selectedStage);
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
