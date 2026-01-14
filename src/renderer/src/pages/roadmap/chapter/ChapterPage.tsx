import * as S from "./ChapterPage.style";
import { useEffect, useRef } from "react";
import { ChapterRanking } from "@/features/chapter-ranking";
import { SectionProgress } from "@/features/section-progress";

export const ChapterPage = () => {
  const chapterRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!chapterRef.current) return;
    const child = chapterRef.current.childNodes.item(0) as HTMLDivElement;
    const scrolledSize = chapterRef.current.scrollTop + chapterRef.current.offsetHeight;

    const canScroll = scrolledSize <= chapterRef.current.scrollHeight - child.offsetWidth;
    if (!canScroll)
      chapterRef.current.scrollTo(
        chapterRef.current.scrollWidth,
        chapterRef.current.scrollHeight - chapterRef.current.offsetHeight - child.offsetWidth
      );
  };

  useEffect(() => {
    if (!chapterRef.current) return;
    chapterRef.current.scrollTo(chapterRef.current.scrollWidth, chapterRef.current.scrollHeight);
  }, [chapterRef]);

  useEffect(() => {
    if (!chapterRef.current) return;
    const chapter = chapterRef.current;
    chapter.addEventListener("scroll", handleScroll);
    return () => {
      chapter.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.ChapterContainer>
      <S.ChapterScrollable ref={chapterRef}>
        {Array(400)
          .fill(null)
          .map((_, idx) => (
            <S.Square key={idx}></S.Square>
          ))}
        <S.RoadmapWrapper />
      </S.ChapterScrollable>
      <ChapterRanking page={"chapter"} />
      <SectionProgress />
    </S.ChapterContainer>
  );
};
