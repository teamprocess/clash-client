import { Button, Popover, Select, Tooltip } from "@/shared/ui";
import * as S from "./Todo.style";
import { useTodoList } from "../../model/useTodoList";
import { getErrorMessage } from "@/shared/lib";

interface TodoProps {
  selectedDate?: string;
}

export const Todo = ({ selectedDate }: TodoProps) => {
  const {
    todos,
    editMode,
    editingTodoId,
    todoName,
    todoNameInputRef,
    todoNameInputMaxLength,
    todoNameErrorMessage,
    isTodoNameInvalid,
    isSavingTodo,
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
    subjectsQuery,
    tasksQuery,
  } = useTodoList(selectedDate);

  const hasInitialTasksError = tasksQuery.isError && tasksQuery.data === undefined;
  const hasInitialSubjectsError = subjectsQuery.isError && subjectsQuery.data === undefined;

  const renderTodoNameInput = () => (
    <Tooltip
      content={todoNameErrorMessage ?? ""}
      position="top"
      open={shouldShowTodoNameTooltip}
      triggerOnHover={false}
      wrapperStyle={{ width: "100%", maxWidth: "100%" }}
    >
      <S.TodoTextInput
        ref={todoNameInputRef}
        aria-label="할 일 제목"
        placeholder="할 일 제목"
        value={todoName}
        maxLength={todoNameInputMaxLength}
        disabled={isSavingTodo}
        aria-invalid={isTodoNameInvalid}
        onChange={handleTodoNameChange}
        onKeyDown={handleTodoNameKeyDown}
      />
    </Tooltip>
  );

  return (
    <S.TodoContainer>
      <S.Title>할 일 목록</S.Title>
      <S.TodoList>
        <S.TodoBox aria-busy={tasksQuery.isFetching || undefined}>
          {hasInitialSubjectsError && (
            <S.SourceNotice role="alert">
              <span>상위 과목 목록을 불러오지 못했어요.</span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => void subjectsQuery.refetch()}
              >
                다시 시도
              </Button>
            </S.SourceNotice>
          )}
          {tasksQuery.isPending ? (
            <S.ListState kind="loading">할 일을 불러오는 중이에요.</S.ListState>
          ) : hasInitialTasksError ? (
            <S.ListState kind="error">
              <span>{getErrorMessage(tasksQuery.error, "할 일을 불러오지 못했어요.")}</span>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => void tasksQuery.refetch()}
              >
                다시 시도
              </Button>
            </S.ListState>
          ) : todos.length === 0 && editMode !== "ADD" ? (
            <S.ListState kind="empty">등록된 할 일이 없어요. 새 할 일을 추가해 보세요.</S.ListState>
          ) : null}
          {todos.map(todoItem => {
            const isMenuOpen = openMenuTodoId === todoItem.id;
            const isEditing = editMode === "EDIT" && editingTodoId === todoItem.id;

            if (isEditing) {
              return (
                <S.TodoItem key={todoItem.id}>
                  <S.TodoInputBox>{renderTodoNameInput()}</S.TodoInputBox>
                  <S.TodoRightBox>
                    <S.ParentTaskSelectBox>
                      <Select
                        aria-label="상위 과목 선택"
                        disabled={subjectsQuery.isPending || hasInitialSubjectsError}
                        value={
                          selectedParentTaskId === null ? "NONE" : String(selectedParentTaskId)
                        }
                        options={parentTaskOptions}
                        onChange={handleParentTaskChange}
                      />
                    </S.ParentTaskSelectBox>
                    <S.ActionButtonsBox>
                      <S.ActionIconButton
                        type="button"
                        aria-label="할 일 추가 취소"
                        disabled={isSavingTodo}
                        onClick={handleCancelEdit}
                      >
                        <S.CancelIcon aria-hidden="true" focusable="false" />
                      </S.ActionIconButton>
                      <S.ActionIconButton
                        type="button"
                        aria-label="할 일 저장"
                        disabled={isSavingTodo}
                        onClick={handleSaveClick}
                      >
                        <S.SaveIcon aria-hidden="true" focusable="false" />
                      </S.ActionIconButton>
                    </S.ActionButtonsBox>
                  </S.TodoRightBox>
                </S.TodoItem>
              );
            }

            return (
              <S.TodoItem key={todoItem.id} $isMenuOpen={isMenuOpen}>
                <S.TodoLeftBox>
                  {todoItem.canTogglePlayback ? (
                    <S.IconButton
                      type="button"
                      aria-label={todoItem.isActive ? "할 일 일시정지" : "할 일 시작"}
                      onClick={() => handlePlayPauseClick(todoItem.id)}
                    >
                      {todoItem.isActive ? (
                        <S.PauseIcon aria-hidden="true" focusable="false" />
                      ) : (
                        <S.PlayIcon aria-hidden="true" focusable="false" />
                      )}
                    </S.IconButton>
                  ) : null}
                  <S.TodoText $completed={todoItem.isCompleted}>{todoItem.name}</S.TodoText>
                </S.TodoLeftBox>
                <S.TodoRightBox>
                  {getParentTaskName(todoItem.parentTaskId) ? (
                    <S.ParentTaskName>{getParentTaskName(todoItem.parentTaskId)}</S.ParentTaskName>
                  ) : null}
                  <S.MoreIconWrapper ref={isMenuOpen ? menuRef : null}>
                    <S.IconButton
                      type="button"
                      aria-label={`${todoItem.name} 할 일 메뉴`}
                      aria-haspopup="menu"
                      aria-expanded={isMenuOpen}
                      onClick={() => handleMoreClick(todoItem.id)}
                    >
                      <S.MoreIcon aria-hidden="true" focusable="false" />
                    </S.IconButton>
                    <Popover
                      isOpen={isMenuOpen}
                      onClose={handleCloseMenu}
                      anchorRef={menuRef}
                      minWidth="max-content"
                      role="menu"
                      ariaLabel={`${todoItem.name} 할 일 메뉴`}
                    >
                      <S.MenuList>
                        <S.MenuItem
                          type="button"
                          role="menuitem"
                          onClick={() => handleCompleteClick(todoItem.id, !todoItem.isCompleted)}
                        >
                          {todoItem.isCompleted ? "할 일로 표시" : "완료로 표시"}
                        </S.MenuItem>
                        <S.MenuItem
                          type="button"
                          role="menuitem"
                          onClick={() => handleEditClick(todoItem.id)}
                        >
                          할 일 수정
                        </S.MenuItem>
                        <S.MenuItem
                          type="button"
                          role="menuitem"
                          onClick={() => handleDeleteClick(todoItem.id)}
                        >
                          할 일 삭제
                        </S.MenuItem>
                      </S.MenuList>
                    </Popover>
                  </S.MoreIconWrapper>
                </S.TodoRightBox>
              </S.TodoItem>
            );
          })}
          {editMode === "ADD" && (
            <S.TodoItem>
              <S.TodoInputBox>{renderTodoNameInput()}</S.TodoInputBox>
              <S.TodoRightBox>
                <S.ParentTaskSelectBox>
                  <Select
                    aria-label="상위 과목 선택"
                    disabled={subjectsQuery.isPending || hasInitialSubjectsError}
                    value={selectedParentTaskId === null ? "NONE" : String(selectedParentTaskId)}
                    options={parentTaskOptions}
                    onChange={handleParentTaskChange}
                  />
                </S.ParentTaskSelectBox>
                <S.ActionButtonsBox>
                  <S.ActionIconButton
                    type="button"
                    aria-label="할 일 추가 취소"
                    disabled={isSavingTodo}
                    onClick={handleCancelEdit}
                  >
                    <S.CancelIcon aria-hidden="true" focusable="false" />
                  </S.ActionIconButton>
                  <S.ActionIconButton
                    type="button"
                    aria-label="할 일 저장"
                    disabled={isSavingTodo}
                    onClick={handleSaveClick}
                  >
                    <S.SaveIcon aria-hidden="true" focusable="false" />
                  </S.ActionIconButton>
                </S.ActionButtonsBox>
              </S.TodoRightBox>
            </S.TodoItem>
          )}
          <S.AddTodoButton
            type="button"
            disabled={isSavingTodo || tasksQuery.isPending || hasInitialTasksError}
            onClick={handleAddClick}
          >
            + 할 일 추가
          </S.AddTodoButton>
        </S.TodoBox>
      </S.TodoList>
    </S.TodoContainer>
  );
};
