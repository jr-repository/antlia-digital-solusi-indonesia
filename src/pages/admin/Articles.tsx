
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  AlertTriangle, 
  Check 
} from 'lucide-react';
import { useSupabase } from '@/context/SupabaseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const AdminArticles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const { articles, loading, refreshArticles } = useSupabase();

  // Filter articles by search term
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleToDelete);

      if (error) throw error;

      toast.success('Artikel berhasil dihapus');
      refreshArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Gagal menghapus artikel');
    }

    setIsDeleteDialogOpen(false);
    setArticleToDelete(null);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Kelola Artikel</h2>
          <p className="text-gray-500">Lihat dan kelola semua artikel di website Anda</p>
        </div>
        <Link to="/admin/artikel/baru">
          <Button className="bg-antlia-blue hover:bg-antlia-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Artikel Baru
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Cari artikel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Total: {filteredArticles.length} artikel</span>
        </div>
      </div>

      {loading.articles ? (
        <div className="flex justify-center items-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-antlia-blue border-r-transparent" />
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead className="hidden md:table-cell">Kategori</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="w-[150px] text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article, index) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium truncate max-w-[200px]">
                        {article.title}
                      </p>
                      {article.featured && (
                        <Badge variant="outline" className="bg-antlia-blue/10 text-antlia-blue border-antlia-blue/20 mt-1">
                          Artikel Pilihan
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {article.category || "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(article.created_at).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={article.published ? "success" : "secondary"}>
                      {article.published ? "Diterbitkan" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/artikel/${article.id}`} target="_blank">
                        <Button variant="outline" size="icon" className="h-8 w-8" title="Lihat">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/admin/artikel/${article.id}`}>
                        <Button variant="outline" size="icon" className="h-8 w-8" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline"
                        size="icon" 
                        className="h-8 w-8" 
                        title="Hapus" 
                        onClick={() => handleDeleteClick(article.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">Tidak ada artikel</h3>
          <p className="mt-2 text-gray-500">
            Belum ada artikel yang ditambahkan atau sesuai dengan pencarian Anda
          </p>
          <Link to="/admin/artikel/baru">
            <Button className="mt-4 bg-antlia-blue hover:bg-antlia-blue/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Buat Artikel Pertama
            </Button>
          </Link>
        </div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Artikel yang dihapus tidak dapat dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDeleteConfirm}>
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminArticles;
