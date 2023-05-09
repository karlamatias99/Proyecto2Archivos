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
const username = localStorage.getItem('usuario');

// Variables para agregar al carrito, y para el valor de la compra
let lista = []
let Valor = 0

//Funcion para registrar una tarjeta nueva
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
        .then(datos => {
            Ingresar(datos);
            alert('Tarjeta registrada con éxito!');
        })
        .catch(error => alert(error));

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

//Visualizar los productos que puede un usuario comprar 
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


//Traigo los productos desde la base de datos 
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




//Funcion boton comprar, agrego al carrito en un array temporar, y actualizo el desenio del numero del carrito 
function comprar(nombre, imagen, precio) {
    const productoCompra = { nombre, imagen, precio };
    lista.push(productoCompra)
    numero.innerHTML = lista.length
    numero.classList.add("diseñoNumero")
    return lista

}


//Finalizar compra (registrar pedido)
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

//Funcionalidad de los botones dentro de la ventana de carrito 
carrito.addEventListener("click", function () {
    body.style.overflow = "hidden"
    contenedorCompra.classList.remove('none')
    contenedorCompra.classList.add('contenedorCompra')
    informacionCompra.classList.add('informacionCompra')
    mostrarProductosCarrito()
})

//Funcionalidad para cerrar la ventana del carrito 
x.addEventListener("click", function () {
    body.style.overflow = "auto"
    contenedorCompra.classList.add('none')
    contenedorCompra.classList.remove('contenedorCompra')
    informacionCompra.classList.remove('informacionCompra')
})

//Mostrar productos de un pedido, en la ventana de carrito
function mostrarProductosCarrito() {
    productosCompra.innerHTML = ""
    let valortotal = 0;
    for (let i = 0; i < lista.length; i++) {
        productosCompra.innerHTML += `<div><div class="img">
        
        <button onclick=eliminar(${i}) class="botonTrash"><img src=../imagenes/Delete-Button.png></button>
        <p>${lista[i].nombre}</p></div><p> Q${lista[i].precio}</p></div>`
        valortotal += parseInt(lista[i].precio)
    }
    total.innerHTML = `<p>Valor Total</p> <p><span>Q${valortotal}</span></p>`
    Valor = valortotal;
    actualizarValorTotal();

}

//Funcion para eliminar producto del carrito, actulizo el numero del carrito
function eliminar(indice) {

    //Modifico el contenido del arreglo
    lista.splice(indice, 1)

    //Modifico la vista del numero del carrito
    numero.innerHTML = lista.length
    if (lista.length == 0) {
        numero.classList.remove("diseñoNumero")
    }
    mostrarProductosCarrito()
}

//funcion para eliminar todos los productos del carrito 
function eliminarCarrito() {
    lista = [];
    numero.classList.remove("diseñoNumero")
    mostrarProductosCarrito()
}

//Ventana para ingreso de una nueva tarjeta 
function abrirVentana() {
    var ventana = document.getElementById("ventana");
    ventana.style.display = "block";
}
function cerrarVentana() {
    var ventana = document.getElementById("ventana");
    ventana.style.display = "none";
}

//Ventana para finalizar la compra y registrar pedido 
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


//Tomo la fecha actual desde mi sistema, para que sea la fecha de generacion del pedido
const fechaActual = new Date();
const fechaActualFormatted = fechaActual.toLocaleDateString('en-EN');
const fechaActualElement = document.getElementById('fecha-actual');
fechaActualElement.textContent = fechaActualFormatted;

//Sumo 5 dias a mi fecha actual, esta sera mi fecha de entrega del producto 
const diasASumar = 5;
fechaActual.setDate(fechaActual.getDate() + diasASumar);

const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
const año = fechaActual.getFullYear();

//Agrego fecha de entrega
const fechaFinal = `${año}/${mes}/${dia}`;
const fechaEntregaElement = document.getElementById('fechaEntrega');
fechaEntregaElement.textContent = fechaFinal;

//Funcion para registrar en nuestra base de datos el pedido 
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
        perfilUsuario: username
    }

    fetch('http://localhost:3000/api/ingresarPedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            Ingresar(datos);
            alert('Compra realizada con éxito!');
            cerrarVentanaPedido();
            eliminarCarrito();

        })
        .catch(error => alert(error));

}


//Funcion para buscar algun producto 
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
