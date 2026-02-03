import { ThemeProvider } from "styled-components";
import { HashRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { queryClient } from "@/shared/lib/queryClient";
import { GlobalStyle } from "./styles/GlobalStyle";
import { useTheme } from "@/shared/lib/useTheme";
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

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

function App() {
  const { theme } = useTheme();

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
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/roadmap/major-choice" element={<RoadmapMajorChoicePage />} />
                <Route path="/roadmap/:sectionId" element={<ChapterPage />} />
              </Route>
              <Route element={<MainLayout isScrollAble />}>
                <Route path="/shop" element={<ShopPage />} />
              </Route>
              <Route element={<MainLayout isFixed />}>
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
