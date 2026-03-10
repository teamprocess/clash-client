import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useRecordStore } from "./recordStore";

export type TodoItem = {
  id: number;
  name: string;
  isActive: boolean;
  isCompleted: boolean;
  parentTaskId: number | null;
};

type EditMode = "NONE" | "ADD" | "EDIT";
const NO_PARENT_TASK = "NONE";

const initialTodoItems: TodoItem[] = [
  {
    id: 1,
    name: "학습 계획 정리하기",
    isActive: false,
    isCompleted: false,
    parentTaskId: null,
  },
  {
    id: 2,
    name: "기록 V2 화면 검토하기",
    isActive: true,
    isCompleted: false,
    parentTaskId: null,
  },
  {
    id: 3,
    name: "오늘 회고 작성하기",
    isActive: false,
    isCompleted: true,
    parentTaskId: null,
  },
];

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

export const useTodoList = () => {
  const tasks = useRecordStore(state => state.tasks);
  const [todos, setTodos] = useState(initialTodoItems);
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
    { key: NO_PARENT_TASK, label: "과목 없음" },
    ...tasks.map(task => ({ key: String(task.id), label: task.name })),
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
    setOpenMenuTodoId(prev => (prev === todoId ? null : todoId));
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
    const todo = todos.find(item => item.id === todoId);

    if (!todo) {
      return;
    }

    setEditMode("EDIT");
    setEditingTodoId(todoId);
    setTodoName(todo.name);
    setSelectedParentTaskId(todo.parentTaskId);
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

  const handleSaveTodo = () => {
    if (isTodoNameInvalid) {
      return false;
    }

    const trimmedTodoName = todoName.trim();

    if (editMode === "ADD") {
      setTodos(prev => [
        ...prev,
        {
          id: Math.max(0, ...prev.map(todo => todo.id)) + 1,
          name: trimmedTodoName,
          isActive: false,
          isCompleted: false,
          parentTaskId: selectedParentTaskId,
        },
      ]);
      handleCancelEdit();
      return true;
    }

    if (editMode === "EDIT" && editingTodoId !== null) {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === editingTodoId
            ? { ...todo, name: trimmedTodoName, parentTaskId: selectedParentTaskId }
            : todo
        )
      );
      handleCancelEdit();
      return true;
    }

    return false;
  };

  const handleSaveClick = () => {
    const isSaved = handleSaveTodo();
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
    handleSaveClick();
  };

  const handleParentTaskChange = (value: string) => {
    setSelectedParentTaskId(value === NO_PARENT_TASK ? null : Number(value));
  };

  const handlePlayPauseClick = (todoId: number) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === todoId ? { ...todo, isActive: !todo.isActive } : todo))
    );
  };

  const handleCompleteClick = (todoId: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: true, isActive: false } : todo
      )
    );
    handleCloseMenu();
  };

  const handleDeleteClick = (todoId: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== todoId));

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

    return tasks.find(task => task.id === parentTaskId)?.name ?? null;
  };

  return {
    todos,
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
