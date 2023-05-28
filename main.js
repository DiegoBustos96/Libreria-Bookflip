class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;


    }
}

const libroUno = new Producto(1, "Cronicas Marcianas", 10000, "img/Cronicas-marcianas.jpg");
const libroDos = new Producto(2, "Papillon", 8500, "img/Papillon.jpg");
const libroTres = new Producto(3, "Harry Poter 2", 12000, "img/HarryPotter.jpg");
const libroCuatro = new Producto(4, "Señor de la guerra Horus", 7500, "img/Horus.jpg");
const libroCinco = new Producto(5, "Sherlock Holmes", 9000, "img/portada-1.jpg");
const libroSeis = new Producto(6, "Las Aventuras de Sherlock Holmes", 9000, "img/portada-2.jpg");
const libroSiete = new Producto(7, "Misterio en Escarlata", 9000, "img/portada-3.jpg");
const libroOcho = new Producto(8, "La Fundación", 7000, "img/La-fundacion.jpg");
const libroNueve = new Producto(9, "Los Olvidados", 8000, "img/Los-olvidados.jpg");
const libroDiez = new Producto(10, "La Santa", 9000, "img/La-santa.jpg");
const libroOnce = new Producto(11, "El club de la pelea", 5000, "img/clubPelea.jpg");
const libroDoce = new Producto(12, "El Magos", 6500, "img/El magos.jpg");

const libros = [libroUno, libroDos, libroTres, libroCuatro, libroCinco, libroSeis, libroSiete, libroOcho, libroNueve, libroDiez, libroOnce, libroDoce];

let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorCompras = document.getElementById("contenedorLibros");


const mostrarLibros = () => {
    libros.forEach(libro => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "col-md-6", "col-sm-12");
        card.innerHTML = `<div class="card" style="width: 15rem;">
                            <img src="${libro.img}" class="card-img-top" alt="${libro.nombre}">
                            <div class="card-body">
                                <h3 class="card-title">${libro.nombre}</h5>
                                <p class="card-text">$${libro.precio}</p>
                                <button class= "btn colorBoton" id= "boton ${libro.id}">Agregar al Carrito</button>
                            </div>  
                        </div>`
        contenedorCompras.appendChild(card);

        const boton = document.getElementById(`boton ${libro.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(libro.id);
        })



    })
}



mostrarLibros();

const agregarAlCarrito = (id) => {
    const productoCompradoIndex = carrito.findIndex(libro => libro.id === id);
    if (productoCompradoIndex === -1) {
        const producto = libros.find(libro => libro.id === id);
        carrito = [...carrito, producto];

    }

    const updateCarrito = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        calcularTotal();
    }
    updateCarrito();
}



const verCarrito = document.getElementById("verCompra");
const contenedorLibros = document.getElementById("contenedorLibros");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
    window.scrollTo({ top: 0, behavior: "smooth"});
})



const mostrarCarrito = () => {

    while (contenedorLibros.firstChild) {
        contenedorLibros.removeChild(contenedorLibros.firstChild);
    }

    carrito.forEach(libro => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "col-md-6", "col-sm-12");
        card.innerHTML = `
            <div class="card">  
                <img class="card-img-tom imgProductos" src="${libro.img}" alt="${libro.nombre}">
                <div class="card-body">
                    <h3 class="titulo">${libro.nombre}</h3>
                    <p>${libro.precio}</p>
                    <button class="btn colorBoton" id="eliminar ${libro.id}">
                        <i class="far fa-times-circle" alt="Eliminar del Carrito"></i>
                    </button>
                </div>
            </div>`;

        contenedorLibros.appendChild(card);

        const botonEliminar = document.getElementById(`eliminar ${libro.id}`);
        botonEliminar.addEventListener("click", () => eliminarDeCarrito(libro.id));
    });

    calcularTotal();
};




const eliminarDeCarrito = (id) => {
    const index = carrito.findIndex(libro => libro.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        mostrarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

}

const eliminarCompra = document.getElementById("eliminarCompras");
eliminarCompra.addEventListener("click", () => {
    eliminarTodoElCarrito();

})

const eliminarTodoElCarrito = () => {
    carrito = [];
    localStorage.removeItem('carrito');
    calcularTotal();

}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(libro => {
        totalCompra += libro.precio;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}
// Redirigir a la página principal

const verCarritoBtn = document.getElementById("verCompra");
const contenedorBotonPrincipal = document.getElementById("contenedorBotonPrincipal");
const verPrincipalBtn = document.getElementById("verPrincipal");

verCarritoBtn.addEventListener("click", () => {
    mostrarCarrito();
    contenedorBotonPrincipal.style.display = "block";
});

verPrincipalBtn.addEventListener("click", () => {

    window.location.href = "index.html";
});



//cambiar fondo
const boton = document.getElementById("botonFondo");

boton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("modo", "dark");
    } else {
        localStorage.setItem("modo", "light");
    }
})

const modo = localStorage.getItem("modo");

if (modo === "dark") {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}


/*COMENTARIOS */


const comentarios = document.getElementById("comentarios");
const listadoComentarios="json/comentarios.json";
fetch(listadoComentarios)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(comentario => {
            comentarios.innerHTML+=`<form id="formulario">
                                        <h3>Nombre: ${comentario.libro}</h2>
                                        <h4>Usuario: ${comentario.usuario}</h3>
                                            <p>Comentario: ${comentario.comentario}</p>
                                            <p>Calificación: ${comentario.calificacion}</p>
                                            <hr>
                                    </form> 
                                `
        })
    })
    .catch(error => console.log(error))


