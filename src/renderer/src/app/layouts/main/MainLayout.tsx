import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "@/widgets/topbar";
import { Sidebar } from "@/widgets/sidebar";
import * as S from "./MainLayout.style";

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <S.LayoutContainer>
      <Topbar onToggleSidebar={toggleSidebar} />
      <S.ContentWrapper>
        <Sidebar isOpen={isSidebarOpen} />
        <S.MainContent>
          <Outlet />
        </S.MainContent>
      </S.ContentWrapper>
    </S.LayoutContainer>
  );
};
