import * as S from "./Task.style";
import { formatTime } from "@/shared/lib";
import { useTaskList } from "../../model/useTaskList";
import { Button, ConfirmDialog, Popover, Tooltip } from "@/shared/ui";

interface TaskProps {
  selectedDate?: string;
}

export const Task = ({ selectedDate }: TaskProps) => {
  const {
    subjects,
    editMode,
    editingSubjectId,
    subjectName,
    subjectNameInputRef,
    taskNameInputMaxLength,
    taskNameErrorMessage,
    isTaskNameInvalid,
    isSavingTask,
    shouldShowTaskNameTooltip,
    openMenuTaskId,
    deleteTargetId,
    isDeletingTask,
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
  } = useTaskList(selectedDate);

  const renderTaskNameInput = () => (
    <Tooltip
      content={taskNameErrorMessage ?? ""}
      position="top"
      open={shouldShowTaskNameTooltip}
      triggerOnHover={false}
      wrapperStyle={{ width: "100%", maxWidth: "100%" }}
    >
      <S.TaskTextInput
        ref={subjectNameInputRef}
        placeholder="과목명을 입력하세요."
        value={subjectName}
        maxLength={taskNameInputMaxLength}
        disabled={isSavingTask}
        aria-invalid={isTaskNameInvalid}
        onChange={handleTaskNameChange}
        onKeyDown={handleTaskNameKeyDown}
      />
    </Tooltip>
  );

  return (
    <>
      <S.TaskContainer>
        <S.TaskBox>
          {subjects.map(subject => {
            const isActive = isTaskActive(subject.id);
            const studyTime = getTaskStudyTime(subject.id);
            const isMenuOpen = openMenuTaskId === subject.id;
            const isEditing = editMode === "EDIT" && editingSubjectId === subject.id;

            if (isEditing) {
              return (
                <S.TaskItem key={subject.id}>
                  <S.TaskInputBox>{renderTaskNameInput()}</S.TaskInputBox>
                  <S.TaskRightBox>
                    <S.ButtonBox>
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={isSavingTask}
                        onClick={handleCancelEdit}
                      >
                        취소
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        isLoading={isSavingTask}
                        onClick={handleSaveClick}
                      >
                        {isSavingTask ? "저장 중..." : "저장"}
                      </Button>
                    </S.ButtonBox>
                  </S.TaskRightBox>
                </S.TaskItem>
              );
            }

            return (
              <S.TaskItem key={subject.id}>
                <S.TaskLeftBox>
                  <S.IconButton onClick={() => handlePlayPauseClick(subject.id)}>
                    {isActive ? <S.PauseIcon /> : <S.PlayIcon />}
                  </S.IconButton>
                  <S.TaskText>{subject.name}</S.TaskText>
                </S.TaskLeftBox>
                <S.TaskRightBox>
                  <S.TaskText>{formatTime(studyTime)}</S.TaskText>
                  <S.MoreIconWrapper ref={isMenuOpen ? menuRef : null}>
                    <S.IconButton onClick={() => handleMoreClick(subject.id)}>
                      <S.MoreIcon />
                    </S.IconButton>
                    <Popover isOpen={isMenuOpen} onClose={handleCloseMenu} anchorRef={menuRef}>
                      <S.MenuList>
                        <S.MenuItem onClick={() => handleEditClick(subject.id)}>
                          과목 수정
                        </S.MenuItem>
                        <S.MenuItem onClick={() => handleDeleteRequest(subject.id)}>
                          과목 삭제
                        </S.MenuItem>
                      </S.MenuList>
                    </Popover>
                  </S.MoreIconWrapper>
                </S.TaskRightBox>
              </S.TaskItem>
            );
          })}
          {editMode === "ADD" && (
            <S.TaskItem>
              <S.TaskInputBox>{renderTaskNameInput()}</S.TaskInputBox>
              <S.TaskRightBox>
                <S.ButtonBox>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={isSavingTask}
                    onClick={handleCancelEdit}
                  >
                    취소
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    isLoading={isSavingTask}
                    onClick={handleSaveClick}
                  >
                    {isSavingTask ? "저장 중..." : "저장"}
                  </Button>
                </S.ButtonBox>
              </S.TaskRightBox>
            </S.TaskItem>
          )}
          <S.AddTaskButton disabled={isSavingTask} onClick={handleAddClick}>
            + 과목 추가
          </S.AddTaskButton>
        </S.TaskBox>
      </S.TaskContainer>
      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title={isDeletingActiveTask ? "진행 중 과목 삭제" : "과목 삭제"}
        description={
          isDeletingActiveTask ? (
            <>
              현재 진행 중인 세션이 있습니다.
              <br />
              과목을 삭제하면 세션이 종료됩니다.
            </>
          ) : (
            "정말 해당 과목을 삭제하시겠습니까?"
          )
        }
        confirmMessage="삭제 시 해당 과목의 데이터가 모두 삭제됩니다"
        confirmLabel={isDeletingActiveTask ? "종료 후 삭제" : "삭제"}
        confirmVariant="primary"
        isConfirming={isDeletingTask}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <ConfirmDialog
        isOpen={activitySwitchTargetTaskId !== null}
        title="개발 기록 중"
        description="현재 개발 중입니다. 개발 중인 세션을 종료하고 일반 과목 공부를 하시겠습니까?"
        confirmLabel="종료 후 시작"
        isConfirming={isSwitchingFromActivity}
        onClose={handleCloseActivitySwitchDialog}
        onConfirm={handleConfirmActivitySwitch}
      />
    </>
  );
};
