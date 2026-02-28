import * as S from "./Task.style";
import { formatTime } from "@/shared/lib";
import { useTaskList } from "../../model/useTaskList";
import { Button, ConfirmDialog, Popover } from "@/shared/ui";

export const Task = () => {
  const {
    tasks,
    editMode,
    editingTaskId,
    taskName,
    openMenuTaskId,
    deleteTargetId,
    isDeletingActiveTask,
    activitySwitchTargetTaskId,
    isSwitchingFromActivity,
    menuRef,
    isTaskActive,
    getTaskStudyTime,
    setTaskName,
    handlePlayPauseClick,
    handleCloseActivitySwitchDialog,
    handleConfirmActivitySwitch,
    handleMoreClick,
    handleCloseMenu,
    handleEditClick,
    handleDeleteRequest,
    handleAddClick,
    handleCancelEdit,
    handleSaveTask,
    handleCancelDelete,
    handleConfirmDelete,
  } = useTaskList();

  return (
    <>
      <S.TaskContainer>
        <S.TaskBox>
          {tasks.map(task => {
            const isActive = isTaskActive(task.id);
            const studyTime = getTaskStudyTime(task.id);
            const isMenuOpen = openMenuTaskId === task.id;
            const isEditing = editMode === "edit" && editingTaskId === task.id;

            if (isEditing) {
              return (
                <S.TaskItem key={task.id}>
                  <S.TaskLeftBox>
                    <S.TaskTextInput
                      placeholder="과목명을 입력하세요."
                      value={taskName}
                      onChange={e => setTaskName(e.target.value)}
                    />
                  </S.TaskLeftBox>
                  <S.TaskRightBox>
                    <S.ButtonBox>
                      <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                        취소
                      </Button>
                      <Button variant="primary" size="sm" onClick={handleSaveTask}>
                        저장
                      </Button>
                    </S.ButtonBox>
                  </S.TaskRightBox>
                </S.TaskItem>
              );
            }

            return (
              <S.TaskItem key={task.id}>
                <S.TaskLeftBox>
                  <S.IconButton onClick={() => handlePlayPauseClick(task.id)}>
                    {isActive ? <S.PauseIcon /> : <S.PlayIcon />}
                  </S.IconButton>
                  <S.TaskText>{task.name}</S.TaskText>
                </S.TaskLeftBox>
                <S.TaskRightBox>
                  <S.TaskText>{formatTime(studyTime)}</S.TaskText>
                  <S.MoreIconWrapper ref={isMenuOpen ? menuRef : null}>
                    <S.IconButton onClick={() => handleMoreClick(task.id)}>
                      <S.MoreIcon />
                    </S.IconButton>
                    <Popover isOpen={isMenuOpen} onClose={handleCloseMenu} anchorRef={menuRef}>
                      <S.MenuList>
                        <S.MenuItem onClick={() => handleEditClick(task.id)}>과목 수정</S.MenuItem>
                        <S.MenuItem onClick={() => handleDeleteRequest(task.id)}>
                          과목 삭제
                        </S.MenuItem>
                      </S.MenuList>
                    </Popover>
                  </S.MoreIconWrapper>
                </S.TaskRightBox>
              </S.TaskItem>
            );
          })}
          {editMode === "add" && (
            <S.TaskItem>
              <S.TaskLeftBox>
                <S.TaskTextInput
                  placeholder="과목명을 입력하세요."
                  value={taskName}
                  onChange={e => setTaskName(e.target.value)}
                />
              </S.TaskLeftBox>
              <S.TaskRightBox>
                <S.ButtonBox>
                  <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                    취소
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSaveTask}>
                    저장
                  </Button>
                </S.ButtonBox>
              </S.TaskRightBox>
            </S.TaskItem>
          )}
          <S.AddTaskButton onClick={handleAddClick}>+ 과목 추가</S.AddTaskButton>
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
        confirmVariant="danger"
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
