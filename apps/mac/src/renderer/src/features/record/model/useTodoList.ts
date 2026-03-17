import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useRecordStore } from "./recordStore";

type EditMode = "NONE" | "ADD" | "EDIT";
const NO_PARENT_SUBJECT = "NONE";

const MAX_TODO_NAME_LENGTH = 13;
const TODO_NAME_INPUT_MAX_LENGTH = 14;

const getTodoNameErrorMessage = (name: string) => {
  const trimmedLength = name.trim().length;

  if (trimmedLength < 1) {
    return "할 일은 최소 1자 이상 입력해주세요.";
  }

  if (trimmedLength > 9) {
    return "할 일은 10자 미만으로 입력해주세요.";
  }

  return null;
};

export const useTodoList = (selectedDate?: string) => {
  const {
    subjects,
    tasks,
    activeSessionType,
    activeTaskId,
    startTask,
    stop,
    addTask,
    updateTask,
    deleteTask,
    updateTaskCompletion,
  } = useRecordStore();
  const isTodaySelected = selectedDate === undefined;
  const [editMode, setEditMode] = useState<EditMode>("NONE");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [todoName, setTodoName] = useState("");
  const [selectedParentTaskId, setSelectedParentTaskId] = useState<number | null>(null);
  const [openMenuTodoId, setOpenMenuTodoId] = useState<number | null>(null);
  const [isTodoNameTooltipOpen, setIsTodoNameTooltipOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const todoNameInputRef = useRef<HTMLInputElement>(null);

  const todoNameErrorMessage = getTodoNameErrorMessage(todoName);
  const isTodoNameInvalid = todoNameErrorMessage !== null;
  const isTodoNameTooLong = todoName.trim().length > MAX_TODO_NAME_LENGTH;
  const shouldShowTodoNameTooltip =
    Boolean(todoNameErrorMessage) && (isTodoNameTooltipOpen || isTodoNameTooLong);
  const parentTaskOptions = [
    { key: NO_PARENT_SUBJECT, label: "과목 없음" },
    ...subjects.map(subject => ({ key: String(subject.id), label: subject.name })),
  ];

  useEffect(() => {
    if (editMode === "NONE") {
      return;
    }

    todoNameInputRef.current?.focus();
  }, [editMode, editingTodoId]);

  const handleCloseMenu = () => {
    setOpenMenuTodoId(null);
  };

  const closeTodoNameTooltip = () => {
    setIsTodoNameTooltipOpen(false);
  };

  const handleMoreClick = (todoId: number) => {
    setOpenMenuTodoId(previousId => (previousId === todoId ? null : todoId));
  };

  const handleAddClick = () => {
    setEditMode("ADD");
    setEditingTodoId(null);
    setTodoName("");
    setSelectedParentTaskId(null);
    handleCloseMenu();
    closeTodoNameTooltip();
  };

  const handleEditClick = (todoId: number) => {
    const todo = tasks.find(item => item.id === todoId);

    if (!todo) {
      return;
    }

    setEditMode("EDIT");
    setEditingTodoId(todoId);
    setTodoName(todo.name);
    setSelectedParentTaskId(todo.subjectId);
    handleCloseMenu();
    closeTodoNameTooltip();
  };

  const handleCancelEdit = () => {
    setEditMode("NONE");
    setEditingTodoId(null);
    setTodoName("");
    setSelectedParentTaskId(null);
    closeTodoNameTooltip();
  };

  const handleSaveTodo = async () => {
    if (isTodoNameInvalid) {
      return false;
    }

    const trimmedTodoName = todoName.trim();

    if (editMode === "ADD") {
      const saved = await addTask(trimmedTodoName, selectedParentTaskId);
      if (saved) {
        handleCancelEdit();
      }
      return saved;
    }

    if (editMode === "EDIT" && editingTodoId !== null) {
      const saved = await updateTask(editingTodoId, trimmedTodoName, selectedParentTaskId);
      if (saved) {
        handleCancelEdit();
      }
      return saved;
    }

    return false;
  };

  const handleSaveClick = async () => {
    const isSaved = await handleSaveTodo();
    setIsTodoNameTooltipOpen(!isSaved);
  };

  const handleTodoNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTodoName = event.target.value;
    setTodoName(nextTodoName);

    if (nextTodoName.trim().length <= MAX_TODO_NAME_LENGTH) {
      closeTodoNameTooltip();
    }
  };

  const handleTodoNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key !== "Enter") return;

    event.preventDefault();
    void handleSaveClick();
  };

  const handleParentTaskChange = (value: string) => {
    setSelectedParentTaskId(value === NO_PARENT_SUBJECT ? null : Number(value));
  };

  const handlePlayPauseClick = async (todoId: number) => {
    if (!isTodaySelected) {
      return;
    }

    if (activeSessionType === "TASK" && activeTaskId === todoId) {
      await stop();
      return;
    }

    if (activeSessionType === "DEVELOP") {
      const stopped = await stop();
      if (!stopped) {
        return;
      }
    }

    await startTask(todoId);
  };

  const handleCompleteClick = async (todoId: number, nextCompleted: boolean) => {
    handleCloseMenu();
    await updateTaskCompletion(todoId, nextCompleted);
  };

  const handleDeleteClick = async (todoId: number) => {
    const deleted = await deleteTask(todoId);

    if (!deleted) {
      return;
    }

    if (editingTodoId === todoId) {
      handleCancelEdit();
      return;
    }

    handleCloseMenu();
  };

  const getParentTaskName = (parentTaskId: number | null) => {
    if (parentTaskId === null) {
      return null;
    }

    return subjects.find(subject => subject.id === parentTaskId)?.name ?? null;
  };

  return {
    todos: tasks.map(task => ({
      id: task.id,
      name: task.name,
      isActive: activeSessionType === "TASK" && activeTaskId === task.id,
      isCompleted: task.completed,
      parentTaskId: task.subjectId,
    })),
    editMode,
    editingTodoId,
    todoName,
    todoNameInputRef,
    todoNameInputMaxLength: TODO_NAME_INPUT_MAX_LENGTH,
    todoNameErrorMessage,
    isTodoNameInvalid,
    shouldShowTodoNameTooltip,
    selectedParentTaskId,
    parentTaskOptions,
    openMenuTodoId,
    menuRef,
    handleCloseMenu,
    handleMoreClick,
    handleAddClick,
    handleEditClick,
    handleCancelEdit,
    handleSaveClick,
    handleTodoNameChange,
    handleTodoNameKeyDown,
    handleParentTaskChange,
    handlePlayPauseClick,
    handleCompleteClick,
    handleDeleteClick,
    getParentTaskName,
  };
};
