import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { queryClient } from "@/shared/lib/queryClient";
import { GlobalStyle } from "./styles/GlobalStyle";
import {
  useNetworkStatus,
  useServiceUnavailable,
  useTheme,
} from "@/shared/lib";
import { useStartupUpdateState } from "@/features/startup-update";
import { MainLayout } from "@/app/layouts/main";
import { HomePage } from "@/pages/home";
import { RecordPage } from "@/pages/record";
import { GroupPage } from "@/pages/group";
import { ChapterPage, RoadmapMajorChoicePage } from "@/pages/roadmap";
import { ProductsPage, ShopPage } from "@/pages/shop";
import { AuthLayout } from "@/app/layouts/auth";
import { SignInPage } from "@/pages/auth";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { RoadmapPage } from "@/pages/roadmap/section/RoadmapPage";
import { ComparePage } from "@/pages/home/compare/ComparePage";
import { ProfilePage } from "@/pages/profile";
import { OfflinePage } from "@/pages/offline";
import { ServiceUnavailablePage } from "@/pages/service-unavailable";
import { TabLayout } from "@/app/layouts/tab";
import { RivalCompetitionPage } from "@/pages/competition";
import { StartupGatePage } from "@/pages/startup";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
const APP_ENTRY_SCREEN_DURATION_MS = 1200;
const START_KEY = "clash-startup-screen-shown";

const getParam = (key: string) => {
  if (typeof window === "undefined") return null;

  return new URLSearchParams(window.location.search).get(key);
};

const hasShownStart = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(START_KEY) === "1";
};

const markShown = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(START_KEY, "1");
};

function App() {
  const { theme } = useTheme();
  const isOnline = useNetworkStatus();
  const serviceUnavailableState = useServiceUnavailable();
  const startup = useStartupUpdateState();
  const isLauncher = getParam("startupWindow") === "1";
  const isLaunch = getParam("appLaunch") === "1";
  const isStartPreview = startup.previewMode === "ready" || startup.previewMode === "overlay";
  const isGatePreview = !isLaunch && startup.previewMode !== null && !isStartPreview;
  const [shown, setShown] = useState(hasShownStart);
  const showStart = !isLauncher && (isStartPreview || (isLaunch && !shown));
  const autoHide = showStart && isLaunch && !isStartPreview;

  useEffect(() => {
    if (!autoHide) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShown(true);
      markShown();
    }, APP_ENTRY_SCREEN_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [autoHide]);

  const startPage = isLauncher ? (
    <StartupGatePage
      state={startup.state}
      windowMode="launcher"
      onRetry={startup.previewMode ? undefined : startup.retry}
    />
  ) : isGatePreview ? (
    <StartupGatePage state={startup.state} windowMode="launcher" onRetry={undefined} />
  ) : showStart ? (
    <StartupGatePage state={{ phase: "ready", version: null, progressPercent: null }} />
  ) : null;

  const appPage = !isOnline ? (
    <OfflinePage />
  ) : serviceUnavailableState ? (
    <ServiceUnavailablePage />
  ) : (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home/transition" element={<ComparePage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/roadmap/major-choice" element={<RoadmapMajorChoicePage />} />
          <Route path="/roadmap/:sectionId" element={<ChapterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/competition" element={<RivalCompetitionPage />} />
          <Route path="/competition/rival" element={<Navigate to="/competition" replace />} />
          <Route
            element={
              <TabLayout
                tabs={[
                  { name: "메인", url: "/shop" },
                  { name: "전체 상품 목록", url: "/shop/products" },
                ]}
              />
            }
          >
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/products" element={<ProductsPage />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<Navigate to="/sign-in" replace />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {startPage ?? (
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
          <QueryClientProvider client={queryClient}>
            {appPage}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </GoogleReCaptchaProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
