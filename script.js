const contenedorProductos = document.querySelector(".contenedor-productos")

function cargarProductos(listaProductos){
    contenedorProductos.innerHTML =""
    listaProductos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML=`
        <img src="${producto.imagen}" alt="${producto.titulo}" class="imagenProducto">
        <div class="detalle-producto">
            <p class="titulo-producto">${producto.titulo}</p1>
            <p class="precio">$${producto.precio}</p>
            <button class="AgregarProducto" data-id="${producto.id}">Agregar</button>
        </div>
        
        `
        contenedorProductos.appendChild(div)
        
        
    });


}

cargarProductos(productos)