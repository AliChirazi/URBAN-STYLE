const contenedor = document.querySelector(".contenedor-carrito")
console.log("Contenedor encontrado:", contenedor);
let carritoGuardado = localStorage.getItem("carrito")

let productosCarrito = carritoGuardado ? JSON.parse(carritoGuardado) : []

function AgregarProducto(id){
   let productoEncontrado = productosCarrito.find(p=> p.id ==id)
   if(productoEncontrado){
    productoEncontrado.cantidad ++
    guardar()
   }else {
    let prod = productos.find(p=> p.id==id)
    productosCarrito.push({...prod, cantidad: 1})
    guardar()
   }

} 

function guardar(){
    localStorage.setItem("carrito", JSON.stringify(productosCarrito))
}

function renderizarCarrito(){
    contenedor.innerHTML = "";
    if(productosCarrito.length==0){
        let div1 = document.createElement("div1")
        div1.innerHTML= `<p class="titulo-carrito-vacio">su carrito esta vacio </p>`
        contenedor.appendChild(div1)
    }
    productosCarrito.forEach( element => { 
        let div = document.createElement("div")
        div.classList.add("item-carrito")
        let precio = element.precio * element.cantidad
        div.innerHTML = `
            <img src="${element.imagen}" alt="${element.titulo}" class="imagen-producto-carrito">
            <p class="titulo-producto-carrito">${element.titulo}</p>
            <p class="cantidad-producto-carrito">${element.cantidad}</p>
            <p class = "precio-producto-carrito">$${precio}</p>

        `
        contenedor.appendChild(div)

        
    });

}
renderizarCarrito()