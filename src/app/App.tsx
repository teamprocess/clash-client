import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { SignInCompletePage, SignInPage, SignUpPage } from "@/pages/auth";
import { AuthLayout } from "@/app/layouts/auth";
import { OnboardingPage } from "@/pages/onboarding";

const RootRoute = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hasAuthParams = searchParams.has("state") || searchParams.has("redirectUri");

  if (hasAuthParams) {
    return <Navigate to={`/sign-in${location.search}`} replace />;
  }

  return <OnboardingPage />;
};

const SignInRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/sign-in${location.search}`} replace />;
};

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <HashRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<RootRoute />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-in-complete" element={<SignInCompletePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="*" element={<SignInRedirect />} />
          </Route>
        </Routes>
      </HashRouter>
    </GoogleReCaptchaProvider>
  );
}

export default App;
