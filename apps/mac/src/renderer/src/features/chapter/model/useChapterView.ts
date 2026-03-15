import { useCallback, useEffect, useRef, useState, type SetStateAction } from "react";
import type { Mission } from "@/features/chapter/model/chapter.types";

type UseChapterViewParams = {
  loading: boolean;
  sectionId: number;
};

export const useChapterView = ({ loading, sectionId }: UseChapterViewParams) => {
  const chapterRef = useRef<HTMLDivElement>(null);

  const [viewState, setViewState] = useState({
    sectionId,
    currentMission: null as Mission | null,
    missionModalOpen: false,
  });

  const resolvedViewState =
    viewState.sectionId === sectionId
      ? viewState
      : {
          sectionId,
          currentMission: null,
          missionModalOpen: false,
        };

  const setSectionScopedState = useCallback(
    <T extends "currentMission" | "missionModalOpen">(
      key: T,
      value: SetStateAction<(typeof resolvedViewState)[T]>
    ) => {
      setViewState(prev => {
        const base =
          prev.sectionId === sectionId
            ? prev
            : {
                sectionId,
                currentMission: null,
                missionModalOpen: false,
              };

        const nextValue =
          typeof value === "function"
            ? (
                value as (prevState: (typeof resolvedViewState)[T]) => (typeof resolvedViewState)[T]
              )(base[key])
            : value;

        return {
          ...base,
          sectionId,
          [key]: nextValue,
        };
      });
    },
    [sectionId]
  );

  const setCurrentMission = useCallback(
    (value: SetStateAction<Mission | null>) => {
      setSectionScopedState("currentMission", value);
    },
    [setSectionScopedState]
  );

  const setMissionModalOpen = useCallback(
    (value: SetStateAction<boolean>) => {
      setSectionScopedState("missionModalOpen", value);
    },
    [setSectionScopedState]
  );

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
  }, [loading, sectionId]);

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
    currentMission: resolvedViewState.currentMission,
    setCurrentMission,
    missionModalOpen: resolvedViewState.missionModalOpen,
    setMissionModalOpen,
  };
};
