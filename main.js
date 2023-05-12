class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const libroUno = new Producto(1, "Cronicas Marcianas", 10000, "img/Cronicas-marcianas.jpg");
const libroDos = new Producto(2, "Papillon", 8500, "./img/Papillon.jpg");
const libroTres = new Producto(3, "Harry Poter 2", 12000, "img/HarryPotter.jpg");
const libroCuatro = new Producto(4, "Señor de la guerra Horus", 7500, "img/Horus.jpg");
const libroCinco = new Producto(5, "Sherlock Holmes", 9000, "img/portada1.jpg");
const libroSeis = new Producto(6, "Las Aventuras de Sherlock Holmes", 9000, "img/portada2.jpg");
const libroSiete = new Producto(7, "Misterio en Escarlata", 9000, "img/portada3.jpg");
const libroOcho = new Producto(8, "La Fundación, Dan Abnett", 7000, "img/La-fundacion.jpg");
const libroNueve = new Producto(9, "Los Olvidados", 8000, "img/Los-olvidados.jpg");
const libroDiez = new Producto(10, "La Santa", 9000, "img/La-santa.jpg");
const libroOnce = new Producto(11,"El club de la pelea",5000,"img/clubPelea.jpg");
const libroDoce = new Producto(12,"El Magos", 6500,"img/El magos.jpg");

const libros = [libroUno,libroDos, libroTres, libroCuatro, libroCinco, libroSeis, libroSiete, libroOcho, libroNueve, libroDiez,libroOnce, libroDoce];

let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorCompras = document.getElementById("contenedorCompras");

const mostrarLibros = () => {
    libros.forEach(libro => {
        const card = document.createElement("div");
        card.classList.add("col-lx-3", "col-md-6", "col-xs-12");
        card.innerHTML = `<div class="card">
                            <img class="card-img-tom imgProductos" src="${libro.img}" alt="${libro.nombre}">
                            <div class="card-body">
                                <h3>${libro.nombre}</h3>
                                <p>${libro.precio}</p>
                                <button class= "btn colorBoton" id= "boton ${libro.id}>Agregar al Carrito</button>
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