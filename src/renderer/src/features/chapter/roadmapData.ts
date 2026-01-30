export type NodeStatus = "completed" | "current" | "locked";

export interface Node {
  id: number;
  orderIndex: number;
  x: number;
  y: number;
  status: NodeStatus;
  stars?: number;
}

export const roadmapNodes: Node[] = [
  { id: 1, orderIndex: 0, x: 130, y: 940, status: "locked" },
  { id: 2, orderIndex: 1, x: 400, y: 920, status: "locked" },
  { id: 3, orderIndex: 2, x: 660, y: 910, status: "locked" },
  { id: 4, orderIndex: 3, x: 850, y: 740, status: "locked" },
  { id: 5, orderIndex: 4, x: 740, y: 540, status: "locked" },
  { id: 6, orderIndex: 5, x: 500, y: 490, status: "locked" },
  { id: 7, orderIndex: 6, x: 260, y: 460, status: "locked" },
  { id: 8, orderIndex: 7, x: 60, y: 400, status: "locked" },
  { id: 9, orderIndex: 8, x: 160, y: 220, status: "locked" },
  { id: 10, orderIndex: 9, x: 420, y: 240, status: "locked" },
  { id: 11, orderIndex: 10, x: 670, y: 150, status: "locked" },
  { id: 12, orderIndex: 11, x: 580, y: 0, status: "locked" },
  { id: 13, orderIndex: 12, x: 400, y: -100, status: "locked" },
];
