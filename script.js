const contenedorProductos = document.querySelector(".contenedor-productos");
const botonesCategoria = document.querySelectorAll(".botonCategoria");
const botonHamburguesa = document.querySelector(".toggle-btn")
const sidebar = document.querySelector(".sidebar")
const h1 = document.querySelector(".titulo-principal")

const carritoContador = document.querySelector(".carrito-contador");

let contadorGuardado = localStorage.getItem("carritoContador");
if (contadorGuardado) {
  carritoContador.innerText = JSON.parse(contadorGuardado);
}


const carritoSidebar = document.querySelector(".carrito-sidebar");
const cerrarCarritoBtn = document.querySelector(".cerrar-carrito");
const carritoIcono = document.querySelector(".carrito-icono")



function cargarProductos(listaProductos) {
  contenedorProductos.innerHTML = "";
  listaProductos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.titulo}" class="imagenProducto">
      <div class="detalle-producto">
          <p class="titulo-producto">${producto.titulo}</p>
          <p class="precio">$${producto.precio}</p>
          <button class="AgregarProducto" data-id="${producto.id}">Agregar</button>
      </div>
    `;
    contenedorProductos.appendChild(div);
  });
}

// Mostrar todo al inicio
cargarProductos(productos);
botonAgregar()

// Filtro de categorías
botonesCategoria.forEach(botonCategoria => {
  botonCategoria.addEventListener("click", () => {
    const categoria = botonCategoria.innerText.trim().toLowerCase();

    if (categoria === "todos los productos") {
     h1.classList.remove("oculto")
      cargarProductos(productos);
      botonAgregar()
    } else {
      const filtrados = productos.filter(p => 
        p.categoria.trim().toLowerCase() === categoria
      );
      h1.classList.add("oculto")
      cargarProductos(filtrados);
      botonAgregar()
    }
  });
});

function aumentarContador(){
 carritoContador.innerText = productosCarrito.reduce((acc, p) => acc + p.cantidad, 0);
 localStorage.setItem("carritoContador",JSON.stringify(carritoContador.innerText) )
}

  

botonHamburguesa.addEventListener("click", ()=>{
    sidebar.classList.toggle("hidden") 
  

})

carritoIcono.addEventListener("click", ()=>{
    carritoSidebar.classList.toggle("show")
     renderizarCarrito()      
})

function botonAgregar(){ 
  const botonesAgregar = document.querySelectorAll(".AgregarProducto")
  botonesAgregar.forEach(botonAgregar => {
  botonAgregar.addEventListener("click", (e)=>{
    let productoId =   e.currentTarget.dataset.id
    AgregarProducto(productoId)
    aumentarContador()    
    renderizarCarrito()
  })
  
}) }


cerrarCarritoBtn.addEventListener("click", ()=>{
  carritoSidebar.classList.remove("show")
})



