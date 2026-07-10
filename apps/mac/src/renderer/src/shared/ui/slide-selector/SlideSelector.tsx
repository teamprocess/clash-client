import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
  ariaLabel?: string;
}

export const SlideSelector = <T extends string>({
  id,
  className,
  value,
  options,
  onChange,
  ariaLabel = "보기 선택",
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

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (
      options.length === 0 ||
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)
    ) {
      return;
    }

    event.preventDefault();
    const lastIndex = options.length - 1;
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? lastIndex
          : event.key === "ArrowRight" || event.key === "ArrowDown"
            ? (index + 1) % options.length
            : (index - 1 + options.length) % options.length;
    const nextOption = options[nextIndex];
    if (!nextOption) return;

    onChange(nextOption.key);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <S.SlideSelectorRoot id={id} className={className}>
      <S.SlideSelectorTabs ref={tabsRef} role="radiogroup" aria-label={ariaLabel}>
        {options.map((option, index) => (
          <S.SlideButton
            key={option.key}
            ref={element => {
              buttonRefs.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={option.key === value}
            tabIndex={option.key === value ? 0 : -1}
            $isActive={option.key === value}
            onClick={() => onChange(option.key)}
            onKeyDown={event => handleKeyDown(event, index)}
          >
            {option.label}
          </S.SlideButton>
        ))}
      </S.SlideSelectorTabs>

      <S.RailTrack aria-hidden>
        <S.RailActiveIndicator $left={railIndicator.left} $width={railIndicator.width} />
      </S.RailTrack>
    </S.SlideSelectorRoot>
  );
};
