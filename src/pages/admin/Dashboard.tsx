
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, ShoppingBag, BarChart4, Layout, Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/context/DataContext';

const Dashboard = () => {
  const { articles } = useData();

  // Sample data for dashboard
  const stats = [
    {
      title: 'Total Artikel',
      value: articles.length,
      icon: <FileText className="h-6 w-6 text-white" />,
      color: 'bg-antlia-blue',
      link: '/admin/artikel'
    },
    {
      title: 'Pengunjung',
      value: '1,243',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
      link: '#'
    },
    {
      title: 'Paket',
      value: '6',
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
      link: '#'
    },
    {
      title: 'Konversi',
      value: '5.2%',
      icon: <BarChart4 className="h-6 w-6 text-white" />,
      color: 'bg-yellow-500',
      link: '#'
    }
  ];

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {/* Dashboard Greeting */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-2">Selamat Datang di Admin Panel</h2>
          <p className="text-gray-600">
            Kelola konten website Antlia dari dashboard admin ini.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:gri-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Link to={stat.link} className="block h-full">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-12 w-12 rounded-full ${stat.color} flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{stat.title}</h3>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Content Management */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Recent Articles */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Artikel Terbaru</h2>
              <Link 
                to="/admin/artikel/baru" 
                className="inline-flex items-center px-3 py-1.5 bg-antlia-blue text-white text-sm rounded hover:bg-opacity-90 transition-colors"
              >
                <Plus size={16} className="mr-1" />
                Tambah Baru
              </Link>
            </div>
            
            <div className="divide-y">
              {articles.slice(0, 5).map(article => (
                <div key={article.id} className="p-4 hover:bg-gray-50">
                  <Link to={`/admin/artikel/${article.id}`} className="block">
                    <h3 className="font-semibold mb-1">{article.title}</h3>
                    <div className="flex text-sm text-gray-500">
                      <span className="mr-4">{article.date}</span>
                      <span>{article.category}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t text-center">
              <Link 
                to="/admin/artikel" 
                className="text-antlia-blue hover:text-antlia-purple transition-colors"
              >
                Lihat Semua Artikel
              </Link>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Aksi Cepat</h2>
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-4">
              <Link
                to="/admin/artikel/baru"
                className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-gray-50 transition-colors"
              >
                <FileText size={30} className="mb-2 text-antlia-blue" />
                <span>Tulis Artikel Baru</span>
              </Link>
              
              <Link
                to="/admin/pengaturan"
                className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-gray-50 transition-colors"
              >
                <Layout size={30} className="mb-2 text-antlia-purple" />
                <span>Kelola Website</span>
              </Link>
              
              <Link
                to="/artikel"
                className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-gray-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Layout size={30} className="mb-2 text-green-500" />
                <span>Lihat Website</span>
              </Link>
              
              <button
                onClick={() => window.open('https://wa.me/6281573635143', '_blank')}
                className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-gray-50 transition-colors"
              >
                <Users size={30} className="mb-2 text-yellow-500" />
                <span>Bantuan Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
