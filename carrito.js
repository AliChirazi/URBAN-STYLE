const contenedor = document.querySelector(".contenedor-carrito")
console.log("Contenedor encontrado:", contenedor);
let carritoGuardado = localStorage.getItem("carrito")
const totalCarrito= document.getElementById("total-carrito")


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
        let div1 = document.createElement("div")
        div1.innerHTML= `<p class="titulo-carrito-vacio">su carrito esta vacio </p>`
        contenedor.appendChild(div1)
    }
    productosCarrito.forEach( element => { 
        let div = document.createElement("div")
        div.classList.add("item-carrito")
        let precio = element.precio * element.cantidad
        div.innerHTML = `
            <img src="${element.imagen}" alt="${element.titulo}" class="imagen-producto-carrito">
            <div class="info-carrito">
                <p class="titulo-producto-carrito">${element.titulo}</p>

                <p class="cantidad-producto-carrito">${element.cantidad}</p>
                <p class = "precio-producto-carrito">$${precio}</p>
                <button class= "btn-eliminar" data-id=${element.id}><i class="bi bi-trash"></i> </button>   
            </div>
        `
        contenedor.appendChild(div)
        botonesEliminar()
        

        
    })
    calcularTotal()

}
renderizarCarrito()

function botonesEliminar(){
const botonesEliminar = document.querySelectorAll(".btn-eliminar")
botonesEliminar.forEach(botonEliminar => {
    botonEliminar.addEventListener("click", (e)=>{
        let prodId = e.currentTarget.dataset.id
        eliminarProducto(prodId)
        aumentarContador()
        renderizarCarrito()
        guardar()

    })
    
});}

function eliminarProducto(prodId){
    productosCarrito = productosCarrito.filter(p=>p.id!==prodId)
    console.log("producto eliminado")
    console.log(productosCarrito.length)
    console.log(totalCarrito)
}

function calcularTotal(){ 
    const precios = document.querySelectorAll(".precio-producto-carrito")
    let total = 0
    precios.forEach(precio => {
        // saco el "$" y lo convierto a número
        total += Number(precio.innerText.replace("$",""))
    })
    totalCarrito.innerHTML= `Total: $${total}`
}