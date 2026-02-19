import { useMemo, useState } from "react";
import type { ItemPreviewPayload } from "@/features/profile/ui/profile-tabs/item-panel/ItemPanel";

export type BgState = {
  accentColor?: string;
  bgImageUrl?: string;
};

export type BadgeState = {
  accentColor?: string;
  bgImageUrl?: string;
};

export type EditingKind = "background" | "badge" | null;

export type UseProfileReturn = {
  appliedBg: BgState;
  appliedBadge: BadgeState;
  isEditing: boolean;
  handlePreviewChange: (payload: ItemPreviewPayload) => void;
  handleCancel: () => void;
  handleSave: () => void;
};

export const useProfile = (): UseProfileReturn => {
  const [savedBg, setSavedBg] = useState<BgState>({});
  const [savedBadge, setSavedBadge] = useState<BadgeState>({});

  const [draftBg, setDraftBg] = useState<BgState | null>(null);
  const [draftBadge, setDraftBadge] = useState<BadgeState | null>(null);

  const [editingKind, setEditingKind] = useState<EditingKind>(null);
  const isEditing = editingKind !== null;

  const appliedBg = useMemo(
    () => (editingKind === "background" ? draftBg : null) ?? savedBg,
    [editingKind, draftBg, savedBg]
  );

  const appliedBadge = useMemo(
    () => (editingKind === "badge" ? draftBadge : null) ?? savedBadge,
    [editingKind, draftBadge, savedBadge]
  );

  const clearEditing = () => {
    setDraftBg(null);
    setDraftBadge(null);
    setEditingKind(null);
  };

  const handlePreviewChange = (payload: ItemPreviewPayload) => {
    if (payload.kind === "none") {
      clearEditing();
      return;
    }

    if (payload.kind === "background") {
      setEditingKind("background");
      setDraftBg({
        accentColor: payload.accentColor,
        bgImageUrl: payload.bgImageUrl,
      });
      return;
    }

    if (payload.kind === "badge") {
      setEditingKind("badge");
      setDraftBadge({
        accentColor: payload.accentColor ?? "#2F547B",
        bgImageUrl: payload.bgImageUrl,
      });
      return;
    }

    if (payload.kind === "nameplate") {
      return;
    }
  };

  const handleCancel = () => {
    clearEditing();
  };

  const handleSave = () => {
    if (editingKind === "background") {
      if (draftBg) setSavedBg(draftBg);
      setDraftBg(null);
    }

    if (editingKind === "badge") {
      if (draftBadge) setSavedBadge(draftBadge);
      setDraftBadge(null);
    }

    setEditingKind(null);
  };

  return {
    appliedBg,
    appliedBadge,
    isEditing,
    handlePreviewChange,
    handleCancel,
    handleSave,
  };
};
