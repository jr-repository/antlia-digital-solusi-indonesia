import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Trash, Edit, Eye, Calendar, User, Tag } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useSupabase } from '@/context/SupabaseContext';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Articles = () => {
  const { articles, refreshArticles, loading } = useSupabase();
  const { toast: uiToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  // Get unique categories
  const categories = ['all', ...new Set(articles.map(article => article.category))];

  // Filter articles by search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = async () => {
    if (articleToDelete) {
      try {
        const { error } = await supabase
          .from('articles')
          .delete()
          .eq('id', articleToDelete);
        
        if (error) throw error;
        
        await refreshArticles();
        toast.success('Artikel berhasil dihapus');
      } catch (error) {
        console.error('Error deleting article:', error);
        toast.error('Gagal menghapus artikel');
      } finally {
        setShowDeleteAlert(false);
        setArticleToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
    setArticleToDelete(null);
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <h1 className="text-3xl font-bold">Artikel</h1>
          
          <Link 
            to="/admin/artikel/baru"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-antlia-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Tambah Artikel
          </Link>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="md:flex md:justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari artikel..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
              >
                <option value="all">Semua Kategori</option>
                {categories.filter(cat => cat !== 'all').map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Articles Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading.articles ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-antlia-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Memuat artikel...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Artikel</th>
                    <th className="py-3 px-4 text-left">Kategori</th>
                    <th className="py-3 px-4 text-left">Tanggal</th>
                    <th className="py-3 px-4 text-left">Penulis</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div 
                              className="w-12 h-12 flex-shrink-0 mr-3 bg-gray-100 rounded-md overflow-hidden"
                            >
                              <img 
                                src={article.image} 
                                alt={article.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="truncate max-w-xs">
                              <div className="font-semibold text-gray-800 truncate">
                                {article.title}
                              </div>
                              <div className="text-sm text-gray-500 truncate">
                                {article.summary.substring(0, 60)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center">
                            <Tag size={14} className="mr-1 text-gray-400" />
                            {article.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            {article.date}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center">
                            <User size={14} className="mr-1 text-gray-400" />
                            {article.author}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <Link 
                              to={`/artikel/${article.id}`}
                              className="p-2 text-gray-600 hover:text-antlia-blue rounded-md hover:bg-gray-100"
                              title="Lihat Artikel"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Eye size={18} />
                            </Link>
                            
                            <Link 
                              to={`/admin/artikel/${article.id}`}
                              className="p-2 text-gray-600 hover:text-antlia-blue rounded-md hover:bg-gray-100"
                              title="Edit Artikel"
                            >
                              <Edit size={18} />
                            </Link>
                            
                            <button
                              onClick={() => handleDeleteClick(article.id)}
                              className="p-2 text-gray-600 hover:text-red-500 rounded-md hover:bg-gray-100"
                              title="Hapus Artikel"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        {searchTerm || categoryFilter !== 'all' 
                          ? "Tidak ada artikel yang sesuai dengan filter."
                          : "Belum ada artikel yang dibuat."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan menghapus artikel secara permanen dan tidak dapat dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 text-white hover:bg-red-600">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default Articles;
