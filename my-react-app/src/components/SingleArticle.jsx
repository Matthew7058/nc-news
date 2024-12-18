// src/components/SingleArticle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://news-project-2.onrender.com/api/articles/${article_id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch the article');
        }
        return res.json();
      })
      .then(data => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;

  const { title, author, topic, created_at, votes, body } = article;
  const formattedDate = new Date(created_at).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <article className="single-article-page">
      <header>
        <h2>{title}</h2>
        <p className="metadata">
          <span className="author">By {author}</span> |{' '}
          <span className="topic">{topic}</span> |{' '}
          <time dateTime={created_at}>{formattedDate}</time> |{' '}
          <span className="votes">Votes: {votes}</span>
        </p>
      </header>
      <section className="article-body">
        <p>{body}</p>
      </section>
      <footer>
        <Link to="/articles">← Back to All Articles</Link>
      </footer>
    </article>
  );
};

export default SingleArticle;