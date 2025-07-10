import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./Login";
import HomePage from "./HomePage";
import CreateSegment from "./CreateSegment"; // ✅ fixed typo
import SegmentPreview from "./SegmentPreview";
import CampaignForm from "./CampaignForm";
import CampaignHistory from "./CampaignHistory";
import CampaignDetails from "./CampaignDetails";
import DashboardOverview from "./DashboardOverview";
import EditProfile from "./EditProfile";

import { AuthProvider, useAuth } from "./AuthContext";

// Protected route logic
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        }
      />

      {/* Protected */}
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
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
