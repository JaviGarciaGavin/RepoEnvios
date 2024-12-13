// Cositas del Html
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messages');
 
// Función para obtener los mensajes del localStorage
function getMessages() {
  const storedMessages = localStorage.getItem('messages');
  return storedMessages ? JSON.parse(storedMessages) : [];
}
 
//Mostrar los mensajes
function displayMessages() {
  const messages = getMessages();
  messagesContainer.innerHTML = ''; 
  //Por cada mensaje en el array que sacas del local storage lo metes en un div y lo pongo clase y tal para el css luego pero tampoco haria mucha falta
  messages.forEach(msg => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = 
    `
      <p>${msg.text}</p>
      <p class="timestamp">${msg.timestamp}</p>
    `;
    messagesContainer.appendChild(messageElement);
  });
}
 
//Pongo demasiados comentarios para aclararme conmigo mismo 
function sendMessage() {
//Pillo el texto del input del formulario y lo  meto en una variable
  const messageText = messageInput.value.trim();
  if (messageText === '') return;//Si es nulo nada

  const timestamp = new Date().toLocaleString(); // Fecha y hora actual
  
  //Le doy atributos al mensaje que sean el texto y el la hora para que se almacenen con eso en el storage
  const newMessage = { text: messageText, 
                       timestamp: timestamp };
  // Obtener los mensajes actuales y agregar el nuevo

  const messages = getMessages();
  //Metes en el array de mensajes el nuevo
  messages.push(newMessage);
 
  // Guardar los mensajes actualizados en localStorage
  localStorage.setItem('messages', JSON.stringify(messages));
 
  // Te resetea el input cuando se acaba la funcion y te recarga los mensajes
  messageInput.value = '';
  displayMessages();
}
 
// le asigno funcionalidad al boton
sendButton.addEventListener('click', sendMessage);
 
//Te saca todo el local storage cuando inicias
displayMessages();