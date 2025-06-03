import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import LoginPage from "./Login";
import HomePage from "./HomePage";
import CreateSegment from "./CreateSwgment";
import SegmentPreview from "./SegmentPreview";
import CampaignForm from "./CampaignForm";
import CampaignHistory from "./CampaignHistory";
import CampaignDetails from "./CampaignDetails";
import DashboardOverview from "./DashboardOverview";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Listen for login token changes (optional: more robust logic could use context)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId="1044836791270-3nj1sgcd04jq8f7dtoqle38sveq5anf1.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
            }
          />

          <Route
            path="/"
            element={
              isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
            }
          >
            <Route index element={<DashboardOverview />} />
            <Route path="create-segment" element={<CreateSegment />} />
            <Route path="segment-preview" element={<SegmentPreview />} />
            <Route path="campaign-form" element={<CampaignForm />} />
            <Route path="campaign-history" element={<CampaignHistory />} />
            <Route path="campaign/:id" element={<CampaignDetails />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
