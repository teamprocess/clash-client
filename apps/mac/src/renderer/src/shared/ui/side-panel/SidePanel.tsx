import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import * as S from "./SidePanel.style";

export interface SidePanelProps {
  isOpen: boolean;
  isClosing?: boolean;
  onClose: () => void;
  width?: string;
  position?: "absolute" | "fixed";
  children: ReactNode;
}

export const SidePanel = ({
  isOpen,
  isClosing = false,
  onClose,
  width = "min(100%, 36rem)",
  position = "fixed",
  children,
}: SidePanelProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <S.Overlay $closing={isClosing} $position={position} onClick={onClose} aria-hidden={!isOpen}>
      <S.Panel
        $closing={isClosing}
        $width={width}
        onClick={event => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </S.Panel>
    </S.Overlay>,
    document.body
  );
};
