
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Image, Upload } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { useData } from '@/context/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ArticleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArticleById, updateArticle } = useData();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    image: '',
    author: '',
    category: '',
    date: '',
  });
  
  // Local state for image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Load article data
  useEffect(() => {
    if (id) {
      const article = getArticleById(id);
      if (article) {
        setFormData({
          title: article.title,
          slug: article.slug,
          summary: article.summary,
          content: article.content,
          image: article.image,
          author: article.author,
          category: article.category,
          date: article.date,
        });
        
        if (article.image) {
          setImagePreview(article.image);
        }
      } else {
        navigate('/admin/artikel', { replace: true });
      }
    }
  }, [id, getArticleById, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleEditorChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        setFormData(prev => ({
          ...prev,
          image: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.summary || !formData.content) {
      toast({
        title: 'Error',
        description: 'Harap isi semua field yang wajib.',
        variant: 'destructive',
      });
      return;
    }
    
    if (id) {
      // Update the article
      updateArticle(id, formData);
      
      toast({
        title: 'Artikel Diperbarui',
        description: 'Artikel telah berhasil diperbarui.',
      });
      
      // Navigate back to articles list
      navigate('/admin/artikel');
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-4 md:mb-0">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-4"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Edit Artikel</h1>
          </div>
          
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-antlia-blue hover:bg-antlia-blue hover:opacity-90 text-white"
          >
            <Save size={16} className="mr-2" />
            Simpan Perubahan
          </Button>
        </div>
        
        {/* Form */}
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x">
              {/* Main Content */}
              <div className="lg:col-span-2 p-6">
                <div className="mb-6">
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Judul Artikel*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    placeholder="Masukkan judul artikel"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="slug" className="block text-gray-700 font-medium mb-2">
                    Slug URL
                  </label>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">antlia.id/artikel/</span>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                      placeholder="judul-artikel"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Auto-generated dari judul, dapat diubah jika diperlukan.
                  </p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="summary" className="block text-gray-700 font-medium mb-2">
                    Ringkasan*
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    placeholder="Ringkasan singkat artikel (akan ditampilkan di daftar artikel)"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Konten Artikel*
                  </label>
                  <RichTextEditor
                    initialValue={formData.content}
                    onChange={handleEditorChange}
                  />
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1 p-6">
                <div className="mb-6">
                  <label htmlFor="image" className="block text-gray-700 font-medium mb-2 flex items-center">
                    <Image size={16} className="mr-2" />
                    Gambar Utama
                  </label>
                  <div className="mb-4 border border-dashed border-gray-300 rounded-lg overflow-hidden">
                    {imagePreview || formData.image ? (
                      <img
                        src={imagePreview || formData.image}
                        alt="Article Preview"
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center">
                        <Upload size={32} className="text-gray-400 mb-2" />
                        <span className="text-gray-400">Upload Gambar</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="image-upload" className="flex-1">
                      <div className="bg-antlia-blue text-white text-center py-2 px-4 rounded-md cursor-pointer hover:bg-opacity-90 flex items-center justify-center">
                        <Upload size={16} className="mr-2" />
                        Pilih Gambar
                      </div>
                      <input
                        type="file"
                        id="image-upload"
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Format yang didukung: JPG, PNG. Ukuran maksimal: 2MB
                  </p>
                </div>
                
                <div className="mb-6 bg-gray-50 p-4 rounded-md">
                  <label htmlFor="author" className="block text-gray-700 font-medium mb-2">
                    Penulis
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                    Kategori
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  >
                    <option value="ERP">ERP</option>
                    <option value="WMS">WMS</option>
                    <option value="TMS">TMS</option>
                    <option value="HRM">HRM</option>
                    <option value="CRM">CRM</option>
                    <option value="IoT">IoT</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                    Tanggal Publikasi
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                  />
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Badge variant="outline" className="bg-gray-50">
                    Dipublikasikan
                  </Badge>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ArticleEdit;
