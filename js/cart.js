let carrito = []
let cubiertas = []
fetch('/data/stock.json')
.then((resp) => resp.json())
.then(data => {
    cubiertas = data
})

const productoContenedor = document.getElementById('producto-contenedor')


productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoRepetido(e.target.id)
    }
})

const validarProductoRepetido = (cubiertaId) => {
    const cubierta = cubiertas.find(cubierta => cubierta.id == cubiertaId)
    const productoRepetido = carrito.find(cubierta => cubierta.id == cubiertaId)
    
    if (productoRepetido) {
        productoRepetido.cantidad++
        const cantidadProducto =document.getElementById (`cantidad${productoRepetido.id}`)
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`
        actualizarTotalesCarrito(carrito)


    
    } else {
        carrito.push(cubierta)
        cubierta.cantidad = 1
        pintarCarrito(carrito)
        actualizarTotalesCarrito(carrito)
    }
};


const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const totalCompra = carrito.reduce((acc, item) => acc + (item.medida[0].PRECIO * item.cantidad), 0)

    pintarTotalesCarrito(totalCantidad, totalCompra)
    guardarCarritoStorage(carrito)
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito')
    const precioTotal = document.getElementById('precioTotal')

    contadorCarrito.innerText = totalCantidad
    precioTotal.innerText = totalCompra
};

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor')

    contenedor.innerHTML = ''

    carrito.forEach(cubierta => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
            <p>${cubierta.modelo}</p>
            <p>${cubierta.medida[0].MEDIDA}<p/>
            <p>Precio: ${cubierta.medida[0].PRECIO}</p>
            <p id=cantidad${cubierta.id}>Cantidad: ${cubierta.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${cubierta.id}">X</button>
            
        `
        contenedor.appendChild(div)
    });
    contenedor.innerHTML  += `<button type="button" id="btn2" class="btn btn-success">Finalizar compra</button>`
    const btn2 = document.querySelector('#btn2')

    btn2.addEventListener('click', () => {
        if(carrito.length > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Gracias por su compra!',
                text: 'En 5 dias llega su producto!'
              })
              eliminarProductosCarrito()
              modalContenedor.classList.toggle('modal-active')
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'No se completo la operacion!',
                text: 'Debe agregar productos en el carrito!'
              })
              modalContenedor.classList.toggle('modal-active')
        }

    })
};

const eliminarProductosCarrito = (cubiertaId) => {
    const productoIndex = carrito.findIndex(cubierta => cubierta.id == cubiertaId)
    carrito.splice(productoIndex, 1)
    pintarCarrito(carrito)
    actualizarTotalesCarrito(carrito)
};

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
    return carritoStorage
};


const cargarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage()
        pintarCarrito(carrito)
        actualizarTotalesCarrito(carrito)
    }
};

