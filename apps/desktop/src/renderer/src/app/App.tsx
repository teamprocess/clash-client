import { ThemeProvider } from "styled-components";
import { HashRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { queryClient } from "@/shared/lib/queryClient";
import { GlobalStyle } from "./styles/GlobalStyle";
import { useNetworkStatus, useTheme } from "@/shared/lib";
import { MainLayout } from "@/app/layouts/main";
import { HomePage } from "@/pages/home";
import { CompetitionPage } from "@/pages/competition";
import { RecordPage } from "@/pages/record";
import { ChapterPage, RoadmapMajorChoicePage } from "@/pages/roadmap";
import { ProductsPage, ShopPage } from "@/pages/shop";
import { AuthLayout } from "@/app/layouts/auth";
import { SignInPage, SignUpPage } from "@/pages/auth";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { RoadmapPage } from "@/pages/roadmap/section/RoadmapPage";
import { ComparePage } from "@/pages/home/compare/ComparePage";
import { ProfilePage } from "@/pages/profile";
import { OfflinePage } from "@/pages/offline";

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
                <Route path="/competition" element={<CompetitionPage />} />
                <Route path="/record" element={<RecordPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/roadmap/major-choice" element={<RoadmapMajorChoicePage />} />
                <Route path="/roadmap/:sectionId" element={<ChapterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route element={<MainLayout variant="scrollable" />}>
                <Route path="/shop" element={<ShopPage />} />
              </Route>
              <Route element={<MainLayout variant="fixed" />}>
                <Route path="/shop/products" element={<ProductsPage />} />
              </Route>
              <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
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
