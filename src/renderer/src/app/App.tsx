import { ThemeProvider } from "styled-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "@/shared/lib/useTheme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "@/pages/home";
import { CompetitionPage } from "@/pages/competition";
import { RecordPage } from "@/pages/record";
import { GroupPage } from "@/pages/group";
import { ShopPage } from "@/pages/shop";
import { RoadMapPage } from "@/pages/roadmap";
import { ChoicePage } from "@/pages/roadmap/choice/ChoicePage";

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
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
