// src/components/CommentCard.jsx
import React from 'react';

const CommentCard = ({ comment }) => {
  const { author, body, created_at, votes } = comment;
  const formattedDate = new Date(created_at).toLocaleString();

  return (
    <li className="comment-card">
      <div className="comment-header">
        <strong>{author}</strong> <small>({formattedDate})</small>
      </div>
      <p className="comment-body">{body}</p>
      <div className="comment-footer">
        <span className="comment-votes">Votes: {votes}</span>
      </div>
    </li>
  );
};

export default CommentCard;