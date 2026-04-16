import { useRef, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDailyRefresh, useRealtimeSync } from "@/features/app-monitor";
import { GlobalAnnouncementDialog } from "@/features/announcement";
import { GitHubGuard } from "@/features/github";
import { useNoticePushNotification } from "@/features/notice";
import { Topbar } from "@/widgets/topbar";
import { Sidebar } from "@/widgets/sidebar";
import * as S from "./MainLayout.style";

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const mainContentRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useRealtimeSync();
  useDailyRefresh();
  useNoticePushNotification();

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
        <S.MainContent ref={mainContentRef}>
          <Outlet />
        </S.MainContent>
      </S.ContentWrapper>
      <GlobalAnnouncementDialog />
      <GitHubGuard />
    </S.LayoutContainer>
  );
};
