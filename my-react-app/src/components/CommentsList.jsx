// src/components/CommentsList.jsx
import React, { useEffect, useState } from 'react';
import CommentCard from './CommentCard';

const CommentsList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  useEffect(() => {
    fetch(`https://news-project-2.onrender.com/api/articles/${article_id}/comments`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch comments');
        }
        return res.json();
      })
      .then(data => {
        // Check the structure of the returned data. 
        // If it returns { comments: [ ... ] }:
        setComments(data.comments);
        setIsCommentsLoading(false);
      })
      .catch(err => {
        setCommentsError(err.message);
        setIsCommentsLoading(false);
      });
  }, [article_id]);

  if (isCommentsLoading) return <p>Loading comments...</p>;
  if (commentsError) return <p>Error loading comments: {commentsError}</p>;

  return (
    <section className="comments-section">
      <h3>Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="comments-list">
          {comments.map(comment => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default CommentsList;