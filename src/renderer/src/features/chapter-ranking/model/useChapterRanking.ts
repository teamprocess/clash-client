import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { rankingApi } from "@/entities/roadmap/chapter/chapter-ranking/api/chapterRankingApi";

export const useChapterRanking = () => {
  const [isMyRankVisible, setIsMyRankVisible] = useState(true);
  const [stickyPosition, setStickyPosition] = useState<"top" | "bottom">("bottom");
  const myRankRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // API 호출
  const {
    data: rankingResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chapterRankings"],
    queryFn: rankingApi.getChapterRankings,
  });

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

  const myData = rankingResponse?.data?.myRank;
  const allRankers = rankingResponse?.data?.allRankers || [];

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
