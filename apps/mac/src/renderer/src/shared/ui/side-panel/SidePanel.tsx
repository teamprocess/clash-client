import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import * as S from "./SidePanel.style";
import { useModalFocus } from "@/shared/lib";

export interface SidePanelProps {
  isOpen: boolean;
  isClosing?: boolean;
  onClose: () => void;
  width?: string;
  position?: "absolute" | "fixed";
  children: ReactNode;
  ariaLabel?: string;
}

export const SidePanel = ({
  isOpen,
  isClosing = false,
  onClose,
  width = "min(100%, 36rem)",
  position = "fixed",
  children,
  ariaLabel = "사이드 패널",
}: SidePanelProps) => {
  const { containerRef: panelRef, layerRef } = useModalFocus({ isOpen, onClose });

  if (!isOpen) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <S.Overlay
      ref={layerRef}
      $closing={isClosing}
      $position={position}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <S.Panel
        ref={panelRef}
        $closing={isClosing}
        $width={width}
        onClick={event => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
      >
        {children}
      </S.Panel>
    </S.Overlay>,
    document.body
  );
};
