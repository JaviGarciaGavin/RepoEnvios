// Comentarios.jsx
import React, { useState, useEffect } from "react";

const Comentarios = ({ postId }) => {
  const [comments, setComments] = useState([]);


  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((commentsData) => setComments(commentsData))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [postId]);
  
  const postComments = comments.filter((comment) => comment.postId === postId);

  return (
    <details>
      <summary>Comentarios:</summary>
      <div className="comments-list">
        {postComments.map((comment) => (
          <div key={comment.id} className="comment">
            <p><strong>{comment.name}</strong></p>
            <p>{comment.body}</p>
            <p><em>{comment.email}</em></p>
          </div>
        ))}
      </div>
    </details>
  );
};

export default Comentarios;
