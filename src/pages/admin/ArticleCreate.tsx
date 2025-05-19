
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Image, Upload } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ArticleCreate = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    image: '',
    author: 'Tim Antlia',
    category: 'ERP',
    tags: [''],
    featured: false,
    published: false,
    excerpt: ''
  });

  // Local state for image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
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
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.summary || !formData.content) {
      toast.error('Harap isi semua field yang wajib.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Set current date if not provided
      const currentDate = new Date().toISOString().split('T')[0];
      
      // Prepare data for Supabase
      const articleData = {
        ...formData,
        date: currentDate,
        image: formData.image || '/assets/article-placeholder.jpg',
        excerpt: formData.excerpt || formData.summary, // Gunakan summary sebagai excerpt jika tidak diisi
      };
      
      // Insert to Supabase
      const { data, error } = await supabase
        .from('articles')
        .insert(articleData)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success('Artikel baru berhasil dibuat');
      
      // Navigate back to articles list
      navigate('/admin/artikel');
      
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error('Gagal membuat artikel. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
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
            <h1 className="text-2xl md:text-3xl font-bold">Tambah Artikel Baru</h1>
          </div>
          
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-antlia-blue hover:bg-antlia-blue hover:opacity-90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Simpan Artikel
              </>
            )}
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
                
                <div className="mb-6 space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      name="published"
                      checked={formData.published}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-antlia-blue border-gray-300 rounded focus:ring-antlia-blue"
                    />
                    <label htmlFor="published" className="ml-2 block text-gray-700">
                      Publikasikan sekarang
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-antlia-blue border-gray-300 rounded focus:ring-antlia-blue"
                    />
                    <label htmlFor="featured" className="ml-2 block text-gray-700">
                      Jadikan artikel pilihan
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Badge variant="outline" className="bg-gray-50">
                    {formData.published ? "Akan Dipublikasikan" : "Draft"}
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

export default ArticleCreate;
