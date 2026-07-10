import styled from "styled-components";
import { ClashLogo as SharedClashLogo } from "@clash/ui";

export const PageContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.background.alternative};
`;

export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(2rem, 5dvh, 5rem);
  width: min(34rem, 100%);
  min-height: min(44rem, calc(100vh - 2rem));
  min-height: min(44rem, calc(100dvh - 2rem));
  margin: auto;
  padding: clamp(2rem, 5dvh, 4rem) clamp(1rem, 4vw, 3rem);
  box-sizing: border-box;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const ClashLogo = styled(SharedClashLogo)`
  width: min(14rem, 70%);
  height: auto;
`;
