import { ThemeProvider } from "styled-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "@/shared/lib/useTheme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { MainLayout } from "@/app/layouts/main";
import { HomePage } from "@/pages/home";
import { CompetitionPage } from "@/pages/competition";
import { RecordPage } from "@/pages/record";
import { GroupPage } from "@/pages/group";
import { ShopPage } from "@/pages/shop";
import { ProductsPage } from "@/pages/products";
import { RoadMapPage } from "@/pages/roadmap";
import { AuthLayout } from "@/app/layouts/auth";
import { SignInPage, SignUpPage } from "@/pages/auth";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { ComparePage } from "@/pages/home/compare/ComparePage";

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home/transition" element={<ComparePage />} />
            <Route path="/competition" element={<CompetitionPage />} />
            <Route path="/record" element={<RecordPage />} />
            <Route path="/group" element={<GroupPage />} />
            <Route path="/roadmap" element={<RoadMapPage />} />
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
  );
}

export default App;
