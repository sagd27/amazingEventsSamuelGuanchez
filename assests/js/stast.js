fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {


    
        
        let mayorCapacidad = 0;
        let eventoMayorCapacidad = {};

        
        for (const evento of data.events) {
         
            if (Number(evento.capacity) > mayorCapacidad) {
                mayorCapacidad = Number(evento.capacity);
                eventoMayorCapacidad = evento;
        }


        }
       



        // filtro para los eventos pasados
        let currentDate = new Date(data.currentDate)
        let eventosPasados = data.events.filter(evento => new Date(evento.date) < currentDate);
        data.events = eventosPasados;
    
        let eventoMayorAsistencia = {};
        let eventoMenorAsistencia = {};
       
        let   mayorPorcentaje = 0;
        let  menorPorcentaje = Number(eventosPasados[0].assistance);
        
     
        

        for (let i = 0; i < eventosPasados.length; i++) {
            let asistencia = Number(eventosPasados[i].assistance);
            let capacidad = Number(eventosPasados[i].capacity);

            
            
            let porcentajeAsistencia =  (asistencia * 100) / capacidad;
         

         
         if (porcentajeAsistencia > mayorPorcentaje ) {
                mayorPorcentaje =porcentajeAsistencia;
                eventoMayorAsistencia = eventosPasados[i]
                
            }
        
        if(porcentajeAsistencia < menorPorcentaje ) {
                menorPorcentaje = porcentajeAsistencia;

                eventoMenorAsistencia = eventosPasados[i]
                
            }
           
        }
        

      
        document.querySelector("table tbody tr:nth-child(3) td:nth-child(1)").textContent = eventoMayorAsistencia.name ? `${eventoMayorAsistencia.name} - ${mayorPorcentaje.toFixed(2)}% `: 'N/A';
        document.querySelector("table tbody tr:nth-child(3) td:nth-child(2)").textContent = eventoMenorAsistencia.name ? `${eventoMenorAsistencia.name} - ${menorPorcentaje.toFixed(2)}% `: 'N/A';
        document.querySelector("table tbody tr:nth-child(3) td:nth-child(3)").textContent = eventoMayorCapacidad.name ? `${eventoMayorCapacidad.name} - ${eventoMayorCapacidad.capacity}` : 'N/A';


       
        // Agrupar eventos por categoría y calcular Revenues y Percentage of attendance
        let categoriasUnicas = [...new Set(eventosPasados.map(evento => evento.category))];
        let resultadosPorCategoria = {};

        categoriasUnicas.forEach(categoria => {
            resultadosPorCategoria[categoria] = {
                totalRevenues: 0,
                totalCapacity: 0,
                totalAssistance: 0,
                eventsCount: 0
            };
            eventosPasados.forEach(evento => {
                if (evento.category === categoria) {
                    let revenue = Number(evento.price) * Number(evento.assistance);
                    resultadosPorCategoria[categoria].totalRevenues += revenue;
                    resultadosPorCategoria[categoria].totalCapacity += Number(evento.capacity);
                    resultadosPorCategoria[categoria].totalAssistance += Number(evento.assistance);
                    resultadosPorCategoria[categoria].eventsCount += 1;
                }
            });
        });

        // Mostrar los resultados en la tabla
        categoriasUnicas.forEach((categoria, index) => {
            let resultados = resultadosPorCategoria[categoria];
            let porcentajeAsistencia = (resultados.totalAssistance * 100) / resultados.totalCapacity;

            document.querySelector(`table tbody tr:nth-child(${index + 14}) td:nth-child(1)`).textContent = categoria;
            document.querySelector(`table tbody tr:nth-child(${index + 14}) td:nth-child(2)`).textContent = `$${resultados.totalRevenues.toFixed(2)}`;
            document.querySelector(`table tbody tr:nth-child(${index + 14}) td:nth-child(3)`).textContent = `${porcentajeAsistencia.toFixed(2)}%`;
        });



    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
    });
    


    

    fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {

        
          // filtro para los eventos futuros
          let currentDate = new Date(data.currentDate)
          let eventosFuturos = data.events.filter(evento => new Date(evento.date) > currentDate);
          data.events = eventosFuturos;

          
   // Agrupar eventos por categoría y calcular Revenues y Percentage of attendance
        let categoriasUnicas = [...new Set(eventosFuturos.map(evento => evento.category))];
        let resultadosPorCategoria = {};

    
        

        categoriasUnicas.forEach(categoria => {
            resultadosPorCategoria[categoria] = {
                totalRevenues: 0,
                totalCapacity: 0,
                totalEstimate: 0,
                eventsCount: 0
            };
         

            eventosFuturos.forEach(evento => {
                if (evento.category === categoria) {
                    let revenue = Number(evento.price) * Number(evento.estimate);
                    resultadosPorCategoria[categoria].totalRevenues += revenue;
                    resultadosPorCategoria[categoria].totalCapacity += Number(evento.capacity);
                    resultadosPorCategoria[categoria].totalEstimate += Number(evento.estimate);
                    resultadosPorCategoria[categoria].eventsCount += 1;
                }
            });
        });

        // Mostrar los resultados en la tabla
        categoriasUnicas.forEach((categoria, index) => {
            let resultados = resultadosPorCategoria[categoria];
            let porcentajeAsistencia = (resultados.totalEstimate * 100) / resultados.totalCapacity;

            document.querySelector(`table tbody tr:nth-child(${index + 6}) td:nth-child(1)`).textContent = categoria;
            document.querySelector(`table tbody tr:nth-child(${index + 6}) td:nth-child(2)`).textContent = `${resultados.totalRevenues.toFixed(2)}`;
            document.querySelector(`table tbody tr:nth-child(${index + 6}) td:nth-child(3)`).textContent = `${porcentajeAsistencia.toFixed(2)}%`;
        });



    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
    });