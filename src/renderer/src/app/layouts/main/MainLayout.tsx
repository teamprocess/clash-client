import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "@/widgets/topbar";
import { Sidebar } from "@/widgets/sidebar";
import * as S from "./MainLayout.style";
import type { LayoutVariant } from "./MainLayout.types";

interface MainLayoutProps {
  variant?: LayoutVariant;
}

export const MainLayout = ({ variant = "default" }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <S.LayoutContainer>
      <Topbar onToggleSidebar={toggleSidebar} />
      <S.ContentWrapper>
        <Sidebar isOpen={isSidebarOpen} />
        <S.MainContent $variant={variant}>
          <Outlet />
        </S.MainContent>
      </S.ContentWrapper>
    </S.LayoutContainer>
  );
};
