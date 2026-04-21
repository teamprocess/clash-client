import { useRef, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AttendanceDialog, useAttendanceDialog } from "@/features/attendance";
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
  const attendanceDialog = useAttendanceDialog();
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
      <Topbar
        onToggleSidebar={toggleSidebar}
        onOpenAttendance={attendanceDialog.open}
        isAttendancePending={attendanceDialog.isAttendancePending}
      />
      <S.ContentWrapper>
        <Sidebar isOpen={isSidebarOpen} />
        <S.MainContent ref={mainContentRef}>
          <Outlet />
        </S.MainContent>
      </S.ContentWrapper>
      <AttendanceDialog
        weeklyAttendance={attendanceDialog.weeklyAttendance}
        optimisticAttendedDate={attendanceDialog.optimisticAttendedDate}
        animatedAttendanceDate={attendanceDialog.animatedAttendanceDate}
        isOpen={attendanceDialog.isOpen}
        isSubmitting={attendanceDialog.isSubmitting}
        isCompletingAttendance={attendanceDialog.isCompletingAttendance}
        errorMessage={attendanceDialog.errorMessage}
        onClose={attendanceDialog.close}
        onConfirm={attendanceDialog.confirm}
      />
      <GlobalAnnouncementDialog />
      <GitHubGuard />
    </S.LayoutContainer>
  );
};
