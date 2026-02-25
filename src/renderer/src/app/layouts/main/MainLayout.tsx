import { useRef, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useRealtimeSync } from "@/features/app-monitor";
import { GitHubGuard } from "@/features/github";
import { Topbar } from "@/widgets/topbar";
import { Sidebar } from "@/widgets/sidebar";
import * as S from "./MainLayout.style";
import type { LayoutVariant } from "./MainLayout.types";

interface MainLayoutProps {
  variant?: LayoutVariant;
}

export const MainLayout = ({ variant = "default" }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const mainContentRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useRealtimeSync();

  useEffect(() => {
    mainContentRef.current?.scrollTo(0, 0);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <S.LayoutContainer>
      <Topbar onToggleSidebar={toggleSidebar} />
      <S.ContentWrapper>
        <Sidebar isOpen={isSidebarOpen} />
        <S.MainContent ref={mainContentRef} $variant={variant}>
          <Outlet />
        </S.MainContent>
      </S.ContentWrapper>
      <GitHubGuard />
    </S.LayoutContainer>
  );
};
