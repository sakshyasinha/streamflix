import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
// Add your imports here
import UserAuthenticationLoginRegister from "./pages/user-authentication-login-register";
import ProfileSelectionManagement from "./pages/profile-selection-management";
import VideoPlayer from "./pages/video-player";
import ContentBrowseSearch from "./pages/content-browse-search";
import HomeDashboard from "./pages/home-dashboard";
import ContentDetailPage from "./pages/content-detail-page";
import NotFound from "./pages/NotFound";
import MyList from "./pages/my-list/MyList";
import ProfileSettings from "./pages/profile-settings/ProfileSettings";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/user-authentication-login-register" element={<UserAuthenticationLoginRegister />} />
          <Route path="/profile-selection-management" element={<ProfileSelectionManagement />} />
          <Route path="/video-player" element={<VideoPlayer />} />
          <Route path="/content-browse-search" element={<ContentBrowseSearch />} />
          <Route path="/home-dashboard" element={<HomeDashboard />} />
          <Route path="/content-detail-page" element={<ContentDetailPage />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
