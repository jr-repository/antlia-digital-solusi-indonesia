
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/context/SupabaseContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { articles, loading } = useSupabase();
  
  const publishedArticles = articles.filter(article => article.published).length;
  const draftArticles = articles.filter(article => !article.published).length;
  
  return (
    <AdminLayout>
      <div className="text-left mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Kelola artikel dan konten website Anda.</p>
      </div>

      <div className="flex justify-end mb-6">
        <Button 
          onClick={() => navigate('/admin/artikel/baru')}
          className="bg-antlia-blue hover:bg-antlia-blue/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Artikel Baru
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Total Artikel</CardTitle>
            <CardDescription>Jumlah semua artikel</CardDescription>
          </CardHeader>
          <CardContent>
            {loading.articles ? (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-antlia-blue border-r-transparent"></div>
            ) : (
              <p className="text-4xl font-bold">{articles.length}</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Diterbitkan</CardTitle>
            <CardDescription>Artikel yang sudah dipublikasikan</CardDescription>
          </CardHeader>
          <CardContent>
            {loading.articles ? (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-antlia-blue border-r-transparent"></div>
            ) : (
              <p className="text-4xl font-bold">{publishedArticles}</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Draft</CardTitle>
            <CardDescription>Artikel yang belum dipublikasikan</CardDescription>
          </CardHeader>
          <CardContent>
            {loading.articles ? (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-antlia-blue border-r-transparent"></div>
            ) : (
              <p className="text-4xl font-bold">{draftArticles}</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Button 
          onClick={() => navigate('/admin/artikel')}
          variant="outline"
          className="flex items-center"
        >
          <FileText className="mr-2 h-4 w-4" />
          Kelola Artikel
        </Button>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
