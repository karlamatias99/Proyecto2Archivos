// Variables que traemos de nuestro html
const informacionCompra = document.getElementById('informacionCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const ingresoTarjeta = document.getElementById('RegistroTarjeta');
const pedido = document.getElementById('RegistroPedido');
const contenedor = document.getElementById('contenedor');
const carrito = document.getElementById('carrito');
const numero = document.getElementById("numero");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const x = document.getElementById('x');

const registro = document.getElementById('RegistroTarjeta');
const pedidoFinal = document.getElementById('RegistroPedido');

registro.addEventListener('submit', registrarTarjeta);
pedidoFinal.addEventListener('submit', registrarPedido);

// Variables que vamos a usar en el proyecto
let lista = []
let Valor = 0

function registrarTarjeta(evento) {
    //Evitar que el formulario envie valores por defecto
    evento.preventDefault();

    let numeroTarjeta = document.getElementById('numeroTarjeta').value;
    let nombreUsuario = document.getElementById('nombreUsuario').value;
    let vencimiento = document.getElementById('vencimiento').value;
    let CVV = document.getElementById('CVV').value;


    const data = {
        numeroTarjeta: numeroTarjeta,
        nombreUsuario: nombreUsuario,
        vencimiento: vencimiento,
        CVV: CVV
    }

    fetch('http://localhost:3000/api/ingresarTarjeta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(respuesta => respuesta.json())
        .then(datos => Ingresar(datos))

}

function Ingresar(datos) {
    console.log(datos);

}





// Scroll de nuestra pagina
window.addEventListener("scroll", function () {
    if (contenedor.getBoundingClientRect().top < 10) {
        header.classList.add("scroll")
    }
    else {
        header.classList.remove("scroll")
    }
})

//Visualizar los productos que hemos ingresado 
function mostrarProductos(productos) {
    let mostraProductos = document.getElementById('contenedor')
    contenedor.innerHTML = ''
    productos.forEach(element => {
        mostraProductos.innerHTML +=
            `<div class="contenedorProductos">
              <img src="${element.imagen}">
        <div class="informacion"><p class="precio">
        <span>${element.descripcion}</span></p><p class="precio">
        <span>Precio: Q ${element.precio}</span></p>
         Existencia: ${element.existencia}<p></p>
         <button onclick="comprar('${element.nombre}', '${element.imagen}', '${element.precio}')">Comprar</button>
         </div><div></div><div>`

    });
}


window.addEventListener('load', async () => {

    try {
        const response = await fetch('http://localhost:3000/api/productos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const listaProducto = await response.json();
        //console.log(listaProducto);
        mostrarProductos(listaProducto);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
    contenedorCompra.classList.add("none")
});


//const productos = fetch('http://localhost:3000/api/productos');




//Comprar 
function comprar(nombre, imagen, precio) {
    const productoCompra = { nombre, imagen, precio };
    lista.push(productoCompra)
    numero.innerHTML = lista.length
    numero.classList.add("diseñoNumero")
    return lista

}



function finalizar() {
    fetch('http://localhost:3000/api/add', {
        method: "POST",
        body: JSON.stringify({ productos: lista }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));


}

carrito.addEventListener("click", function () {
    body.style.overflow = "hidden"
    contenedorCompra.classList.remove('none')
    contenedorCompra.classList.add('contenedorCompra')
    informacionCompra.classList.add('informacionCompra')
    mostrarProductosCarrito()
})


x.addEventListener("click", function () {
    body.style.overflow = "auto"
    contenedorCompra.classList.add('none')
    contenedorCompra.classList.remove('contenedorCompra')
    informacionCompra.classList.remove('informacionCompra')
})

function mostrarProductosCarrito() {
    productosCompra.innerHTML = ""
    let valortotal = 0;
    for (let i = 0; i < lista.length; i++) {
        productosCompra.innerHTML += `<div><div class="img">
        
        <button onclick=eliminar(${i}) class="botonTrash"><img src=../imagenes/bote.png></button>
        <p>${lista[i].nombre}</p></div><p> Q${lista[i].precio}</p></div>`
        valortotal += parseInt(lista[i].precio)
    }
    total.innerHTML = `<p>Valor Total</p> <p><span>Q${valortotal}</span></p>`
    Valor = valortotal;
    actualizarValorTotal();
    /* fetch('http://localhost:3000/api/VerCarrito')
         .then(response => response.json())
         .then(data => {
             productosCompra.innerHTML = "";
             valortotal = 0
             if (Array.isArray(data.productoCarro)) {
                 data.productoCarro.forEach(element => {
                     productosCompra.innerHTML += `<div><div class="img">
                     <button class="botonTrash"><img src="/img/trash.png">
                     </button><p>${element.nombre}</p></div><p> $${element.precio}</p></div>`
                     valortotal += parseInt(element.precio)
                 });
             }
             total.innerHTML = `<p>Valor Total</p> <p><span>$${valortotal}</span></p>`
         })
         .catch(error => {
             console.error("Error al obtener los productos del carrito:", error);
         });*/
}

function eliminar(indice) {

    lista.splice(indice, 1)

    numero.innerHTML = lista.length
    if (lista.length == 0) {
        numero.classList.remove("diseñoNumero")
    }
    mostrarProductosCarrito()
}

function eliminarCarrito() {
    lista = [];
    mostrarProductosCarrito()
}

function abrirVentana() {
    var ventana = document.getElementById("ventana");
    ventana.style.display = "block";
}
function cerrarVentana() {
    var ventana = document.getElementById("ventana");
    ventana.style.display = "none";
}


function abrirVentanaPedido() {
    var ventana = document.getElementById("ventanaPedido");
    ventana.style.display = "block";
}

function cerrarVentanaPedido() {
    var ventana = document.getElementById("ventanaPedido");
    ventana.style.display = "none";
}




function Ingresar(datos) {
    console.log(datos);

}



// después de calcular el valor total en la función mostrarProductosCarrito
function actualizarValorTotal() {
    let totalCarrito = document.getElementById("totalcompra");
    totalCarrito.textContent = " Q" + Valor;
}


const fechaActual = new Date();
const fechaActualFormatted = fechaActual.toLocaleDateString('es-ES');
const fechaActualElement = document.getElementById('fecha-actual');
fechaActualElement.textContent = fechaActualFormatted;

const diasASumar = 5;
fechaActual.setDate(fechaActual.getDate() + diasASumar);

const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
const año = fechaActual.getFullYear();

const fechaFinal = `${dia}/${mes}/${año}`;
const fechaEntregaElement = document.getElementById('fechaEntrega');
fechaEntregaElement.textContent = fechaFinal;

function registrarPedido(evento) {

    evento.preventDefault();


    let usuarioPedido = document.getElementById('usuarioPedido').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let totalcompra = Valor;
    let FechaGeneracion = fechaActualFormatted;
    let FechaEntrega = fechaFinal;
    let Tarjeta = document.getElementById('Tarjeta').value;
    let Estado = "En curso";


    const data = {
        usuarioPedido: usuarioPedido,
        direccion: direccion,
        telefono: telefono,
        totalcompra: totalcompra,
        FechaGeneracion: FechaGeneracion,
        FechaEntrega: FechaEntrega,
        Tarjeta: Tarjeta,
        Estado: Estado,
        CVV: CVV
    }

    fetch('http://localhost:3000/api/ingresarPedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(respuesta => respuesta.json())
        .then(datos => Ingresar(datos))

}



function buscarProducto() {
    const input = document.getElementById('busqueda').value;
    const url = `http://localhost:3000/api/buscar?nombreProducto=${input}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se encontró el producto');
        });
}



function Ingresar(datos) {
    console.log(datos);

}
