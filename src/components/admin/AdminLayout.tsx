
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, FileText, Settings, LogOut,
  ChevronDown, ChevronRight, ChevronLeft, Users, PackageOpen, Building
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // If user is not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/admin/login';
    }
  }, [isAuthenticated]);

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Artikel',
      path: '/admin/artikel',
      icon: <FileText size={20} />,
    },
    {
      name: 'Paket & Layanan',
      path: '/admin/paket',
      icon: <PackageOpen size={20} />,
    },
    {
      name: 'Tim Kami',
      path: '/admin/tim',
      icon: <Users size={20} />,
    },
    {
      name: 'Klien & Studi Kasus',
      path: '/admin/klien',
      icon: <Building size={20} />,
    },
    {
      name: 'Pengaturan',
      path: '/admin/pengaturan',
      icon: <Settings size={20} />,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } transition-all duration-300 fixed h-full z-30`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {isSidebarOpen ? (
            <Link to="/admin/dashboard" className="text-lg font-semibold">
              Antlia Admin
            </Link>
          ) : (
            <Link to="/admin/dashboard" className="flex justify-center">
              <img src="/assets/logo-white.png" alt="Logo" className="h-6 w-auto" />
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-700 transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="mt-5 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center py-2 px-3 mb-2 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-antlia-blue text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
          <button
            onClick={logout}
            className="flex items-center w-full py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Mobile Header */}
        <header className="md:hidden bg-white p-4 shadow-sm flex justify-between items-center">
          <h1 className="text-lg font-bold">Antlia Admin</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>
        
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
