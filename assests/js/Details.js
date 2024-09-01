import * as pintartarjertas from "../modulos/modulo.js"

 // Obtener el parámetro de consulta 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

 

fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {


      
// Buscar el evento seleccionado por ID
 const selectedEvent = data.events.find(evento => evento._id === Number(eventId));
 const eventsArray = [];
 eventsArray.push(selectedEvent);



    // Mostrar la tarjeta del evento seleccionado
if (selectedEvent) {
data.events = eventsArray;

pintartarjertas.cardDetails(data)

}else {
    // Mostrar un mensaje si no hay evento seleccionado


    document.getElementById("contenedor").innerHTML = "<p>No hay detalles para mostrar.</p>";
}


    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
    });