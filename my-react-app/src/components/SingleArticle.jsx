// src/components/SingleArticle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentsList from './CommentsList';

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [voteError, setVoteError] = useState(null); 
  const [optimisticVotes, setOptimisticVotes] = useState(0); 

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
        setVoteError(null);
        setOptimisticVotes(0);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVote = (increment) => {
    setOptimisticVotes((curr) => curr + increment);
    setVoteError(null); 

    fetch(`https://news-project-2.onrender.com/api/articles/${article_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inc_votes: increment }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update votes');
      }
      return res.json();
    })
    .then(data => {
        setArticle(data.article);
    })
    .catch(err => {
      // Revert optimistic update on error
      setOptimisticVotes((curr) => curr - increment);
      setVoteError('Failed to update votes. Please try again.');
    });
  };

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;

  const { title, author, topic, created_at, votes, body } = article;
  const formattedDate = new Date(created_at).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const displayedVotes = votes + optimisticVotes;


  return (
    <div>
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
      <div className="voting-section">
        <p>Votes: {displayedVotes}</p>
        <button onClick={() => handleVote(1)}>Upvote</button>
        <button onClick={() => handleVote(-1)}>Downvote</button>
        {voteError && <p className="error">{voteError}</p>}
      </div>
      <footer>
        <Link to="/articles">← Back to All Articles</Link>
      </footer>
      <CommentsList article_id={article_id} />
    </article>
    </div>

    
  );
};

export default SingleArticle;