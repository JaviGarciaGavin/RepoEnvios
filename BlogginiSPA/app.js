"use strict";

document.addEventListener("DOMContentLoaded", BlogginiApp);

function BlogginiApp() {
   
    const appContainer = document.getElementById("app-container");
   
    const state = {
        view: "posts", 
        userId: null
    };

    function render() {
        if (state.view === "posts") {
            displayPosts();
        } else if (state.view === "user") {
            displayUser(state.userId);
        }
    }

    // Sacar posts y comentarios
    function displayPosts() {

        appContainer.innerHTML = '<div id="posts-container"></div>';
        const postsContainer = document.getElementById("posts-container");

        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((posts) => {
                fetch("https://jsonplaceholder.typicode.com/users")
                    .then((response) => response.json())
                    .then((users) => {
                        const userMap = new Map(users.map(user => [user.id, user]));

                        posts.forEach((post) => {
                            
                            const user = userMap.get(post.userId);
                            const username = user ? user.username : "Desconocido";
                            const postElement = document.createElement('div');
                            
                            postElement.classList.add('post');
                            postElement.innerHTML = `
                                
                                <h2>${post.title}</h2>
                                <p>${post.body}</p>
                                <p>Autor: <a href="#" class="user-link" data-user-id="${user?.id}">${username}</a></p>
                                <button class="toggle-comments">Comentarios</button>
                                <div class="comments-container" style="display: none;"></div>
                            `;

                            postsContainer.appendChild(postElement);

                            const toggleButton = postElement.querySelector('.toggle-comments');
                            const commentsContainer = postElement.querySelector('.comments-container');

                            toggleButton.addEventListener('click', () => {

                                if (commentsContainer.style.display === 'none') {
                                    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                                        .then((response) => response.json())
                                        .then((comments) => {
                                            commentsContainer.innerHTML = '';
                                            comments.forEach((comment) => {
                                                const commentElement = document.createElement('div');
                                                commentElement.classList.add('comment');
                                                commentElement.innerHTML = `
                                                    <p class="author"><strong>De: ${comment.email}</strong></p>
                                                    <p>${comment.body}</p>
                                                `;
                                                commentsContainer.appendChild(commentElement);
                                            });
                                            toggleButton.textContent = 'Ocultar Comentarios';
                                        });
                                    commentsContainer.style.display = 'block';
                                } else {
                                    commentsContainer.style.display = 'none';
                                    toggleButton.textContent = 'Comentarios';
                                }
                            });

                            const userLink = postElement.querySelector('.user-link');
                            userLink.addEventListener('click', (event) => {
                                state.view = "user";
                                state.userId = user.id;
                                render();
                            });
                        });
                    });
            });
    }

    // Sacar el usuario
    function displayUser(userId) {
        
        appContainer.innerHTML = '<div id="user-container"></div>';
        const userContainer = document.getElementById("user-container");

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => response.json())
            .then((user) => {
                userContainer.innerHTML = `
                    <h2>${user.username}</h2>
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                    <h4>Dirección:</h4>
                    <ul>
                        <li>Calle: ${user.address.street}</li>
                        <li>Apartamento: ${user.address.suite}</li>
                        <li>Ciudad: ${user.address.city}</li>
                    </ul>
                    <button id="back-to-posts">Volver a Publicaciones</button>
                    <button id="toggle-albums">Ver Álbumes</button>
                    <button id="toggle-todos">Ver Quehaceres</button>
                    <div id="albums-container" style="display: none;"></div>
                    <div id="todos-container" style="display: none;"></div>
                `;

                document.getElementById("back-to-posts").addEventListener('click', () => {
                    state.view = "posts";
                    state.userId = null;
                    render();
                });
                
                //ALBUMS
                const albumsContainer = document.getElementById("albums-container");
                const toggleAlbums = document.getElementById("toggle-albums");
               
                toggleAlbums.addEventListener('click', () => {
                    if (albumsContainer.style.display === 'none') {
                        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
                            .then((response) => response.json())
                            .then((albums) => {
                                albumsContainer.innerHTML = '<h4>Álbumes</h4>';
                                albums.forEach((album) => {
                                    const albumElement = document.createElement('div');
                                    albumElement.classList.add('todo');
                                    albumElement.innerHTML = `
                                    <p>Number: ${album.id}</p>
                                    <p class="author"><strong>${album.title}</strong></p>
                                `;
                                    albumsContainer.appendChild(albumElement);
                                });
                                toggleAlbums.textContent = 'Ocultar Álbumes';
                            });
                        albumsContainer.style.display = 'block';
                    } else {
                        albumsContainer.style.display = 'none';
                        toggleAlbums.textContent = 'Ver Álbumes';
                    }
                });
                
                //TO DO'S
                const todosContainer = document.getElementById("todos-container");
                const toggleTodos = document.getElementById("toggle-todos");
                
                toggleTodos.addEventListener('click', () => {
                    if (todosContainer.style.display === 'none') {
                        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
                            .then((response) => response.json())
                            .then((todos) => {
                                todosContainer.innerHTML = '<h4>Quehaceres</h4>';
                                todos.forEach((todo) => {
                                    let imgUrl;
                                    if (todo.completed) {
                                        imgUrl = "tick.png";  
                                    } else {
                                        imgUrl = "x.png"; 
                                    }
                                    const toDoElement = document.createElement('div');
                                    toDoElement.classList.add('todo');
                                    toDoElement.innerHTML = `
                                        <p>Number: ${todo.id}</p>
                                        <p class="author"><strong>${todo.title}</strong></p>
                                        <p class="estado">
                                        Terminada: 
                                         <img src="${imgUrl}" style="vertical-align: middle;">
                                        </p>
                                    `;
                                    
                                    todosContainer.appendChild(toDoElement);
                                });
                                toggleTodos.textContent = 'Ocultar Quehaceres';
                            });
                        todosContainer.style.display = 'block';
                    } else {
                        todosContainer.style.display = 'none';
                        toggleTodos.textContent = 'Ver Quehaceres';
                    }
                });
            });
    }
    render();
}
