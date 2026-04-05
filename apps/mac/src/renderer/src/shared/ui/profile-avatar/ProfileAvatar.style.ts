import styled from "styled-components";

export const Root = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;
  height: 100%;
  flex: 0 0 auto;
  overflow: visible;
`;

export const Photo = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.fill.alternative};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const Placeholder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ theme }) => theme.fill.alternative};
  overflow: hidden;
`;

export const PlaceholderFigure = styled.div`
  position: absolute;
  inset: 0;
  color: ${({ theme }) => theme.line.normal};
`;

export const PlaceholderHead = styled.div`
  position: absolute;
  top: 24%;
  left: 50%;
  width: 28%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  transform: translateX(-50%);
  background: currentColor;
`;

export const PlaceholderBody = styled.div`
  position: absolute;
  left: 50%;
  bottom: 13%;
  width: 60%;
  height: 25%;
  transform: translateX(-50%);
  background: currentColor;
  border-radius: 999px 999px 35% 35%;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const Badge = styled.img`
  position: absolute;
  inset: 50% auto auto 50%;
  width: 145%;
  height: 145%;
  object-fit: contain;
  pointer-events: none;
  z-index: 3;
  transform: translate(-50%, -50%);
`;
