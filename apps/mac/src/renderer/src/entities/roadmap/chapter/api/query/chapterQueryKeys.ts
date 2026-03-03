export const chapterQueryKeys = {
  sectionDetails: (sectionId: number) =>
    ["roadmap", "chapter", "sectionDetails", sectionId] as const,
  chapterDetails: (chapterId: number) => ["roadmap", "chapter", "details", chapterId] as const,
};
