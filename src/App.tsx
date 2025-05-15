
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Clients from './pages/Clients';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminArticles from './pages/admin/Articles';
import ArticleCreate from './pages/admin/ArticleCreate';
import ArticleEdit from './pages/admin/ArticleEdit';
import Settings from './pages/admin/Settings';
import Packages from './pages/admin/Packages';
import Team from './pages/admin/Team';
import AdminClients from './pages/admin/Clients';

import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/layanan" element={<Services />} />
        <Route path="/solusi" element={<Solutions />} />
        <Route path="/klien" element={<Clients />} />
        <Route path="/artikel" element={<Articles />} />
        <Route path="/artikel/:slug" element={<ArticleDetail />} />
        <Route path="/kontak" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route 
          path="/admin/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/admin" />} 
        />
        <Route 
          path="/admin/artikel" 
          element={isAuthenticated ? <AdminArticles /> : <Navigate to="/admin" />} 
        />
        <Route 
          path="/admin/artikel/baru" 
          element={isAuthenticated ? <ArticleCreate /> : <Navigate to="/admin" />} 
        />
        <Route 
          path="/admin/artikel/:id" 
          element={isAuthenticated ? <ArticleEdit /> : <Navigate to="/admin" />} 
        />
        <Route 
          path="/admin/pengaturan" 
          element={isAuthenticated ? <Settings /> : <Navigate to="/admin" />} 
        />
        <Route 
          path="/admin/packages" 
          element={isAuthenticated ? <Packages /> : <Navigate to="/admin" />} 
        />
        <Route 
          path="/admin/team" 
          element={isAuthenticated ? <Team /> : <Navigate to="/admin" />} 
        />
        <Route 
          path="/admin/clients" 
          element={isAuthenticated ? <AdminClients /> : <Navigate to="/admin" />} 
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Toaster />
      <SonnerToaster richColors position="top-right" />
    </>
  );
}

export default App;
