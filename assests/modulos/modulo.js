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
                    <a href="./details.html?id=${evento._id}" class="btn btn-primary">Details</a>
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
  
    for (let i = 0; i < filteredEvents.length; i++) {
        let evento = filteredEvents[i];
        let tarjeta = document.createElement("div");
        tarjeta.className = "card";
        tarjeta.innerHTML = `
            <img src="${evento.image}" class="card-img-top" alt="${evento.img}" style="object-fit: cover;"/>
              <div class="card-body">
                  <h5 class="card-title">${evento.name}</h5>
                  <p class="card-text">Description: ${evento.description}</p>
                  <p>Price: $${evento.price}</p>
                  <div class="d-flex justify-content-between align-items-center ">
                      <a href="./details.html?id=${evento._id}" class="btn btn-primary">Details</a>
                  </div>
              </div>`;
        
        contenedor.appendChild(tarjeta);
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
    tarjeta.style.width = "18rem";
    tarjeta.innerHTML = `
        <img
            src="${selectedEvent.image}"
            class="card-img-top"
            alt="${selectedEvent.img}"
        />
        <div class="card-body">
            <h5 class="card-title">${selectedEvent.name}</h5>
            <p class="card-text">${selectedEvent.description}</p>
            <p class="card-text"><strong>Category:</strong> ${selectedEvent.category}</p>
            <p class="card-text"><strong>Place:</strong> ${selectedEvent.place}</p>
            <p class="card-text"><strong>Date:</strong> ${selectedEvent.date}</p>
            <p class="card-text"><strong>Price:</strong> $${selectedEvent.price}</p>
            <!-- Puedes agregar más detalles aquí -->
        </div>`;
    
            
    
                  contenedor.appendChild(tarjeta)
      
    }
}



  