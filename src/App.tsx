
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Solutions from "./pages/Solutions";
import Clients from "./pages/Clients";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminArticles from "./pages/admin/Articles";
import AdminArticleCreate from "./pages/admin/ArticleCreate";
import AdminArticleEdit from "./pages/admin/ArticleEdit";
import AdminSettings from "./pages/admin/Settings";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/tentang" element={<About />} />
              <Route path="/layanan" element={<Services />} />
              <Route path="/solusi" element={<Solutions />} />
              <Route path="/klien" element={<Clients />} />
              <Route path="/artikel" element={<Articles />} />
              <Route path="/artikel/:id" element={<ArticleDetail />} />
              <Route path="/kontak" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/artikel" element={<AdminArticles />} />
              <Route path="/admin/artikel/baru" element={<AdminArticleCreate />} />
              <Route path="/admin/artikel/:id" element={<AdminArticleEdit />} />
              <Route path="/admin/pengaturan" element={<AdminSettings />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
