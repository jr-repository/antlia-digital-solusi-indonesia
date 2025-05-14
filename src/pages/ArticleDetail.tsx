
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useData } from '@/context/DataContext';
import { Article } from '@/context/DataContext';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles, getArticleById } = useData();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (id) {
      const currentArticle = getArticleById(id);
      if (currentArticle) {
        setArticle(currentArticle);
        
        // Find related articles in the same category
        const related = articles
          .filter(a => a.id !== id && a.category === currentArticle.category)
          .slice(0, 3);
        
        setRelatedArticles(related);
      } else {
        navigate('/artikel', { replace: true });
      }
    }
  }, [id, articles, getArticleById, navigate]);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <p className="text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-antlia-blue to-antlia-purple">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              {article.title}
            </h1>
            <div className="flex flex-wrap justify-center items-center text-white/90 space-x-6">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Tag size={16} className="mr-2" />
                <span>{article.category}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-antlia-light/80 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-antlia-blue">Beranda</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <Link to="/artikel" className="text-gray-500 hover:text-antlia-blue">Artikel</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <span className="text-gray-800 truncate max-w-[200px]">{article.title}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-auto rounded-lg mb-8"
              />
              
              <div 
                className="article-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              
              {/* Share Links */}
              <div className="mt-12 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Bagikan Artikel Ini:</h3>
                <div className="flex space-x-4">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    className="bg-[#1877f2] text-white px-4 py-2 rounded"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`}
                    className="bg-[#1da1f2] text-white px-4 py-2 rounded"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                  <a 
                    href={`https://wa.me/?text=${article.title} ${window.location.href}`}
                    className="bg-[#25d366] text-white px-4 py-2 rounded"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/artikel"
                  className="inline-flex items-center text-antlia-blue hover:text-antlia-purple transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Kembali ke Daftar Artikel
                </Link>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Articles */}
              <div className="bg-antlia-light p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4">Artikel Terkait</h3>
                {relatedArticles.length > 0 ? (
                  <div className="space-y-4">
                    {relatedArticles.map((relatedArticle) => (
                      <div key={relatedArticle.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <Link 
                          to={`/artikel/${relatedArticle.id}`}
                          className="block text-lg font-semibold mb-1 hover:text-antlia-blue transition-colors"
                        >
                          {relatedArticle.title}
                        </Link>
                        <div className="text-sm text-gray-500 mb-2">
                          {relatedArticle.date} - {relatedArticle.author}
                        </div>
                        <p className="text-gray-600 line-clamp-2">{relatedArticle.summary}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Tidak ada artikel terkait saat ini.</p>
                )}
              </div>
              
              {/* Categories */}
              <div className="bg-antlia-light p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4">Kategori</h3>
                <div className="space-y-2">
                  {Array.from(new Set(articles.map(a => a.category))).map((category) => (
                    <Link
                      key={category}
                      to={`/artikel?kategori=${category}`}
                      className="block py-2 border-b border-gray-200 last:border-0 hover:text-antlia-blue transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-gradient-to-r from-antlia-blue to-antlia-purple p-6 rounded-lg text-white">
                <h3 className="text-xl font-bold mb-4">Dapatkan Update Terbaru</h3>
                <p className="mb-4">
                  Berlangganan newsletter kami untuk mendapatkan artikel terbaru langsung ke email Anda.
                </p>
                <form>
                  <input 
                    type="email" 
                    placeholder="Email Anda" 
                    className="w-full px-3 py-2 rounded mb-2 text-gray-800"
                  />
                  <button 
                    type="submit"
                    className="w-full px-3 py-2 bg-white text-antlia-blue rounded font-medium"
                  >
                    Berlangganan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton 
        phoneNumber="6281573635143" 
        message={`Halo Antlia, saya ingin diskusi lebih lanjut tentang artikel "${article.title}".`}
      />
    </Layout>
  );
};

export default ArticleDetail;
