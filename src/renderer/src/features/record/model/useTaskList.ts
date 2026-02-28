import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useRecordStore } from "./recordStore";
import { recordApi, recordQueryKeys, useRecordTodayQuery } from "@/entities/record";
import type { TaskRecordSession } from "@/entities/record";
import { getErrorMessage, queryClient } from "@/shared/lib";

type EditMode = "none" | "add" | "edit";
const MAX_TASK_NAME_LENGTH = 13;
const TASK_NAME_INPUT_MAX_LENGTH = 14;

const getTaskNameErrorMessage = (name: string) => {
  const trimmedLength = name.trim().length;

  if (trimmedLength < 1) {
    return "과목명은 최소 1자 이상 입력해주세요.";
  }

  if (trimmedLength > 13) {
    return "과목명은 14자 미만으로 입력해주세요.";
  }

  return null;
};

export const useTaskList = () => {
  const { tasks, activeTaskId, currentStudyTime, start, stop, addTask, updateTask, deleteTask } =
    useRecordStore();
  const { data: todayResponse } = useRecordTodayQuery();

  const [editMode, setEditMode] = useState<EditMode>("none");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [taskName, setTaskName] = useState("");
  const [openMenuTaskId, setOpenMenuTaskId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [activitySwitchTargetTaskId, setActivitySwitchTargetTaskId] = useState<number | null>(null);
  const [isSwitchingFromActivity, setIsSwitchingFromActivity] = useState(false);
  const [isTaskNameTooltipOpen, setIsTaskNameTooltipOpen] = useState(false);
  const taskNameErrorMessage = getTaskNameErrorMessage(taskName);
  const isTaskNameInvalid = taskNameErrorMessage !== null;
  const isTaskNameTooLong = taskName.trim().length > MAX_TASK_NAME_LENGTH;
  const shouldShowTaskNameTooltip =
    Boolean(taskNameErrorMessage) && (isTaskNameTooltipOpen || isTaskNameTooLong);

  const menuRef = useRef<HTMLDivElement>(null);
  const taskNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode === "none") return;
    taskNameInputRef.current?.focus();
  }, [editMode, editingTaskId]);

  const isActivityRecording = Boolean(
    todayResponse?.success &&
    todayResponse.data?.sessions.some(
      session => session.endedAt === null && session.recordType === "ACTIVITY"
    )
  );
  const activeTaskSessionId =
    todayResponse?.success && todayResponse.data
      ? ((
          todayResponse.data.sessions.find(
            (session): session is TaskRecordSession =>
              session.endedAt === null && session.recordType === "TASK"
          ) ?? null
        )?.task.id ?? null)
      : null;
  const isDeletingActiveTask = Boolean(
    deleteTargetId !== null &&
    (activeTaskId === deleteTargetId || activeTaskSessionId === deleteTargetId)
  );

  const handlePlayPauseClick = async (taskId: number) => {
    if (isActivityRecording && activeTaskId !== taskId) {
      setActivitySwitchTargetTaskId(taskId);
      return;
    }

    if (activeTaskId === taskId) {
      await stop();
    } else {
      await start(taskId);
    }
  };

  const handleCloseActivitySwitchDialog = () => {
    if (isSwitchingFromActivity) {
      return;
    }
    setActivitySwitchTargetTaskId(null);
  };

  const handleConfirmActivitySwitch = async () => {
    if (activitySwitchTargetTaskId === null) {
      return;
    }

    setIsSwitchingFromActivity(true);
    try {
      const stopResponse = await recordApi.stopRecord();
      if (!stopResponse.success) {
        console.error(
          "개발 기록 종료 실패:",
          stopResponse.message ?? "개발 세션 종료 응답이 실패로 반환되었습니다."
        );
        return;
      }

      await queryClient.invalidateQueries({ queryKey: recordQueryKeys.today });
      await start(activitySwitchTargetTaskId);
      setActivitySwitchTargetTaskId(null);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(
        error,
        "개발 기록 종료 후 과목 공부 시작에 실패했습니다."
      );
      console.error("개발 기록 종료 후 과목 공부 시작 실패:", errorMessage, error);
    } finally {
      setIsSwitchingFromActivity(false);
    }
  };

  const closeTaskNameTooltip = () => {
    setIsTaskNameTooltipOpen(false);
  };

  const handleAddClick = () => {
    setEditMode("add");
    setTaskName("");
    closeTaskNameTooltip();
  };

  const handleEditClick = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditMode("edit");
      setEditingTaskId(taskId);
      setTaskName(task.name);
      setOpenMenuTaskId(null);
      closeTaskNameTooltip();
    }
  };

  const handleMoreClick = (taskId: number) => {
    setOpenMenuTaskId(prev => (prev === taskId ? null : taskId));
  };

  const handleCloseMenu = () => {
    setOpenMenuTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditMode("none");
    setEditingTaskId(null);
    setTaskName("");
    closeTaskNameTooltip();
  };

  const handleSaveTask = async () => {
    if (isTaskNameInvalid) return false;
    const trimmedTaskName = taskName.trim();

    if (editMode === "add") {
      await addTask(trimmedTaskName);
      handleCancelEdit();
      return true;
    } else if (editMode === "edit" && editingTaskId !== null) {
      await updateTask(editingTaskId, trimmedTaskName);
      handleCancelEdit();
      return true;
    }

    return false;
  };

  const handleSaveClick = async () => {
    const isSaved = await handleSaveTask();
    setIsTaskNameTooltipOpen(!isSaved);
  };

  const handleTaskNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTaskName = event.target.value;
    setTaskName(nextTaskName);

    if (nextTaskName.trim().length <= MAX_TASK_NAME_LENGTH) {
      closeTaskNameTooltip();
    }
  };

  const handleTaskNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key !== "Enter") return;
    event.preventDefault();
    void handleSaveClick();
  };

  const handleDeleteRequest = (taskId: number) => {
    setDeleteTargetId(taskId);
    setOpenMenuTaskId(null);
  };

  const handleCancelDelete = () => {
    setDeleteTargetId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId !== null) {
      await deleteTask(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const isTaskActive = (taskId: number) => activeTaskId === taskId;

  const getTaskStudyTime = (taskId: number) => {
    const task = tasks.find(item => item.id === taskId);
    if (!task) return 0;
    return activeTaskId === taskId ? task.studyTime + currentStudyTime : task.studyTime;
  };

  return {
    tasks,
    editMode,
    editingTaskId,
    taskName,
    taskNameInputRef,
    taskNameInputMaxLength: TASK_NAME_INPUT_MAX_LENGTH,
    taskNameErrorMessage,
    isTaskNameInvalid,
    shouldShowTaskNameTooltip,
    openMenuTaskId,
    deleteTargetId,
    isDeletingActiveTask,
    activitySwitchTargetTaskId,
    isSwitchingFromActivity,
    menuRef,
    isTaskActive,
    getTaskStudyTime,
    handleTaskNameChange,
    handleTaskNameKeyDown,
    handleSaveClick,
    handlePlayPauseClick,
    handleCloseActivitySwitchDialog,
    handleConfirmActivitySwitch,
    handleMoreClick,
    handleCloseMenu,
    handleEditClick,
    handleDeleteRequest,
    handleAddClick,
    handleCancelEdit,
    handleCancelDelete,
    handleConfirmDelete,
  };
};
