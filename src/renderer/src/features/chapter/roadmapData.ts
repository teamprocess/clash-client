export type NodeStatus = "completed" | "current" | "locked";

export interface Node {
  id: number;
  x: number;
  y: number;
  status: NodeStatus;
  stars?: number;
}

export const roadmapNodes: Node[] = [
  { id: 1, x: 130, y: 940, status: "locked" },
  { id: 2, x: 400, y: 920, status: "locked" },
  { id: 3, x: 660, y: 910, status: "locked" },
  { id: 4, x: 850, y: 740, status: "locked" },
  { id: 5, x: 740, y: 540, status: "locked" },
  { id: 6, x: 500, y: 490, status: "locked" },
  { id: 7, x: 260, y: 460, status: "locked" },
  { id: 8, x: 60, y: 400, status: "locked" },
  { id: 9, x: 160, y: 220, status: "locked" },
  { id: 10, x: 420, y: 240, status: "locked" },
  { id: 11, x: 670, y: 150, status: "locked" },
  { id: 12, x: 580, y: 0, status: "locked" },
  { id: 13, x: 400, y: -100, status: "locked" },
];
