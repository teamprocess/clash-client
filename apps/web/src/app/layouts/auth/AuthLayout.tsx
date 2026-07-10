import { Outlet } from "react-router-dom";
import { ViewportColumn } from "@clash/ui";

export const AuthLayout = () => {
  return (
    <ViewportColumn viewport="dynamic" overflowY="auto">
      <Outlet />
    </ViewportColumn>
  );
};
