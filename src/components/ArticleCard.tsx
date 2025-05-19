
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Article } from '@/context/SupabaseContext';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="antlia-card overflow-hidden bg-white hover:translate-y-[-5px] transition-all duration-300">
      <Link to={`/artikel/${article.id}`}>
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="inline-flex items-center mr-4">
            <Calendar size={14} className="mr-1" />
            {article.date}
          </span>
          <span className="inline-flex items-center">
            <User size={14} className="mr-1" />
            {article.author}
          </span>
        </div>
        <Link to={`/artikel/${article.id}`}>
          <h3 className="text-lg font-bold mb-2 hover:text-antlia-blue transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
        <Link 
          to={`/artikel/${article.id}`}
          className="text-antlia-blue font-medium hover:text-antlia-purple transition-colors"
        >
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
