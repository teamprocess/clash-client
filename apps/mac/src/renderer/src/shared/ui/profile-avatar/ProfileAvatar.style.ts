import styled from "styled-components";

export const Root = styled.span`
  position: relative;
  display: inline-flex;
  width: 100%;
  height: 100%;
  flex: 0 0 auto;
  overflow: visible;
`;

export const Photo = styled.span`
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

export const Placeholder = styled.span`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ theme }) => theme.fill.alternative};

  &::before {
    content: "";
    position: absolute;
    top: 24%;
    left: 50%;
    width: 28%;
    height: 28%;
    border-radius: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.line.normal};
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 13%;
    width: 47%;
    height: 25%;
    border-radius: 999px 999px 0.75rem 0.75rem;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.line.normal};
  }
`;

export const Overlay = styled.span`
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
  width: 124%;
  height: 124%;
  object-fit: contain;
  pointer-events: none;
  z-index: 3;
  transform: translate(-50%, -50%);
`;
