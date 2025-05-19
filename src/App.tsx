
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

// Components
import LoadingScreen from './components/LoadingScreen';
import AdminPageWrapper from './components/admin/AdminPageWrapper';

// Pages
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Clients from './pages/Clients';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminArticles from './pages/admin/Articles';
import ArticleCreate from './pages/admin/ArticleCreate';
import ArticleEdit from './pages/admin/ArticleEdit';
import AdminClients from './pages/admin/Clients';
import Packages from './pages/admin/Packages';
import Team from './pages/admin/Team';
import Settings from './pages/admin/Settings';

// Context
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { SupabaseProvider } from './context/SupabaseContext';

// Styles
import './App.css';

// Router
const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/tentang',
    element: <About />,
  },
  {
    path: '/layanan',
    element: <Services />,
  },
  {
    path: '/solusi',
    element: <Solutions />,
  },
  {
    path: '/klien',
    element: <Clients />,
  },
  {
    path: '/artikel',
    element: <Articles />,
  },
  {
    path: '/artikel/:id',
    element: <ArticleDetail />,
  },
  {
    path: '/kontak',
    element: <Contact />,
  },
  {
    path: '/harga',
    element: <Pricing />,
  },
  
  // Admin Routes
  {
    path: '/admin',
    element: <Login />,
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminPageWrapper><Dashboard /></AdminPageWrapper>,
  },
  {
    path: '/admin/artikel',
    element: <AdminPageWrapper><AdminArticles /></AdminPageWrapper>,
  },
  {
    path: '/admin/artikel/baru',
    element: <AdminPageWrapper><ArticleCreate /></AdminPageWrapper>,
  },
  {
    path: '/admin/artikel/:id',
    element: <AdminPageWrapper><ArticleEdit /></AdminPageWrapper>,
  },
  {
    path: '/admin/klien',
    element: <AdminPageWrapper><AdminClients /></AdminPageWrapper>,
  },
  {
    path: '/admin/paket',
    element: <AdminPageWrapper><Packages /></AdminPageWrapper>,
  },
  {
    path: '/admin/tim',
    element: <AdminPageWrapper><Team /></AdminPageWrapper>,
  },
  {
    path: '/admin/pengaturan',
    element: <AdminPageWrapper><Settings /></AdminPageWrapper>,
  },
  
  // Catch-all for 404
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <SupabaseProvider>
      <DataProvider>
        <AuthProvider>
          <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
          <Toaster position="top-center" richColors closeButton />
        </AuthProvider>
      </DataProvider>
    </SupabaseProvider>
  );
}

export default App;
