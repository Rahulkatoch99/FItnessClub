import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPage from "./components/pages/about";
import Layout from "./components/pages/nav-bar";
import PricingPage from "./components/pages/price";
import ContactPage from "./components/contact";
import { SignUpYourGym } from "./signup/components/signup-your-gym";
import { Home } from "./components/pages/home";
import { SignInPage } from "./signIn-page.tsx/components/signIn-page";
import { LayoutMainPageLayout } from "./main/components/main-page";
import { Dashboard } from "./main/dashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="signup" element={<SignUpYourGym />} />
          <Route path="signin" element={<SignInPage />} />
        </Route>
        <Route path="main-page" element={<LayoutMainPageLayout />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
