import { Outlet } from "react-router-dom";
import * as S from "./AuthLayout.style";

export const AuthLayout = () => {
  return (
    <S.LayoutContainer>
      <Outlet />
    </S.LayoutContainer>
  );
};
