import * as S from "./Task.style";
import { formatTime } from "@/shared/lib";
import { useTaskList } from "../../model/useTaskList";
import { Button, ConfirmDialog } from "@/shared/ui";

export const Task = () => {
  const {
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
                    {isMenuOpen && (
                      <S.DropdownMenu>
                        <S.MenuItem onClick={() => handleEditClick(task.id)}>과목 수정</S.MenuItem>
                        <S.MenuItem onClick={() => handleDeleteRequest(task.id)}>
                          과목 삭제
                        </S.MenuItem>
                      </S.DropdownMenu>
                    )}
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
        </S.TaskBox>
        <S.AddTaskButton onClick={handleAddClick}>+ 과목 추가</S.AddTaskButton>
      </S.TaskContainer>
      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="과목 삭제"
        description="정말 해당 과목을 삭제하시겠습니까?"
        confirmMessage="삭제 시 해당 과목의 데이터가 모두 삭제됩니다"
        confirmLabel="삭제"
        confirmVariant="danger"
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
