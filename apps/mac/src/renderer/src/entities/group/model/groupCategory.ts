export const GROUP_CATEGORIES = ["CLUB", "CLASS", "TEAM", "NARSHA", "ETC"] as const;

export type GroupCategory = (typeof GROUP_CATEGORIES)[number];

export const GROUP_CATEGORY_FILTERS = ["ALL", "CLUB", "CLASS", "TEAM", "NARSHA", "ETC"] as const;

export type GroupCategoryFilter = (typeof GROUP_CATEGORY_FILTERS)[number];

export const GROUP_CATEGORY_LABELS: Record<GroupCategory, string> = {
  CLUB: "동아리",
  CLASS: "반",
  TEAM: "팀",
  NARSHA: "나르샤",
  ETC: "기타",
};
