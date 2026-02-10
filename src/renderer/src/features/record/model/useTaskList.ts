import { useRef, useState } from "react";
import { useRecordStore } from "./recordStore";

type EditMode = "none" | "add" | "edit";

export const useTaskList = () => {
  const { tasks, activeTaskId, currentStudyTime, start, stop, addTask, updateTask, deleteTask } =
    useRecordStore();

  const [editMode, setEditMode] = useState<EditMode>("none");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [taskName, setTaskName] = useState("");
  const [openMenuTaskId, setOpenMenuTaskId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const handlePlayPauseClick = async (taskId: number) => {
    if (activeTaskId === taskId) {
      await stop();
    } else {
      await start(taskId);
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

  const handleCloseMenu = () => {
    setOpenMenuTaskId(null);
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
    openMenuTaskId,
    deleteTargetId,
    menuRef,
    isTaskActive,
    getTaskStudyTime,
    setTaskName,
    handlePlayPauseClick,
    handleMoreClick,
    handleCloseMenu,
    handleEditClick,
    handleDeleteRequest,
    handleAddClick,
    handleCancelEdit,
    handleSaveTask,
    handleCancelDelete,
    handleConfirmDelete,
  };
};
