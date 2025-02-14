import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Comentarios from "./Comentarios";
import PerfilUsuario from "./PerfilUsuario"; 

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState(null); 

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

  
  const handleUserClick = (userId) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((userData) => {
        setUserProfile(userData); 
      });
  };

  return (
    <BrowserRouter>
      <div>
        {userProfile && <PerfilUsuario user={userProfile} />}

        <h1>Lista de Posts</h1>
        <div id="posts-container">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <p>
                <strong>Autor:</strong>{" "}
          
                <span style={{cursor: 'pointer', fontWeight:'bold' }}onClick={() => handleUserClick(post.userId)}>
                  {getAuthorName(post.userId)}
                </span>
              </p>
              <Comentarios postId={post.id} />
            </div>
          ))}
        </div>
      </div>

      {/* Definimos las rutas para el perfil */}
      <Routes>
        <Route path="/perfil/:userId" element={<PerfilUsuario />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
