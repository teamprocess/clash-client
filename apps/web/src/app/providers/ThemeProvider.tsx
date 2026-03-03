import type { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme } from "@/shared/config/theme";

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  // 기본적으로 다크 테마 사용
  return <StyledThemeProvider theme={darkTheme}>{children}</StyledThemeProvider>;
};
