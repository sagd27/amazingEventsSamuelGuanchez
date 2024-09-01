

import * as pintartarjertas from "../modulos/modulo.js"

fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
       
      // Usar el módulo para pintar las tarjetas con los eventos obtenidos
        pintartarjertas.pintarTarjetasEventos(data);

        // Obtener categorías únicas de los eventos
        let categoriasUnicas = [...new Set(data.events.map(evento => evento.category))];

        // Crear los checkboxes de las categorías
        pintartarjertas.createcheckbox(categoriasUnicas);

        // Asumiendo que data, contenedor, checkboxes, y searchBar están definidos en main.js
        let checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]');
        let searchBar = document.querySelector('#search-bar input[type="text"]');
        let contenedor = document.querySelector('#contenedor'); // Define dónde se mostrarán los eventos

        // Agregar evento change a cada checkbox para filtrar cuando se seleccione o deseleccione
        checkboxes.forEach(checkbox => {
          checkbox.addEventListener('change', () => pintartarjertas.filterEvents(data, contenedor, checkboxes, searchBar));
        });

        // Agregar evento input a la barra de búsqueda para filtrar mientras se escribe
        searchBar.addEventListener('input', () => pintartarjertas.filterEvents(data, contenedor, checkboxes, searchBar));

        // Mostrar todos los eventos inicialmente
        pintartarjertas.displayEvents(data.events, contenedor);
    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
    });