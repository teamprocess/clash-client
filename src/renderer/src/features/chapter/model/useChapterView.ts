import { useEffect, useRef, useState } from "react";
import type { Mission } from "@/features/chapter/model/chapter.types";

type UseChapterViewParams = {
  loading: boolean;
};

export const useChapterView = ({ loading }: UseChapterViewParams) => {
  const chapterRef = useRef<HTMLDivElement>(null);

  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);

  const handleScroll = () => {
    if (!chapterRef.current) return;
    const container = chapterRef.current;
    const child = container.childNodes.item(0) as HTMLDivElement;

    const scrolledSize = container.scrollTop + container.offsetHeight;
    const canScroll = scrolledSize <= container.scrollHeight - child.offsetWidth;

    if (!canScroll) {
      container.scrollTo(
        container.scrollWidth,
        container.scrollHeight - container.offsetHeight - child.offsetWidth
      );
    }
  };

  useEffect(() => {
    if (!chapterRef.current || loading) return;
    chapterRef.current.scrollTo(chapterRef.current.scrollWidth, chapterRef.current.scrollHeight);
  }, [loading]);

  useEffect(() => {
    if (!chapterRef.current) return;
    const chapter = chapterRef.current;

    chapter.addEventListener("scroll", handleScroll);
    return () => {
      chapter.removeEventListener("scroll", handleScroll);
    };
  });

  return {
    chapterRef,
    currentMission,
    setCurrentMission,
    modalOpen,
    setModalOpen,
    missionModalOpen,
    setMissionModalOpen,
  };
};
