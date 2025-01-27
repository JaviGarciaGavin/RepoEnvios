import React, { useState, useEffect } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);

  
  // Obtener los posts y los usuarios
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((postsData) => setPosts(postsData));

  }, []);

  return (
    <div>
      <h1>Lista de Posts</h1>
      <div id="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
