import { ThemeProvider } from "styled-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "@/shared/lib/useTheme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { MainLayout } from "./layouts/main/MainLayout";
import { HomePage } from "@/pages/home";
import { CompetitionPage } from "@/pages/competition";
import { RecordPage } from "@/pages/record";
import { GroupPage } from "@/pages/group";
import { ShopPage } from "@/pages/shop";
import { RoadMapPage } from "@/pages/roadmap";
import { AuthLayout } from "@/app/layouts/auth";
import { SignInPage, SignUpPage } from "@/pages/auth";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { ChoicePage } from "@/pages/roadmap/choice/ChoicePage";
import { TestPage } from "@/pages/roadmap/test";

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/competition" element={<CompetitionPage />} />
            <Route path="/record" element={<RecordPage />} />
            <Route path="/group" element={<GroupPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/roadmap" element={<RoadMapPage />} />
            <Route path="/roadmap/choice" element={<ChoicePage />} />
            <Route path="/roadmap/test" element={<TestPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
