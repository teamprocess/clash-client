import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as S from "./SlideSelector.style";

interface SlideSelectorOption<T extends string> {
  key: T;
  label: string;
}

export interface SlideSelectorProps<T extends string> {
  id?: string;
  className?: string;
  value: T;
  options: SlideSelectorOption<T>[];
  onChange: (value: T) => void;
}

export const SlideSelector = <T extends string>({
  id,
  className,
  value,
  options,
  onChange,
}: SlideSelectorProps<T>) => {
  const activeIndex = Math.max(
    0,
    options.findIndex(option => option.key === value)
  );
  const tabsRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [railIndicator, setRailIndicator] = useState({ left: 0, width: 0 });

  const updateRailIndicator = useCallback(() => {
    const tabsElement = tabsRef.current;
    const activeButtonElement = buttonRefs.current[activeIndex];

    if (!tabsElement || !activeButtonElement) {
      return;
    }

    const tabsRect = tabsElement.getBoundingClientRect();
    const activeRect = activeButtonElement.getBoundingClientRect();

    setRailIndicator({
      left: activeRect.left - tabsRect.left,
      width: activeRect.width,
    });
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateRailIndicator();
  }, [updateRailIndicator]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateRailIndicator();
    });

    if (tabsRef.current) {
      observer.observe(tabsRef.current);
    }

    buttonRefs.current.forEach(button => {
      if (button) {
        observer.observe(button);
      }
    });

    return () => observer.disconnect();
  }, [options, updateRailIndicator]);

  return (
    <S.SlideSelectorRoot id={id} className={className}>
      <S.SlideSelectorTabs ref={tabsRef}>
        {options.map((option, index) => (
          <S.SlideButton
            key={option.key}
            ref={element => {
              buttonRefs.current[index] = element;
            }}
            type="button"
            $isActive={option.key === value}
            onClick={() => onChange(option.key)}
          >
            {option.label}
          </S.SlideButton>
        ))}
      </S.SlideSelectorTabs>

      <S.RailTrack>
        <S.RailActiveIndicator $left={railIndicator.left} $width={railIndicator.width} />
      </S.RailTrack>
    </S.SlideSelectorRoot>
  );
};
