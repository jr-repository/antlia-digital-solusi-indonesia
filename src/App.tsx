
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

// Components
import LoadingScreen from './components/LoadingScreen';

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
  {
    path: '/admin',
    element: <Login />,
  },
  {
    path: '/admin/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin/artikel',
    element: <AdminArticles />,
  },
  {
    path: '/admin/artikel/baru',
    element: <ArticleCreate />,
  },
  {
    path: '/admin/artikel/:id',
    element: <ArticleEdit />,
  },
  {
    path: '/admin/klien',
    element: <AdminClients />,
  },
  {
    path: '/admin/paket',
    element: <Packages />,
  },
  {
    path: '/admin/tim',
    element: <Team />,
  },
  {
    path: '/admin/pengaturan',
    element: <Settings />,
  },
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
