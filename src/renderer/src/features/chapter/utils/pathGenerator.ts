import { RoadmapNode } from "../roadmapData";

export const generatePath = (nodes: RoadmapNode[]): string => {
  if (nodes.length < 2) return "";

  let path = `M ${nodes[0].x} ${nodes[0].y}`;

  for (let i = 0; i < nodes.length - 1; i++) {
    const current = nodes[i];
    const next = nodes[i + 1];

    const controlX = (current.x + next.x) / 2;
    const controlY = (current.y + next.y) / 2 - 5;

    path += ` Q ${controlX} ${controlY}, ${next.x} ${next.y}`;
  }

  return path;
};
