import { useCallback, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { GROUP_CATEGORY_LABELS, type Group } from "@/entities/group";
import { getPageNumbers } from "@/shared/lib";
import { useGroupList } from "./useGroupList";

interface UseGroupFormPanelParams {
  isJoining: boolean;
  joinPassword: string;
  setJoinPassword: (password: string) => void;
  onJoinSubmit: (groupId: number, password?: string) => Promise<boolean>;
}

export const useGroupFormPanel = ({
  isJoining,
  joinPassword,
  setJoinPassword,
  onJoinSubmit,
}: UseGroupFormPanelParams) => {
  const [activeTab, setActiveTab] = useState<"join" | "create">("join");
  const {
    groups,
    pagination,
    isLoading,
    currentPage,
    selectedCategory,
    categoryOptions,
    handlePageChange,
    handleCategoryChange,
  } = useGroupList();
  const [passwordTargetGroup, setPasswordTargetGroup] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [joinPasswordError, setJoinPasswordError] = useState("");
  const [joiningGroupId, setJoiningGroupId] = useState<number | null>(null);

  const emptyTitle = useMemo(
    () =>
      selectedCategory === "ALL"
        ? "현재 참여 가능한 그룹이 없습니다."
        : `${GROUP_CATEGORY_LABELS[selectedCategory]} 카테고리 그룹이 없습니다.`,
    [selectedCategory]
  );
  const pageNumbers = useMemo(
    () => (pagination ? getPageNumbers(currentPage, pagination.totalPages) : []),
    [currentPage, pagination]
  );

  const resetJoinPasswordDialog = useCallback(() => {
    setPasswordTargetGroup(null);
    setJoinPassword("");
    setJoinPasswordError("");
    setJoiningGroupId(null);
  }, [setJoinPassword]);

  const handleOpenJoinPasswordDialog = useCallback(
    (groupId: number, groupName: string) => {
      setPasswordTargetGroup({ id: groupId, name: groupName });
      setJoinPassword("");
      setJoinPasswordError("");
    },
    [setJoinPassword]
  );

  const handleCloseJoinPasswordDialog = useCallback(() => {
    if (isJoining) {
      return;
    }

    resetJoinPasswordDialog();
  }, [isJoining, resetJoinPasswordDialog]);

  const handleJoinPasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setJoinPassword(event.target.value);
      if (joinPasswordError) {
        setJoinPasswordError("");
      }
    },
    [joinPasswordError, setJoinPassword]
  );

  const handleJoinWithPassword = useCallback(
    async (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      if (!passwordTargetGroup) {
        return;
      }

      const password = joinPassword.trim();
      if (!password) {
        setJoinPasswordError("비밀번호를 입력하세요.");
        return;
      }

      setJoiningGroupId(passwordTargetGroup.id);
      try {
        const isJoined = await onJoinSubmit(passwordTargetGroup.id, password);
        if (isJoined) {
          resetJoinPasswordDialog();
          return;
        }
      } finally {
        setJoiningGroupId(null);
      }

      setJoinPasswordError("그룹 참여에 실패했습니다. 비밀번호를 확인해주세요.");
    },
    [joinPassword, onJoinSubmit, passwordTargetGroup, resetJoinPasswordDialog]
  );

  const handleJoinGroup = useCallback(
    async (group: Group) => {
      if (group.passwordRequired) {
        handleOpenJoinPasswordDialog(group.id, group.name);
        return;
      }

      setJoiningGroupId(group.id);
      try {
        await onJoinSubmit(group.id);
      } finally {
        setJoiningGroupId(null);
      }
    },
    [handleOpenJoinPasswordDialog, onJoinSubmit]
  );

  const handleTabChange = useCallback(
    (tab: "join" | "create") => {
      setActiveTab(tab);
      if (tab !== "join") {
        resetJoinPasswordDialog();
      }
    },
    [resetJoinPasswordDialog]
  );

  return {
    activeTab,
    groups,
    pagination,
    isLoading,
    currentPage,
    selectedCategory,
    categoryOptions,
    emptyTitle,
    pageNumbers,
    joiningGroupId,
    passwordTargetGroupName: passwordTargetGroup?.name ?? null,
    isJoinPasswordDialogOpen: passwordTargetGroup !== null,
    joinPasswordError,
    handlePageChange,
    handleCategoryChange,
    handleTabChange,
    handleJoinGroup,
    handleCloseJoinPasswordDialog,
    handleJoinPasswordChange,
    handleJoinWithPassword,
  };
};
