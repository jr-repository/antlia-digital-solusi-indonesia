
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, ShoppingBag, BarChart4, Layout, Plus, Edit, Eye } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
      <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
        </div>
        
        {/* Dashboard Greeting */}
        <Card className="mb-6 border-l-4 border-l-antlia-blue">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Selamat Datang di Admin Panel</h2>
            <p className="text-gray-600">
              Kelola konten website Antlia dari dashboard admin ini.
            </p>
          </CardContent>
        </Card>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link to={stat.link} key={index} className="block transform transition-transform hover:scale-105">
              <Card className="overflow-hidden h-full">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className={`${stat.color} flex-shrink-0 h-full w-16 flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Content Management */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Articles */}
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-lg font-semibold">Artikel Terbaru</CardTitle>
              <Link to="/admin/artikel/baru">
                <Button 
                  size="sm" 
                  className="bg-antlia-blue hover:bg-antlia-blue hover:opacity-90"
                >
                  <Plus size={16} className="mr-1" />
                  Tambah Baru
                </Button>
              </Link>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="divide-y">
                {articles.slice(0, 5).map(article => (
                  <div key={article.id} className="py-3 px-6 hover:bg-gray-50 flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{article.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span>{article.date}</span>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link to={`/admin/artikel/${article.id}`} className="text-gray-500 hover:text-antlia-blue">
                        <Edit size={16} />
                      </Link>
                      <Link to={`/artikel/${article.slug}`} className="text-gray-500 hover:text-green-600" target="_blank">
                        <Eye size={16} />
                      </Link>
                    </div>
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
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Aksi Cepat</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/admin/artikel/baru"
                  className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-antlia-blue hover:bg-opacity-5 transition-colors"
                >
                  <FileText size={30} className="mb-2 text-antlia-blue" />
                  <span>Tulis Artikel Baru</span>
                </Link>
                
                <Link
                  to="/admin/pengaturan"
                  className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-antlia-purple hover:bg-opacity-5 transition-colors"
                >
                  <Layout size={30} className="mb-2 text-antlia-purple" />
                  <span>Kelola Website</span>
                </Link>
                
                <Link
                  to="/artikel"
                  className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-green-500 hover:bg-opacity-5 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye size={30} className="mb-2 text-green-500" />
                  <span>Lihat Website</span>
                </Link>
                
                <button
                  onClick={() => window.open('https://wa.me/6281573635143', '_blank')}
                  className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-yellow-500 hover:bg-opacity-5 transition-colors"
                >
                  <Users size={30} className="mb-2 text-yellow-500" />
                  <span>Bantuan Support</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
