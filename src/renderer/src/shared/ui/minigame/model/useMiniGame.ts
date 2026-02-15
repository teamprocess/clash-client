import { useCallback, useEffect, useRef, useState } from "react";

const GAME_WIDTH = 400;

const PLAYER_X = 50;
const PLAYER_WIDTH = 30;

const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 40;

const GRAVITY = 0.6;
const JUMP_VELOCITY = -12;
const OBSTACLE_SPEED = 4;

const OBSTACLE_START_X = GAME_WIDTH; // 오른쪽 밖에서 시작
const OBSTACLE_OFFSCREEN_X = -OBSTACLE_WIDTH - 10; // 왼쪽 밖으로 충분히 나가면 리셋

export const useMiniGame = () => {
  // rAF 루프에서 “현재값”을 안정적으로 쓰기 위해 ref를 단일 소스로 사용
  const playerYRef = useRef(0); // 0 = 바닥, 음수 = 위로 점프
  const obstacleXRef = useRef(OBSTACLE_START_X);
  const velocityRef = useRef(0);
  const isJumpingRef = useRef(false);

  // 화면 렌더링용 state
  const [playerY, setPlayerY] = useState(0);
  const [obstacleX, setObstacleX] = useState(OBSTACLE_START_X);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const jump = useCallback(() => {
    if (isGameOver) return;
    if (isJumpingRef.current) return;

    velocityRef.current = JUMP_VELOCITY;
    isJumpingRef.current = true;
  }, [isGameOver]);

  const reset = useCallback(() => {
    // refs 초기화
    playerYRef.current = 0;
    obstacleXRef.current = OBSTACLE_START_X;
    velocityRef.current = 0;
    isJumpingRef.current = false;

    // states 초기화
    setPlayerY(0);
    setObstacleX(OBSTACLE_START_X);
    setScore(0);
    setIsGameOver(false);
  }, []);

  useEffect(() => {
    let rafId = 0;

    // consistent-return / cleanup 안정성까지 챙기기 위해 항상 cleanup을 반환
    if (isGameOver) {
      return () => cancelAnimationFrame(rafId);
    }

    const tick = () => {
      // 1) 플레이어 물리
      velocityRef.current += GRAVITY;
      const nextY = playerYRef.current + velocityRef.current;

      if (nextY >= 0) {
        playerYRef.current = 0;
        velocityRef.current = 0;
        isJumpingRef.current = false;
      } else {
        playerYRef.current = nextY;
      }

      // 2) 장애물 이동
      const nextObstacleX = obstacleXRef.current - OBSTACLE_SPEED;

      if (nextObstacleX < OBSTACLE_OFFSCREEN_X) {
        obstacleXRef.current = OBSTACLE_START_X;
        setScore(prev => prev + 1);
      } else {
        obstacleXRef.current = nextObstacleX;
      }

      // 3) 렌더링 반영
      setPlayerY(playerYRef.current);
      setObstacleX(obstacleXRef.current);

      // 4) 충돌 판정 (DOM getBoundingClientRect 제거: 성능/정확도 ↑)
      const playerLeft = PLAYER_X;
      const playerRight = PLAYER_X + PLAYER_WIDTH;

      const obstacleLeft = obstacleXRef.current;
      const obstacleRight = obstacleXRef.current + OBSTACLE_WIDTH;

      const hitX = playerRight > obstacleLeft && playerLeft < obstacleRight;

      // 장애물 높이(40px)보다 점프가 낮으면(= 바닥에서 충분히 못 뜨면) 충돌 처리
      // playerY는 음수로 올라가므로, -40보다 "덜" 올라갔으면 충돌 가능
      const hitY = playerYRef.current > -OBSTACLE_HEIGHT;

      if (hitX && hitY) {
        setIsGameOver(true);
        return; // 다음 프레임 예약하지 않음
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isGameOver]);

  return {
    playerY,
    obstacleX,
    score,
    isGameOver,
    jump,
    reset,
  };
};
