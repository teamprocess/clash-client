import { useRef, useState } from "react";
import { Popover } from "@/shared/ui";
import * as S from "./Todo.style";

const todoItems = [
  { id: 1, name: "학습 계획 정리하기", isActive: false },
  { id: 2, name: "기록 V2 화면 검토하기", isActive: true },
  { id: 3, name: "오늘 회고 작성하기", isActive: false },
];

export const Todo = () => {
  const [openMenuTodoId, setOpenMenuTodoId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMoreClick = (todoId: number) => {
    setOpenMenuTodoId(prev => (prev === todoId ? null : todoId));
  };

  const handleCloseMenu = () => {
    setOpenMenuTodoId(null);
  };

  return (
    <S.TodoContainer>
      <S.Title>할 일 목록</S.Title>
      <S.TodoList>
        {todoItems.map(todoItem => {
          const isMenuOpen = openMenuTodoId === todoItem.id;

          return (
            <S.TodoItem key={todoItem.id}>
              <S.TodoLeftBox>
                <S.IconButton
                  type="button"
                  aria-label={todoItem.isActive ? "할 일 일시정지" : "할 일 시작"}
                >
                  {todoItem.isActive ? <S.PauseIcon /> : <S.PlayIcon />}
                </S.IconButton>
                <S.TodoText>{todoItem.name}</S.TodoText>
              </S.TodoLeftBox>
              <S.TodoRightBox>
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
                      <S.MenuItem onClick={handleCloseMenu}>완료로 표시</S.MenuItem>
                      <S.MenuItem onClick={handleCloseMenu}>할 일 수정</S.MenuItem>
                      <S.MenuItem onClick={handleCloseMenu}>할 일 삭제</S.MenuItem>
                    </S.MenuList>
                  </Popover>
                </S.MoreIconWrapper>
              </S.TodoRightBox>
            </S.TodoItem>
          );
        })}
      </S.TodoList>
    </S.TodoContainer>
  );
};
