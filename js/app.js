//variables
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');
let tweets = [];

//event listener
eventListener();

function eventListener(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets)

        crearHtml();
    })
}

//funciones

function agregarTweet(e) {
    e.preventDefault();
    
    //textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if(tweet === '') {
        mostrarError('un mensaje no puede ir vacio');

        return // evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet //esto es igual a tweet: tweet, forma mas simple
    }

   //añadir al arreglo de tweets
   tweets = [...tweets, tweetObj];

    //crear HTML una vez agregado
    crearHtml() 

    //reiniciar el formulario
    formulario.reset();
}

//mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove()
    }, 3000)
}


//muestr un listado de los tweets
function crearHtml() {

    limpiarHtml();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            //agrtegar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //funcion para eliminar de la lista
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            //crear el HTML
            const li = document.createElement('li');

            //añadir el texto
            li.innerText = tweet.tweet;

            //asignar el boton X
            li.appendChild(btnEliminar);

            //agregar en el HTML
            lista.appendChild(li);
        });
    }

    sincronizarStorage();
}

//agrega los teet al localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHtml();
}

//limpiar html
function limpiarHtml () {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}