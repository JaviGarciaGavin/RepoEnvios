"use strict";

document.addEventListener("DOMContentLoaded", displayPosts);

function displayPosts() {
    const postsContainer = document.getElementById("posts-container"); 

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    // Obtener los posts de la API
    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
        .then((response) => response.json()) 
        .then((result) => {
         
            postsContainer.innerHTML = ''; 
           
            result.forEach((post) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post'); 

                
                postElement.innerHTML = 
                `
                 <h2>${post.title}</h2>
                 <p>${post.body}</p>
                 <button class="toggle-comments">Comentarios</button>
                 <div class="comments-container" style="display: none;"></div>
                 `;

       
                postsContainer.appendChild(postElement);

            
                const toggleButton = postElement.querySelector('.toggle-comments');
                const commentsContainer = postElement.querySelector('.comments-container');

                //mostrar/ocultar los comentarios
                toggleButton.addEventListener('click', () => {
                    // Toggle de visibilidad (Nota para uno mismo:ASIGNARLE LA CLASE CUANDO CREAS EL ELEMENTO ARRIBA)
                    if (commentsContainer.style.display === 'none') {
                        // Literalmente los de los posts pro dentro de un post, postception
                       
                        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                            .then(response => response.json())
                            .then(comments => {
                            
                                commentsContainer.innerHTML = ''; 

                                comments.forEach(comment => {
                                    const commentElement = document.createElement('div');
                                    commentElement.classList.add('comment');
                                    commentElement.innerHTML = 
                                    `<p class="author"><strong>De: ${comment.email}</strong></p>
                                     <p>Comentario Numero: ${comment.id}</p>
                                     <p><strong>${comment.name}</strong></p>
                                     <p>${comment.body}</p>
                                     `;
                                    commentsContainer.appendChild(commentElement);
                                });
                                toggleButton.textContent = 'Ocultar Comentarios';
                            })
                            .catch((error) => console.error('No hay comentarios jefe:', error));
                        
                        //Cambiar el estilo del bloque
                        commentsContainer.style.display = 'block';
                    } else {

                        commentsContainer.style.display = 'none';
                        toggleButton.textContent = 'Comentarios';
                    }
                });
            });
        })

        .catch((error) => console.error('En términos de posts no hay posts jefe:', error));
}
