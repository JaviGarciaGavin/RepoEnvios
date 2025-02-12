import React, { useState, useEffect } from "react";
import Comentarios from "./Comentarios";  // Importamos el componente Comentarios

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((postsData) => setPosts(postsData));

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((usersData) => setUsers(usersData));
  }, []);

  const getAuthorName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Desconocido";
  };

  return (
    <div>
      <h1>Lista de Posts</h1>
      <div id="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p><strong>Autor:</strong> {getAuthorName(post.userId)}</p>
            <Comentarios postId={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
