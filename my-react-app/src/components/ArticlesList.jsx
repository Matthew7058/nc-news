import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://news-project-2.onrender.com/api/articles')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="articles-container">
      {articles.map(article => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesList;