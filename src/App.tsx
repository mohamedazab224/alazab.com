
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import MaintenanceTracking from "./pages/MaintenanceTracking";
import MaintenanceList from "./pages/MaintenanceList";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/maintenance-request" element={<MaintenanceRequest />} />
        <Route path="/maintenance-tracking" element={<MaintenanceTracking />} />
        <Route path="/maintenance-list" element={<MaintenanceList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
