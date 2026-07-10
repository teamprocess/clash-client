import { ChapterRanking } from "@/features/chapter-ranking";
import { Section } from "@/features/section";
import { SectionProgress } from "@/features/section-progress";

export const RoadmapPage = () => {
  return (
    <Section>
      <ChapterRanking page="chapter" />
      <SectionProgress />
    </Section>
  );
};
