import { Button, Popover, Tooltip } from "@/shared/ui";
import * as S from "./Todo.style";
import { useTodoList } from "../../model/useTodoList";

export const Todo = () => {
  const {
    todos,
    editMode,
    editingTodoId,
    todoName,
    todoNameInputRef,
    todoNameInputMaxLength,
    todoNameErrorMessage,
    isTodoNameInvalid,
    shouldShowTodoNameTooltip,
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
    handlePlayPauseClick,
    handleCompleteClick,
    handleDeleteClick,
  } = useTodoList();

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
        placeholder="할 일을 입력하세요."
        value={todoName}
        maxLength={todoNameInputMaxLength}
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
        <S.TodoBox>
          {todos.map(todoItem => {
            const isMenuOpen = openMenuTodoId === todoItem.id;
            const isEditing = editMode === "EDIT" && editingTodoId === todoItem.id;

            if (isEditing) {
              return (
                <S.TodoItem key={todoItem.id}>
                  <S.TodoInputBox>{renderTodoNameInput()}</S.TodoInputBox>
                  <S.TodoRightBox>
                    <S.ButtonBox>
                      <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                        취소
                      </Button>
                      <Button variant="primary" size="sm" onClick={handleSaveClick}>
                        저장
                      </Button>
                    </S.ButtonBox>
                  </S.TodoRightBox>
                </S.TodoItem>
              );
            }

            return (
              <S.TodoItem key={todoItem.id}>
                <S.TodoLeftBox>
                  <S.IconButton
                    type="button"
                    aria-label={todoItem.isActive ? "할 일 일시정지" : "할 일 시작"}
                    onClick={() => handlePlayPauseClick(todoItem.id)}
                  >
                    {todoItem.isActive ? <S.PauseIcon /> : <S.PlayIcon />}
                  </S.IconButton>
                  <S.TodoText $completed={todoItem.isCompleted}>{todoItem.name}</S.TodoText>
                </S.TodoLeftBox>
                <S.TodoRightBox>
                  {todoItem.parentTaskName ? (
                    <S.ParentTaskName>{todoItem.parentTaskName}</S.ParentTaskName>
                  ) : null}
                  <S.MoreIconWrapper ref={isMenuOpen ? menuRef : null}>
                    <S.IconButton
                      type="button"
                      aria-label="할 일 메뉴 열기"
                      onClick={() => handleMoreClick(todoItem.id)}
                    >
                      <S.MoreIcon />
                    </S.IconButton>
                    <Popover
                      isOpen={isMenuOpen}
                      onClose={handleCloseMenu}
                      anchorRef={menuRef}
                      minWidth="max-content"
                    >
                      <S.MenuList>
                        <S.MenuItem onClick={() => handleCompleteClick(todoItem.id)}>
                          완료로 표시
                        </S.MenuItem>
                        <S.MenuItem onClick={() => handleEditClick(todoItem.id)}>
                          할 일 수정
                        </S.MenuItem>
                        <S.MenuItem onClick={() => handleDeleteClick(todoItem.id)}>
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
                <S.ButtonBox>
                  <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                    취소
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSaveClick}>
                    저장
                  </Button>
                </S.ButtonBox>
              </S.TodoRightBox>
            </S.TodoItem>
          )}
          <S.AddTodoButton onClick={handleAddClick}>+ 할 일 추가</S.AddTodoButton>
        </S.TodoBox>
      </S.TodoList>
    </S.TodoContainer>
  );
};
