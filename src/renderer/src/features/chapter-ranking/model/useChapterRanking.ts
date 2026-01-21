import React, { useRef, useState, useEffect } from "react";

const rankingResponse = {
  data: {
    myRanking: {
      rank: 12,
      id: 12,
      name: "배수아",
      completedChapterCount: 78,
    },
    allRankers: [
      { rank: 1, id: 1, name: "김민준", completedChapterCount: 100 },
      { rank: 2, id: 2, name: "이서연", completedChapterCount: 98 },
      { rank: 3, id: 3, name: "박지훈", completedChapterCount: 96 },
      { rank: 4, id: 4, name: "최유진", completedChapterCount: 94 },
      { rank: 5, id: 5, name: "정도현", completedChapterCount: 92 },
      { rank: 6, id: 6, name: "한예린", completedChapterCount: 90 },
      { rank: 7, id: 7, name: "오세훈", completedChapterCount: 88 },
      { rank: 8, id: 8, name: "윤지우", completedChapterCount: 86 },
      { rank: 9, id: 9, name: "장민수", completedChapterCount: 84 },
      { rank: 10, id: 10, name: "서하늘", completedChapterCount: 82 },
      { rank: 11, id: 11, name: "문준혁", completedChapterCount: 80 },
      { rank: 12, id: 12, name: "배수아", completedChapterCount: 78 },
      { rank: 13, id: 13, name: "신도윤", completedChapterCount: 76 },
      { rank: 14, id: 14, name: "김예은", completedChapterCount: 74 },
      { rank: 15, id: 15, name: "류현우", completedChapterCount: 72 },
      { rank: 16, id: 16, name: "조하린", completedChapterCount: 70 },
      { rank: 17, id: 17, name: "임재원", completedChapterCount: 68 },
      { rank: 18, id: 18, name: "노아린", completedChapterCount: 66 },
      { rank: 19, id: 19, name: "강도윤", completedChapterCount: 64 },
      { rank: 20, id: 20, name: "백지민", completedChapterCount: 62 },
    ],
  },
};

export const useChapterRanking = () => {
  const [isMyRankVisible, setIsMyRankVisible] = React.useState(true);
  const [stickyPosition, setStickyPosition] = useState<"top" | "bottom">("bottom");
  const myRankRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  const myData = rankingResponse.data.myRanking;

  return {
    isMyRankVisible,
    stickyPosition,
    listRef,
    myData,
    rankingResponse,
    myRankRef,
  };
};
