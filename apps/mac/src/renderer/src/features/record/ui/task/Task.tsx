import * as S from "./Task.style";
import { formatTime, getErrorMessage } from "@/shared/lib";
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
    subjectsQuery,
  } = useTaskList(selectedDate);

  const hasInitialLoadError = subjectsQuery.isError && subjectsQuery.data === undefined;

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
        aria-label="과목명"
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
        <S.TaskBox aria-busy={subjectsQuery.isFetching || undefined}>
          {subjectsQuery.isPending ? (
            <S.ListState kind="loading">과목을 불러오는 중이에요.</S.ListState>
          ) : hasInitialLoadError ? (
            <S.ListState kind="error">
              <span>{getErrorMessage(subjectsQuery.error, "과목을 불러오지 못했어요.")}</span>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => void subjectsQuery.refetch()}
              >
                다시 시도
              </Button>
            </S.ListState>
          ) : subjects.length === 0 && editMode !== "ADD" ? (
            <S.ListState kind="empty">등록된 과목이 없어요. 새 과목을 추가해 보세요.</S.ListState>
          ) : null}
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
                  <S.IconButton
                    type="button"
                    aria-label={`${subject.name} ${isActive ? "학습 일시정지" : "학습 시작"}`}
                    onClick={() => handlePlayPauseClick(subject.id)}
                  >
                    {isActive ? (
                      <S.PauseIcon aria-hidden="true" focusable="false" />
                    ) : (
                      <S.PlayIcon aria-hidden="true" focusable="false" />
                    )}
                  </S.IconButton>
                  <S.TaskText>{subject.name}</S.TaskText>
                </S.TaskLeftBox>
                <S.TaskRightBox>
                  <S.TaskText>{formatTime(studyTime)}</S.TaskText>
                  <S.MoreIconWrapper ref={isMenuOpen ? menuRef : null}>
                    <S.IconButton
                      type="button"
                      aria-label={`${subject.name} 메뉴 ${isMenuOpen ? "닫기" : "열기"}`}
                      aria-haspopup="menu"
                      aria-expanded={isMenuOpen}
                      aria-controls={`task-menu-${subject.id}`}
                      onClick={() => handleMoreClick(subject.id)}
                    >
                      <S.MoreIcon aria-hidden="true" focusable="false" />
                    </S.IconButton>
                    <Popover
                      isOpen={isMenuOpen}
                      onClose={handleCloseMenu}
                      anchorRef={menuRef}
                      role="menu"
                      ariaLabel={`${subject.name} 과목 메뉴`}
                    >
                      <S.MenuList id={`task-menu-${subject.id}`} role="presentation">
                        <S.MenuItem
                          type="button"
                          role="menuitem"
                          onClick={() => handleEditClick(subject.id)}
                        >
                          과목 수정
                        </S.MenuItem>
                        <S.MenuItem
                          type="button"
                          role="menuitem"
                          onClick={() => handleDeleteRequest(subject.id)}
                        >
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
          <S.AddTaskButton
            type="button"
            disabled={isSavingTask || subjectsQuery.isPending || hasInitialLoadError}
            onClick={handleAddClick}
          >
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
