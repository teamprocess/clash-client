import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { SignInPage, SignUpPage } from "@/pages/auth";
import { AuthLayout } from "@/app/layouts/auth";

const AuthRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/sign-in${location.search}`} replace />;
};

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <HashRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="*" element={<AuthRedirect />} />
          </Route>
        </Routes>
      </HashRouter>
    </GoogleReCaptchaProvider>
  );
}

export default App;
