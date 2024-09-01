import * as pintartarjertas from "../modulos/modulo.js"

fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json())
    .then(data => {

      
      // filtro para los eventos futuros
      let currentDate = new Date(data.currentDate)
      let eventosFuturos = data.events.filter(evento => new Date(evento.date) > currentDate);
      data.events = eventosFuturos;

      pintartarjertas.pintarTarjetasEventos(data);

      
       let categoriasUnicas = [...new Set(data.events.map(evento => evento.category))];

   
       pintartarjertas.createcheckbox(categoriasUnicas);


       let checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]');
       let searchBar = document.querySelector('#search-bar input[type="text"]');
       let contenedor = document.querySelector('#contenedor'); 

    
       checkboxes.forEach(checkbox => {
         checkbox.addEventListener('change', () => pintartarjertas.filterEvents(data, contenedor, checkboxes, searchBar));
       });


       searchBar.addEventListener('input', () => pintartarjertas.filterEvents(data, contenedor, checkboxes, searchBar));

       // Mostrar todos los eventos inicialmente
       pintartarjertas.displayEvents(data.events, contenedor);

    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
    });