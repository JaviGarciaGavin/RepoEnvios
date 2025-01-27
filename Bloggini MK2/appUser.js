"use strict";

document.addEventListener("DOMContentLoaded", displayUser);

function displayUser() {
    const UserContainer = document.getElementById("user-container");

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    
    //Pillo el valor del user Id  de la url para quitarme de lios y no tener que andar con el localStorage
    function pillarURL(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    const userId = pillarURL("userId");
   
    // Obtener el usuario específico usando el userId
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, requestOptions)
        .then((response) => response.json()) // Convertir la respuesta a JSON
        .then((user) => {
            // Limpiar el contenedor antes de agregar nuevos usuarios
            UserContainer.innerHTML = '';

            // Crear el contenedor para el usuario
            const userElement = document.createElement('div');
            userElement.classList.add('user'); // Añadir clase para CSS

            // Rellenar con los detalles del usuario
            userElement.innerHTML = `
                <h2>${user.username}</h2>
                <h3>${user.name}</h3>
                <h4>${user.email}</h4>
                <h4>Dirección:</h4>
                <ul>
                    <li><strong>Calle:</strong> ${user.address.street}</li>
                    <li><strong>Apartamento:</strong> ${user.address.suite}</li>
                    <li><strong>Ciudad:</strong> ${user.address.city}</li>
                </ul>

                <button class="toggle-album">Ver albumes</button>
                <button class="toggle-toDo">Ver quehaceres</button>

                <div class="album-container" style="display: none;"></div>
                <div class="toDo-container" style="display: none;"></div>
            `;

            // Agregar el usuario al contenedor principal
            UserContainer.appendChild(userElement);

            // Obtener los botones para álbumes y quehaceres
            const albumButton = userElement.querySelector('.toggle-album');
            const toDoButton = userElement.querySelector('.toggle-toDo');
            const albumContainer = userElement.querySelector('.album-container');
            const toDoContainer = userElement.querySelector('.toDo-container');

            // Mostrar u ocultar los álbumes
            albumButton.addEventListener('click', () => {
                if (albumContainer.style.display === 'none') {
                    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
                        .then(response => response.json())
                        .then(albums => {
                            albumContainer.innerHTML = '<h2 class="title"><i>Albumes</i></h2>';
                            albums.forEach(album => {
                                const albumElement = document.createElement('div');
                                albumElement.classList.add('album');
                                albumElement.innerHTML = `
                                    <p>Number: ${album.id}</p>
                                    <p class="author"><strong>${album.title}</strong></p>
                                `;
                                albumContainer.appendChild(albumElement);
                            });
                            albumButton.textContent = 'Ocultar Albumes';
                        })
                        .catch(error => console.error('Error al obtener álbum:', error));
                    albumContainer.style.display = 'block';
                } else {
                    albumContainer.style.display = 'none';
                    albumButton.textContent = 'Ver Albumes';
                }
            });



            // Mostrar u ocultar los quehaceres
            toDoButton.addEventListener('click', () => {
                if (toDoContainer.style.display === 'none') {
                    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`)
                        .then(response => response.json())
                        .then(todos => {
                            toDoContainer.innerHTML = '<h2 class="title"><i>Quehaceres</i></h2>';
                            todos.forEach(todo => {
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
                                toDoContainer.appendChild(toDoElement);
                            });
                            toDoButton.textContent = 'Ocultar Quehaceres';
                        })
                        .catch(error => console.error('Error al obtener quehaceres:', error));
                    toDoContainer.style.display = 'block';
                } else {
                    toDoContainer.style.display = 'none';
                    toDoButton.textContent = 'Ver Quehaceres';
                }
            });
        })
        .catch((error) => console.error('Error al obtener el usuario:', error));
}
