const pintarProductos = (data) => {
    const contenedor = document.getElementById("producto-contenedor");


    data.forEach(cubierta => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML += `<div class="card-image">
                          <img src=${cubierta.imagen}>
                          <h2 class="card-title">${cubierta.modelo}</h2>
                        </div>
                        <div class="card-content">
                          <h4>Medidas<h4/>
                          <select id="medida${cubierta.id}">
                          </select>
                        </div>
                        <div class="card-carrito d-flex justify-end">  
                          <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${cubierta.id} class="material-icons agregar">add_shopping_cart</i></a>
                        </div>
                       `
    contenedor.appendChild(div);


      const select = document.getElementById(`medida${cubierta.id}`)
      cubierta.medida.forEach((medida) => {
        option = document.createElement("option")
        option.text = medida.MEDIDA
        select.appendChild(option)
      })

    });
    
    
  };