const pintarProductos = (cubiertas) => {
    const contenedor = document.getElementById("producto-contenedor");

    cubiertas.forEach(cubierta => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML += `<div class="card-image">
                          <img src=${cubierta.imagen}>
                          <span class="card-title">${cubierta.modelo}</span>
                        </div>
                        <div class="card-content">
                            <p>${cubierta.medida}</p>
                            <p>$ ${cubierta.precio}</p>
                        </div>
                        <div class="card-carrito d-flex justify-end">  
                        <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${cubierta.id} class="material-icons agregar">add_shopping_cart</i></a>
                        </div>
                       `
      contenedor.appendChild(div);
    });
  };