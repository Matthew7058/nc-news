import React from 'react';

const ArticleCard = ({ article }) => {
  const { title, author, topic, created_at, votes, comment_count } = article;

  const formattedDate = new Date(created_at).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <article className="article-card">
      <h2>{title}</h2>
      <p className="metadata">
        <span className="author">By {author}</span> |{' '}
        <span className="topic">{topic}</span> |{' '}
        <time dateTime={created_at}>{formattedDate}</time>
      </p>
      <div className="engagement">
        <span className="votes">Votes: {votes}</span> |{' '}
        <span className="comment_count ">Comments: {comment_count}</span>
      </div>
    </article>
  );
};

export default ArticleCard;