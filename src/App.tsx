
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import MaintenanceTracking from "./pages/MaintenanceTracking";
import MaintenanceList from "./pages/MaintenanceList";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectManagement from "./pages/ProjectManagement";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectPortfolioDetails from "./pages/ProjectPortfolioDetails";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CEOPage from "./pages/CEOPage";
import ChatbotPage from "./pages/ChatbotPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/maintenance-request" element={<MaintenanceRequest />} />
        <Route path="/maintenance-tracking" element={<MaintenanceTracking />} />
        <Route path="/maintenance-list" element={<MaintenanceList />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/project-management" element={
          <ProtectedRoute>
            <ProjectManagement />
          </ProtectedRoute>
        } />
        <Route path="/projects/:projectId" element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        } />
        <Route path="/portfolio/:projectId" element={<ProjectPortfolioDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ceo" element={<CEOPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
