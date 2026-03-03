import { useLayoutEffect, useRef, useState } from "react";
import type { RankingItem } from "@/entities/home";

interface UseRankingViewParams {
  rankings: RankingItem[];
}

export const useRankingView = ({ rankings }: UseRankingViewParams) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentUserRef = useRef<HTMLDivElement>(null);

  const [stickyState, setStickyState] = useState<"top" | "bottom" | "none">("none");

  useLayoutEffect(() => {
    if (!wrapperRef.current || !currentUserRef.current) return;

    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      const currentUser = currentUserRef.current;
      if (!wrapper || !currentUser) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const userRect = currentUser.getBoundingClientRect();

      if (userRect.top >= wrapperRect.bottom) {
        setStickyState("bottom");
        return;
      }
      if (userRect.bottom <= wrapperRect.top) {
        setStickyState("top");
        return;
      }
      setStickyState("none");
    };

    const wrapper = wrapperRef.current;
    wrapper.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      wrapper.removeEventListener("scroll", handleScroll);
    };
  }, [rankings]);

  return {
    wrapperRef,
    currentUserRef,
    stickyState,
  };
};
