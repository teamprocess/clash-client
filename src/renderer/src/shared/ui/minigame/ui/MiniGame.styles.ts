import styled from "styled-components";

export const Container = styled.button`
  width: 400px;
  height: 150px;
  border: 2px solid white;
  position: relative;
  overflow: hidden;
  padding: 0;
  background: transparent;
  cursor: pointer;
  appearance: none;
`;

export const Player = styled.div`
  width: 30px;
  height: 30px;
  background: white;
  position: absolute;
  bottom: 0;
  left: 50px;
  will-change: transform;
  pointer-events: none;
`;

export const Obstacle = styled.div`
  width: 20px;
  height: 40px;
  background: red;
  position: absolute;
  bottom: 0;
  left: 0;
  will-change: transform;
  pointer-events: none;
`;

export const Score = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  color: white;
  font-size: 12px;
  pointer-events: none;
  user-select: none;
`;

export const GameOver = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: white;
  font-size: 20px;
  pointer-events: none;
`;
