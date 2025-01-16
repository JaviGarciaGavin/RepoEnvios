"use strict";

document.addEventListener("DOMContentLoaded", displayPosts);

function displayPosts() {
    const postsContainer = document.getElementById("posts-container"); 

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
    .then((response) => response.json()) // Convertir la respuesta a JSON
    .then((result) => {
        const postsContainer = document.getElementById("posts-container");

      
        postsContainer.innerHTML = ''; 

       
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((users) => {
                
                const userMap = new Map(users.map(user => [user.id, user])); // Mapa/Array de de usuarios con su id para usarlo en el autor

                result.forEach((post) => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post'); 
                    
                    // Obtener usuario correspondiente, se puede hacer con expresiones ternarias en caso de que no exista pero me es mas comodo asi
                    let username, userId;
                    const user = userMap.get(post.userId);
                    if (user) {
                        username = user.username;
                        userId = user.id;
                    } else {
                        username = "Desconocido";
                        userId = null;
                    }

                    // Crear el contenedor para el post con sus cosas
                    postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                        <p>Autor: 
                            <a href="perfil.html?userId=${userId}" class="user-link">${username}</a>
                        </p>
                        <button class="toggle-comments">Comentarios</button>
                        <div class="comments-container" style="display: none;"></div>
                    `;

                    postsContainer.appendChild(postElement);

                    const toggleButton = postElement.querySelector('.toggle-comments');
                    const commentsContainer = postElement.querySelector('.comments-container');

                    //CAJA DE COMENTARIOS
                    toggleButton.addEventListener('click', () => {
                        //Si el css esta puesto con display block none  (Que lo esta por defecto) fetcheo de la api y genero todo el bloque de comentarios
                        if (commentsContainer.style.display === 'none') {
                            //Pillar comentarios
                            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                                .then((response) => response.json())
                                .then((comments) => {
                                    // Limpiar comentarios previos
                                    commentsContainer.innerHTML = '';
                                    
                                    // Mostrar comentarios
                                    comments.forEach((comment) => {
                                        
                                        const commentElement = document.createElement('div');
                                        commentElement.classList.add('comment');
                                        
                                        //Contenido de cada comentario
                                        commentElement.innerHTML = `
                                            <p class="author"><strong>De: ${comment.email}</strong></p>
                                            <p>Comentario Numero: ${comment.id}</p>
                                            <p><strong>${comment.name}</strong></p>
                                            <p>${comment.body}</p>
                                        `;
                                        commentsContainer.appendChild(commentElement);
                                    });
                                    toggleButton.textContent = 'Ocultar Comentarios';
                                })
                                .catch((error) => console.error('Error al obtener comentarios:', error));
                                commentsContainer.style.display = 'block';
                        //Si no esta en block none lo vuelve a ocultar
                        } else {
                            commentsContainer.style.display = 'none';
                            toggleButton.textContent = 'Comentarios';
                        }
                    });
                });
            })
            .catch((error) => console.error('Error al obtener usuarios:', error));
    })
    .catch((error) => console.error('En términos de posts no hay posts jefe:', error));

}
