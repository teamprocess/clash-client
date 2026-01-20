import * as S from "./Task.style";
import * as CommonS from "../Record.style";

const taskMockData = [
  {
    id: 1,
    name: "데이터베이스",
    studyTime: 5400000,
  },
  {
    id: 2,
    name: "자료구조",
    studyTime: 5000000,
  },
  {
    id: 3,
    name: "프로그래밍",
    studyTime: 6000000,
  },
];

export const Task = () => {
  return (
    <S.TaskContainer>
      <S.TaskBox>
        {taskMockData.map(task => (
          <S.TaskItem key={task.id}>
            <S.TaskLeftBox>
              <S.PlayIcon />
              <S.TaskText>{task.name}</S.TaskText>
            </S.TaskLeftBox>
            <S.TaskRightBox>
              <S.TaskText>{task.studyTime}</S.TaskText>
              <CommonS.MoreIcon />
            </S.TaskRightBox>
          </S.TaskItem>
        ))}
      </S.TaskBox>
      <S.AddTaskButton>+ 과목 추가</S.AddTaskButton>
    </S.TaskContainer>
  );
};
