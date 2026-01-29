import { useState, useRef } from "react";
import { useRecord } from "./useRecord";

type EditMode = "none" | "add" | "edit";

export const useTaskList = () => {
  const {
    tasks,
    activeTaskId,
    startStudy,
    stopStudy,
    addTask,
    updateTask,
    deleteTask,
    isTaskActive,
    getTaskStudyTime,
  } = useRecord();

  const [editMode, setEditMode] = useState<EditMode>("none");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [taskName, setTaskName] = useState("");
  const [openMenuTaskId, setOpenMenuTaskId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const handlePlayPauseClick = async (taskId: number) => {
    if (activeTaskId === taskId) {
      await stopStudy();
    } else {
      await startStudy(taskId);
    }
  };

  const handleAddClick = () => {
    setEditMode("add");
    setTaskName("");
  };

  const handleEditClick = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditMode("edit");
      setEditingTaskId(taskId);
      setTaskName(task.name);
      setOpenMenuTaskId(null);
    }
  };

  const handleMoreClick = (taskId: number) => {
    setOpenMenuTaskId(prev => (prev === taskId ? null : taskId));
  };

  const handleCancelEdit = () => {
    setEditMode("none");
    setEditingTaskId(null);
    setTaskName("");
  };

  const handleSaveTask = async () => {
    if (!taskName.trim()) return;

    if (editMode === "add") {
      await addTask(taskName);
    } else if (editMode === "edit" && editingTaskId !== null) {
      await updateTask(editingTaskId, taskName);
    }

    handleCancelEdit();
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

  return {
    tasks,
    editMode,
    editingTaskId,
    taskName,
    openMenuTaskId,
    deleteTargetId,
    menuRef,
    isTaskActive,
    getTaskStudyTime,
    setTaskName,
    handlePlayPauseClick,
    handleMoreClick,
    handleEditClick,
    handleDeleteRequest,
    handleAddClick,
    handleCancelEdit,
    handleSaveTask,
    handleCancelDelete,
    handleConfirmDelete,
  };
};
