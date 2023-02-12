fetch('/data/stock.json')
        .then((resp) => resp.json())
        .then(data => {
            pintarProductos(data)
        })



