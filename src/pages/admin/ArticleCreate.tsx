
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { useData } from '@/context/DataContext';
import { useToast } from '@/components/ui/use-toast';

const ArticleCreate = () => {
  const navigate = useNavigate();
  const { addArticle } = useData();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    image: '',
    author: 'Tim Antlia',
    category: 'ERP',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title (simplified version)
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
    // For demo purposes, we'll just use a placeholder image
    // In a real application, you would upload the file to a server
    // and then set the URL to the uploaded file
    
    setFormData(prev => ({
      ...prev,
      image: '/assets/article-placeholder.jpg',
    }));
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
    
    // Set current date if not provided
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Add the article
    addArticle({
      ...formData,
      date: currentDate,
      image: formData.image || '/assets/article-placeholder.jpg',
    });
    
    toast({
      title: 'Artikel Dibuat',
      description: 'Artikel baru telah berhasil dibuat.',
    });
    
    // Navigate back to articles list
    navigate('/admin/artikel');
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-wrap justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-1 rounded-full hover:bg-gray-100"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">Tambah Artikel Baru</h1>
          </div>
          
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 bg-antlia-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
          >
            <Save size={16} className="mr-2" />
            Simpan Artikel
          </button>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                  <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                    Gambar Utama
                  </label>
                  <div className="mb-4">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Article Preview"
                        className="w-full h-40 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-gray-400">Preview Gambar</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-antlia-blue"
                    accept="image/*"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Ukuran yang direkomendasikan: 1200x630px
                  </p>
                </div>
                
                <div className="mb-6">
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ArticleCreate;
