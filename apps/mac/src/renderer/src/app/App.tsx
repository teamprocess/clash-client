import { ThemeProvider } from "styled-components";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { queryClient } from "@/shared/lib/queryClient";
import { GlobalStyle } from "./styles/GlobalStyle";
import { useNetworkStatus, useTheme } from "@/shared/lib";
import { MainLayout } from "@/app/layouts/main";
import { HomePage } from "@/pages/home";
import { GroupPage, RecordPage } from "@/pages/record";
import { ChapterPage, RoadmapMajorChoicePage } from "@/pages/roadmap";
import { ProductsPage, ShopPage } from "@/pages/shop";
import { AuthLayout } from "@/app/layouts/auth";
import { SignInPage } from "@/pages/auth";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { RoadmapPage } from "@/pages/roadmap/section/RoadmapPage";
import { ComparePage } from "@/pages/home/compare/ComparePage";
import { ProfilePage } from "@/pages/profile";
import { OfflinePage } from "@/pages/offline";
import { TabLayout } from "@/app/layouts/tab";
import { CompetitionTabs, MyCompetitionPage, RivalCompetitionPage } from "@/pages/competition";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

function App() {
  const { theme } = useTheme();
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <OfflinePage />
      </ThemeProvider>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <HashRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/home/transition" element={<ComparePage />} />
                <Route
                  element={
                    <TabLayout
                      tabs={[
                        { name: "개인 기록", url: "/record" },
                        { name: "그룹 스터디", url: "/record/group" },
                      ]}
                    />
                  }
                >
                  <Route path="/record" element={<RecordPage />} />
                  <Route path="/record/group" element={<GroupPage />} />
                </Route>
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/roadmap/major-choice" element={<RoadmapMajorChoicePage />} />
                <Route path="/roadmap/:sectionId" element={<ChapterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route element={<CompetitionTabs />}>
                  <Route path="/competition" element={<MyCompetitionPage />} />
                  <Route path="/competition/rival" element={<RivalCompetitionPage />} />
                </Route>
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/products" element={<ProductsPage />} />
              </Route>
              <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<Navigate to="/sign-in" replace />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </HashRouter>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleReCaptchaProvider>
  );
}

export default App;
