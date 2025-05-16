
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Users, 
  File, 
  Settings, 
  Package, 
  Calendar, 
  ArrowRight, 
  Home, 
  FileText,
  ArrowUp,
  ArrowDown,
  Plus,
  Edit,
  Eye
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';

const Dashboard = () => {
  const { articles, pricing, clients, team } = useData();
  const [timeframe, setTimeframe] = useState('week');
  
  // Sample data for dashboard
  const stats = [
    {
      title: 'Total Artikel',
      value: articles.length,
      icon: <FileText className="h-6 w-6 text-white" />,
      color: 'bg-antlia-blue',
      link: '/admin/artikel',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Pengunjung',
      value: '1,243',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
      link: '#',
      change: '+5.3%',
      trend: 'up'
    },
    {
      title: 'Paket',
      value: pricing.length,
      icon: <Package className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
      link: '/admin/packages',
      change: '0%',
      trend: 'neutral'
    },
    {
      title: 'Klien',
      value: clients.length,
      icon: <File className="h-6 w-6 text-white" />,
      color: 'bg-yellow-500',
      link: '/admin/clients',
      change: '+2',
      trend: 'up'
    }
  ];

  // Data untuk grafik pengunjung
  const visitorsData = [
    { 
      name: 'Minggu 1', visitors: 643, pageviews: 1423, newUsers: 234,
      week: 'Minggu, 5 Mei', month: 'Mei', year: '2025'
    },
    { 
      name: 'Minggu 2', visitors: 782, pageviews: 1753, newUsers: 285,
      week: 'Minggu, 12 Mei', month: 'Mei', year: '2025'
    },
    { 
      name: 'Minggu 3', visitors: 879, pageviews: 1932, newUsers: 312,
      week: 'Minggu, 19 Mei', month: 'Mei', year: '2025'
    },
    { 
      name: 'Minggu 4', visitors: 1243, pageviews: 2453, newUsers: 387,
      week: 'Minggu, 26 Mei', month: 'Mei', year: '2025'
    }
  ];

  // Data untuk grafik distribusi artikel
  const articleData = [
    { name: 'Teknologi', count: 8 },
    { name: 'Logistik', count: 6 },
    { name: 'ERP', count: 5 },
    { name: 'Supply Chain', count: 4 },
    { name: 'IoT', count: 3 },
    { name: 'Lainnya', count: 4 }
  ];

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
            <div className="text-sm text-gray-500">
              {format(new Date(), 'EEEE, dd MMMM yyyy', { locale: require('date-fns/locale/id') })}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={timeframe === 'week' ? 'default' : 'outline'}
              className={timeframe === 'week' ? 'bg-antlia-blue hover:bg-antlia-blue/90' : ''}
              onClick={() => setTimeframe('week')}
            >
              Mingguan
            </Button>
            <Button
              size="sm"
              variant={timeframe === 'month' ? 'default' : 'outline'}
              className={timeframe === 'month' ? 'bg-antlia-blue hover:bg-antlia-blue/90' : ''}
              onClick={() => setTimeframe('month')}
            >
              Bulanan
            </Button>
            <Button
              size="sm"
              variant={timeframe === 'year' ? 'default' : 'outline'}
              className={timeframe === 'year' ? 'bg-antlia-blue hover:bg-antlia-blue/90' : ''}
              onClick={() => setTimeframe('year')}
            >
              Tahunan
            </Button>
          </div>
        </div>
        
        {/* Dashboard Greeting */}
        <Card className="mb-6 border-l-4 border-l-antlia-blue shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Selamat Datang di Admin Panel</h2>
            <p className="text-gray-600">
              Kelola konten website Antlia dari dashboard admin ini. Pantau statistik dan performa website Anda.
            </p>
          </CardContent>
        </Card>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link to={stat.link} key={index} className="block transition-transform hover:scale-105">
              <Card className="overflow-hidden h-full shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className={`${stat.color} flex-shrink-0 h-full w-16 flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                    <div className="p-4 w-full">
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      <div className="flex items-center mt-2 text-xs">
                        {stat.trend === 'up' && <ArrowUp size={12} className="text-green-500 mr-1" />}
                        {stat.trend === 'down' && <ArrowDown size={12} className="text-red-500 mr-1" />}
                        <span className={`font-medium ${
                          stat.trend === 'up' ? 'text-green-500' : 
                          stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-gray-400 ml-1">vs periode sebelumnya</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Grafik */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <Card className="xl:col-span-2 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Pengunjung Website</CardTitle>
              <CardDescription>
                Total pengunjung, page views, dan pengguna baru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={visitorsData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey={
                        timeframe === 'week' ? 'name' : 
                        timeframe === 'month' ? 'month' : 'year'
                      }
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('id-ID').format(value as number)} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="pageviews"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Page Views"
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stackId="2"
                      stroke="#4f46e5"
                      fill="#4f46e5"
                      fillOpacity={0.8}
                      name="Pengunjung"
                    />
                    <Area
                      type="monotone"
                      dataKey="newUsers"
                      stackId="3"
                      stroke="#fbbf24"
                      fill="#fbbf24"
                      fillOpacity={0.6}
                      name="Pengguna Baru"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Distribusi Artikel</CardTitle>
              <CardDescription>
                Berdasarkan kategori
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={articleData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Jumlah Artikel" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Content Management */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Articles */}
          <Card className="shadow-md">
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
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Aksi Cepat</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/admin/artikel/baru"
                  className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-antlia-blue hover:bg-opacity-5 hover:border-antlia-blue transition-all"
                >
                  <File size={30} className="mb-2 text-antlia-blue" />
                  <span>Tulis Artikel Baru</span>
                </Link>
                
                <Link
                  to="/admin/packages"
                  className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-purple-500 hover:bg-opacity-5 hover:border-purple-500 transition-all"
                >
                  <Package size={30} className="mb-2 text-purple-500" />
                  <span>Kelola Paket</span>
                </Link>
                
                <Link
                  to="/admin/team"
                  className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-green-500 hover:bg-opacity-5 hover:border-green-500 transition-all"
                >
                  <Users size={30} className="mb-2 text-green-500" />
                  <span>Kelola Tim</span>
                </Link>
                
                <Link
                  to="/admin/clients"
                  className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-yellow-500 hover:bg-opacity-5 hover:border-yellow-500 transition-all"
                >
                  <Home size={30} className="mb-2 text-yellow-500" />
                  <span>Kelola Klien</span>
                </Link>
                
                <Link
                  to="/admin/pengaturan"
                  className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-antlia-purple hover:bg-opacity-5 hover:border-antlia-purple transition-all"
                >
                  <Settings size={30} className="mb-2 text-antlia-purple" />
                  <span>Kelola Website</span>
                </Link>
                
                <button
                  onClick={() => window.open('https://wa.me/6281573635143', '_blank')}
                  className="p-4 border rounded-md flex flex-col items-center text-center hover:bg-blue-500 hover:bg-opacity-5 hover:border-blue-500 transition-all"
                >
                  <Users size={30} className="mb-2 text-blue-500" />
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
