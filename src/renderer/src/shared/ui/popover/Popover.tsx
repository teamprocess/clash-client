import { type RefObject, type ReactNode, useEffect, useRef } from "react";
import * as S from "./Popover.style";

export interface PopoverProps {
  isOpen: boolean;
  onClose?: () => void;
  anchorRef?: RefObject<HTMLElement | null>;
  align?: "start" | "end";
  offset?: number;
  children: ReactNode;
}

export const Popover = ({
  isOpen,
  onClose,
  anchorRef,
  align = "end",
  offset = 8,
  children,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !onClose) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (popoverRef.current?.contains(target)) {
        return;
      }

      if (anchorRef?.current?.contains(target)) {
        return;
      }

      onClose();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [anchorRef, isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <S.PopoverContainer ref={popoverRef} $align={align} $offset={offset}>
      {children}
    </S.PopoverContainer>
  );
};
