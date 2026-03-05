import { useRef, useState, useEffect } from "react";
import { useChapterRankingQuery } from "@/entities/roadmap/chapter/chapter-ranking/api/query/useChapterRanking.query";
import type {
  GetChapterRankingsResponse,
  RankingUser,
} from "@/entities/roadmap/chapter/chapter-ranking/model/chapterRanking.types";

export const useChapterRanking = () => {
  const [isMyRankVisible, setIsMyRankVisible] = useState(true);
  const [stickyPosition, setStickyPosition] = useState<"top" | "bottom">("bottom");
  const myRankRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { data: rankingResponse, isLoading, error } = useChapterRankingQuery();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMyRankVisible(entry.isIntersecting);

        if (entry.rootBounds) {
          const entryCenter = entry.boundingClientRect.top + entry.boundingClientRect.height / 2;
          const rootCenter = entry.rootBounds.top + entry.rootBounds.height / 2;

          if (entryCenter < rootCenter) {
            setStickyPosition("top");
          } else {
            setStickyPosition("bottom");
          }
        }
      },
      {
        root: listRef.current,
        threshold: 1,
      }
    );

    if (myRankRef.current) {
      observer.observe(myRankRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const computeRankers = (data?: GetChapterRankingsResponse | null) => {
    if (!data) return { myData: undefined, allRankers: [] as RankingUser[] };

    const myId = data.myRank?.id;
    const base = data.allRankers ?? [];
    const withMe = myId != null && base.some(u => u.id === myId) ? base : [...base, data.myRank];

    const sorted = [...withMe].sort((a, b) => {
      if (b.completedChaptersCount !== a.completedChaptersCount) {
        return b.completedChaptersCount - a.completedChaptersCount;
      }
      return a.id - b.id; // 동점이면 userId 오름차순
    });

    const ranked = sorted.map((u, idx) => ({ ...u, rank: idx + 1 }));
    const myData = myId != null ? ranked.find(u => u.id === myId) : undefined;
    return { myData, allRankers: ranked };
  };

  const { myData, allRankers } = computeRankers(rankingResponse?.data);

  return {
    isMyRankVisible,
    stickyPosition,
    listRef,
    myData,
    allRankers,
    rankingResponse,
    myRankRef,
    isLoading,
    error,
  };
};
