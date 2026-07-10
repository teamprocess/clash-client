import { Outlet } from "react-router-dom";
import { ViewportColumn } from "@clash/ui";

export const AuthLayout = () => {
  return (
    <ViewportColumn viewport="fixed">
      <Outlet />
    </ViewportColumn>
  );
};
