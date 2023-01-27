let carrito = []

const productoContenedor = document.getElementById('producto-contenedor')

productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoRepetido(e.target.id)
    }
})

const validarProductoRepetido = (cubiertaId) => {
    const productoRepetido = carrito.find(cubierta => cubierta.id == cubiertaId)

    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage()
    }

    if (!productoRepetido) {
        const cubierta = cubiertas.find(cubierta => cubierta.id == cubiertaId)
        carrito.push(cubierta)
        pintarProductoCarrito(cubierta)
        actualizarTotalesCarrito(carrito)
    } else {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`)
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`
        actualizarTotalesCarrito(carrito)
    }
};

const pintarProductoCarrito = (cubierta) => {
    const contenedor = document.getElementById('carrito-contenedor')
    const div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
        <p>${cubierta.modelo}</p>
        <p>Precio: ${cubierta.precio}</p>
        <p id=cantidad${cubierta.id}>Cantidad: ${cubierta.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${cubierta.id}">X</button>
    `
    contenedor.appendChild(div)
};

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

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
            <p>Precio: ${cubierta.precio}</p>
            <p id=cantidad${cubierta.id}>Cantidad: ${cubierta.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${cubierta.id}">X</button>
        `
        contenedor.appendChild(div)
    });
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

cargarCarrito()