import { useCallback, useEffect, useRef, useState, type SetStateAction } from "react";
import type { Mission } from "@/features/chapter/model/chapter.types";
import { useDragScroll } from "@/shared/lib/useDragScroll";

type UseChapterViewParams = {
  loading: boolean;
  sectionId: number;
  sectionCompleted: boolean;
};

const createInitialViewState = (sectionId: number) => ({
  sectionId,
  currentMission: null as Mission | null,
  currentMissionStageTitle: null as string | null,
  missionModalOpen: false,
});

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getNodeOrderIndex = (node: SVGGElement) => {
  const value = Number(node.dataset.roadmapNodeOrderIndex);

  return Number.isFinite(value) ? value : Number.NEGATIVE_INFINITY;
};

const getLastRoadmapNode = (container: HTMLDivElement) => {
  const nodes = Array.from(
    container.querySelectorAll<SVGGElement>("[data-roadmap-node-order-index]")
  );

  if (nodes.length === 0) {
    return null;
  }

  return nodes.reduce((latestNode, candidate) =>
    getNodeOrderIndex(candidate) > getNodeOrderIndex(latestNode) ? candidate : latestNode
  );
};

const scrollNodeIntoView = (container: HTMLDivElement, targetNode: SVGGElement) => {
  const containerRect = container.getBoundingClientRect();
  const nodeRect = targetNode.getBoundingClientRect();
  const nodeCenterX = nodeRect.left - containerRect.left + container.scrollLeft + nodeRect.width / 2;
  const nodeCenterY = nodeRect.top - containerRect.top + container.scrollTop + nodeRect.height / 2;

  const targetLeft = clamp(
    nodeCenterX - container.clientWidth * 0.62,
    0,
    Math.max(container.scrollWidth - container.clientWidth, 0)
  );
  const targetTop = clamp(
    nodeCenterY - container.clientHeight * 0.72,
    0,
    Math.max(container.scrollHeight - container.clientHeight, 0)
  );

  container.scrollTo({
    left: targetLeft,
    top: targetTop,
  });
};

export const useChapterView = ({
  loading,
  sectionId,
  sectionCompleted,
}: UseChapterViewParams) => {
  const chapterRef = useRef<HTMLDivElement>(null);
  const chapterScrollProps = useDragScroll<HTMLDivElement>();

  const [viewState, setViewState] = useState(() => createInitialViewState(sectionId));

  const resolvedViewState = viewState.sectionId === sectionId ? viewState : createInitialViewState(sectionId);

  const setSectionScopedState = useCallback(
    <T extends "currentMission" | "currentMissionStageTitle" | "missionModalOpen">(
      key: T,
      value: SetStateAction<(typeof resolvedViewState)[T]>
    ) => {
      setViewState(prev => {
        const base = prev.sectionId === sectionId ? prev : createInitialViewState(sectionId);

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

  const setCurrentMissionStageTitle = useCallback(
    (value: SetStateAction<string | null>) => {
      setSectionScopedState("currentMissionStageTitle", value);
    },
    [setSectionScopedState]
  );

  useEffect(() => {
    if (!chapterRef.current || loading) return;

    let secondFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        if (!chapterRef.current) return;

        const container = chapterRef.current;
        const currentNode = container.querySelector<SVGGElement>('[data-roadmap-node-status="current"]');
        const targetNode = currentNode ?? (sectionCompleted ? getLastRoadmapNode(container) : null);

        if (!targetNode) {
          container.scrollTo({
            left: container.scrollWidth,
            top: container.scrollHeight,
          });
          return;
        }

        scrollNodeIntoView(container, targetNode);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [loading, sectionCompleted, sectionId]);

  return {
    chapterRef,
    currentMission: resolvedViewState.currentMission,
    currentMissionStageTitle: resolvedViewState.currentMissionStageTitle,
    setCurrentMission,
    setCurrentMissionStageTitle,
    missionModalOpen: resolvedViewState.missionModalOpen,
    setMissionModalOpen,
    chapterScrollProps,
  };
};
