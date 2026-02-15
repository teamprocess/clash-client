import * as S from "./MiniGame.styles";
import { useMiniGame } from "../model/useMiniGame";

export const MiniGame = () => {
  const { playerY, obstacleX, score, isGameOver, jump, reset } = useMiniGame();

  const handleAction = () => {
    if (isGameOver) reset();
    else jump();
  };

  return (
    <S.Container onClick={handleAction} aria-label={isGameOver ? "Restart mini game" : "Jump"}>
      <S.Player style={{ transform: `translateY(${playerY}px)` }} />
      <S.Obstacle style={{ transform: `translateX(${obstacleX}px)` }} />

      <S.Score>Score: {score}</S.Score>

      {isGameOver && <S.GameOver>Game Over · click to restart</S.GameOver>}
    </S.Container>
  );
};
