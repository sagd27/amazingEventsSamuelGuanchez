export function pintarTarjetasEventos(data){
    let contenedor = document.getElementById("contenedor");

for (let i = 0; i < data.events.length; i++) {
 let evento =  data.events[i];
 let tarjeta = document.createElement("div");
  tarjeta.className = "card ";
  tarjeta.innerHTML= `
            <img src="${evento.image}" class="card-img-top" alt="${evento.img}" style="object-fit: cover;"/>
            <div class="card-body">
                <h5 class="card-title">${evento.name}</h5>
                <p class="card-text">Description: ${evento.description}</p>
                <p>Price: $${evento.price}</p>
                <div class="d-flex justify-content-between align-items-center ">
                    <a href="./details.html?id=${evento._id}" class="btn btn-detail fw-semibold">Details</a>
                </div>
            </div>`

        

              contenedor.appendChild(tarjeta)
  
}
}


export function createcheckbox(categoriasUnicas){

    let checkboxContainer = document.getElementById("checkboxContainer");
   


    for (let i = 0; i < categoriasUnicas.length; i++) {
    let categoria = categoriasUnicas[i];

 
    let checkboxDiv = document.createElement("div");
    checkboxDiv.className = "form-check"; 


    checkboxDiv.innerHTML = `
        <input
            type="checkbox"
            class="form-check-input chk"
            id="${categoria}"
            name="${categoria}"
            value="${categoria}"
        />
        <label class="form-check-label" for="${categoria}">
            ${categoria}
        </label>
    `;


    checkboxContainer.appendChild(checkboxDiv);
}
}


export function displayEvents(filteredEvents, contenedor) {
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar los eventos filtrados
    let evento = filteredEvents;
    for (let i = 0; i < filteredEvents.length; i++) {
        evento = filteredEvents[i];
        let tarjeta = document.createElement("div");
        tarjeta.className = "card";
        tarjeta.innerHTML = `
            <img src="${evento.image}" class="card-img-top" alt="${evento.img}" style="object-fit: cover;"/>
              <div class="card-body">
                  <h5 class="card-title">${evento.name}</h5>
                  <p class="card-text">Description: ${evento.description}</p>
                  <p>Price: $${evento.price}</p>
                  <div class="d-flex justify-content-between align-items-center ">
                      <a href="./details.html?id=${evento._id}" class="btn btn-detail fw-semibold">Details</a>
                  </div>
              </div>`;
        
        contenedor.appendChild(tarjeta);
       
    }
    if (evento.length === 0) {
        contenedor.innerHTML = '<p>No hay eventos que coincidan con los criterios de búsqueda.</p>';
        
    }

  }
  
  export function filterEvents(data, contenedor, checkboxes, searchBar) {
    let selectedCategories = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    let searchTerm = searchBar.value.toLowerCase();
    
    let filteredEvents = data.events.filter(evento => {
        let matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(evento.category);
        let matchesSearch = evento.name.toLowerCase().includes(searchTerm) || evento.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
  
    displayEvents(filteredEvents, contenedor);
  }

  export function cardDetails (data){
    let contenedor = document.getElementById("contenedor");
    for (let i = 0; i < data.events.length; i++) {
     let selectedEvent =  data.events[i];
     let tarjeta = document.createElement("div");
    tarjeta.className = "card";
    tarjeta.className = "card-details";
    tarjeta.innerHTML = `
         
 
        <div class="row g-0 gap-3 ">
            <div class="col-md-6">
                <img
                    src="${selectedEvent.image}"
                    alt="${selectedEvent.name}"
                    class="img-fluid"
                    style="height: 100%;  width: 100%; object-fit: cover;"
                />
            </div>
            <div class="col-md-3 d-flex align-items-center ">
                <div class="card-body ">
                    <h5 class="card-title fs-3 mb-3">${selectedEvent.name}</h5>
                    <p><strong>Name:</strong> ${selectedEvent.name}</p>
                    <p><strong>Category:</strong> ${selectedEvent.category}</p>
                    <p><strong>Date:</strong> ${selectedEvent.date}</p>
                    <p><strong>Description:</strong> ${selectedEvent.description}</p>
                    <p><strong>Place:</strong> ${selectedEvent.place}</p>
                    <p><strong>Price:</strong> $${selectedEvent.price}</p>
                    <p><strong>Capacity:</strong> ${selectedEvent.capacity}</p>
                    <p><strong>Assistance:</strong> ${selectedEvent.assistance ? selectedEvent.assistance  :  selectedEvent.estimate ? `Estimado de Asistecia ${selectedEvent.estimate}`: `si informaciòn` }</p>


                </div>
            </div>
        </div>
 

        
        
        `;
    
            
    
                  contenedor.appendChild(tarjeta)
      
    }
}



  