import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useRecordStore } from "./recordStore";
import { useRecordTodayQuery } from "@/entities/record";

type EditMode = "NONE" | "ADD" | "EDIT";
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

export const useTaskList = (selectedDate?: string) => {
  const {
    subjects,
    activeSessionType,
    activeSubjectId,
    currentStudyTime,
    startSubject,
    stop,
    addSubject,
    updateSubject,
    deleteSubject,
  } = useRecordStore();
  const isTodaySelected = selectedDate === undefined;
  const { data: todayResponse } = useRecordTodayQuery(selectedDate);

  const [editMode, setEditMode] = useState<EditMode>("NONE");
  const [editingSubjectId, setEditingSubjectId] = useState<number | null>(null);
  const [subjectName, setSubjectName] = useState("");
  const [openMenuSubjectId, setOpenMenuSubjectId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [developSwitchTargetSubjectId, setDevelopSwitchTargetSubjectId] = useState<number | null>(
    null
  );
  const [isSwitchingFromDevelop, setIsSwitchingFromDevelop] = useState(false);
  const [isSubjectNameTooltipOpen, setIsSubjectNameTooltipOpen] = useState(false);
  const subjectNameErrorMessage = getTaskNameErrorMessage(subjectName);
  const isSubjectNameInvalid = subjectNameErrorMessage !== null;
  const isSubjectNameTooLong = subjectName.trim().length > MAX_TASK_NAME_LENGTH;
  const shouldShowSubjectNameTooltip =
    Boolean(subjectNameErrorMessage) && (isSubjectNameTooltipOpen || isSubjectNameTooLong);

  const menuRef = useRef<HTMLDivElement>(null);
  const subjectNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode === "NONE") return;
    subjectNameInputRef.current?.focus();
  }, [editMode, editingSubjectId]);

  const isDevelopRecording = Boolean(
    todayResponse?.success &&
    todayResponse.data?.sessions.some(
      session => session.endedAt === null && session.sessionType === "DEVELOP"
    )
  );
  const isDeletingActiveSubject = Boolean(
    deleteTargetId !== null && activeSessionType === "TASK" && activeSubjectId === deleteTargetId
  );

  const handlePlayPauseClick = async (subjectId: number) => {
    if (!isTodaySelected) {
      return;
    }

    if (isDevelopRecording && activeSubjectId !== subjectId) {
      setDevelopSwitchTargetSubjectId(subjectId);
      return;
    }

    if (activeSessionType === "TASK" && activeSubjectId === subjectId) {
      await stop();
      return;
    }

    await startSubject(subjectId);
  };

  const handleCloseActivitySwitchDialog = () => {
    if (isSwitchingFromDevelop) {
      return;
    }
    setDevelopSwitchTargetSubjectId(null);
  };

  const handleConfirmActivitySwitch = async () => {
    if (developSwitchTargetSubjectId === null) {
      return;
    }

    setIsSwitchingFromDevelop(true);

    try {
      const stopped = await stop();
      if (!stopped) {
        return;
      }

      await startSubject(developSwitchTargetSubjectId);
      setDevelopSwitchTargetSubjectId(null);
    } finally {
      setIsSwitchingFromDevelop(false);
    }
  };

  const closeSubjectNameTooltip = () => {
    setIsSubjectNameTooltipOpen(false);
  };

  const handleAddClick = () => {
    setEditMode("ADD");
    setSubjectName("");
    closeSubjectNameTooltip();
  };

  const handleEditClick = (subjectId: number) => {
    const subject = subjects.find(item => item.id === subjectId);
    if (subject) {
      setEditMode("EDIT");
      setEditingSubjectId(subjectId);
      setSubjectName(subject.name);
      setOpenMenuSubjectId(null);
      closeSubjectNameTooltip();
    }
  };

  const handleMoreClick = (subjectId: number) => {
    setOpenMenuSubjectId(previousId => (previousId === subjectId ? null : subjectId));
  };

  const handleCloseMenu = () => {
    setOpenMenuSubjectId(null);
  };

  const handleCancelEdit = () => {
    setEditMode("NONE");
    setEditingSubjectId(null);
    setSubjectName("");
    closeSubjectNameTooltip();
  };

  const handleSaveTask = async () => {
    if (isSubjectNameInvalid) {
      return false;
    }

    const trimmedSubjectName = subjectName.trim();

    if (editMode === "ADD") {
      const saved = await addSubject(trimmedSubjectName);
      if (saved) {
        handleCancelEdit();
      }
      return saved;
    }

    if (editMode === "EDIT" && editingSubjectId !== null) {
      const saved = await updateSubject(editingSubjectId, trimmedSubjectName);
      if (saved) {
        handleCancelEdit();
      }
      return saved;
    }

    return false;
  };

  const handleSaveClick = async () => {
    const isSaved = await handleSaveTask();
    setIsSubjectNameTooltipOpen(!isSaved);
  };

  const handleTaskNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextSubjectName = event.target.value;
    setSubjectName(nextSubjectName);

    if (nextSubjectName.trim().length <= MAX_TASK_NAME_LENGTH) {
      closeSubjectNameTooltip();
    }
  };

  const handleTaskNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key !== "Enter") return;
    event.preventDefault();
    void handleSaveClick();
  };

  const handleDeleteRequest = (subjectId: number) => {
    setDeleteTargetId(subjectId);
    setOpenMenuSubjectId(null);
  };

  const handleCancelDelete = () => {
    setDeleteTargetId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId !== null) {
      const deleted = await deleteSubject(deleteTargetId);
      if (deleted) {
        setDeleteTargetId(null);
      }
    }
  };

  const isSubjectActive = (subjectId: number) =>
    activeSessionType === "TASK" && activeSubjectId === subjectId;

  const getSubjectStudyTime = (subjectId: number) => {
    const subject = subjects.find(item => item.id === subjectId);
    if (!subject) return 0;
    return isSubjectActive(subjectId) ? subject.studyTime + currentStudyTime : subject.studyTime;
  };

  return {
    subjects,
    editMode,
    editingSubjectId,
    subjectName,
    subjectNameInputRef,
    taskNameInputMaxLength: TASK_NAME_INPUT_MAX_LENGTH,
    taskNameErrorMessage: subjectNameErrorMessage,
    isTaskNameInvalid: isSubjectNameInvalid,
    shouldShowTaskNameTooltip: shouldShowSubjectNameTooltip,
    openMenuTaskId: openMenuSubjectId,
    deleteTargetId,
    isDeletingActiveTask: isDeletingActiveSubject,
    activitySwitchTargetTaskId: developSwitchTargetSubjectId,
    isSwitchingFromActivity: isSwitchingFromDevelop,
    menuRef,
    isTaskActive: isSubjectActive,
    getTaskStudyTime: getSubjectStudyTime,
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
