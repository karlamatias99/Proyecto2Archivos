/*Listo los productos que estan ingresados, si los hay */



const usernameListItem = document.getElementById('username-list-item');

// Obtener el usuario almacenado en el localStorage
const username = localStorage.getItem('usuario');

// Asignar el usuario al elemento li
usernameListItem.innerHTML = `<a href="#">${username}</a>`;
console.log(username);
ver();


/*Agregar Producto para venta*/
document.getElementById("botonAñadir").addEventListener("click", function (evento) {
    //Evitar que el formulario envie valores por defecto
    evento.preventDefault();

    let nombre = document.getElementById('productoAñadir').value;
    let descripcion = document.getElementById('descripcionAñadir').value;
    let precio = document.getElementById('PrecioAñadir').value;
    let existencia = document.getElementById('existenciaAñadir').value;
    let imagen = document.getElementById('ImagenAñadir').value;

    var botonesDeRadio = document.getElementsByName("categoria");

    //Obtengo el valor que el usuario seleccionara
    var valorSeleccionado;
    for (var i = 0; i < botonesDeRadio.length; i++) {
        if (botonesDeRadio[i].checked) {
            valorSeleccionado = botonesDeRadio[i].value;
            break;
        }
    }

    const data = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        existencia: existencia,
        imagen: imagen,
        categoria: valorSeleccionado,
        nombreUsuario: username

    }
    fetch('http://localhost:3000/api/ingresar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(respuesta => {
            respuesta.json()
            if (respuesta.ok) {
                console.log('Producto insertado correctamente');
                location.reload();
            } else {
                console.error('Error al insertar producto');
            }
        })
        .then(datos => {
            Ingresar(datos);
            ver();
        })

})
function Ingresar(datos) {
    console.log(datos);

}


/*Seleccionar un producto para editar */
function obtenerProducto(idProducto) {
    fetch(`http://localhost:3000/api/producto/${idProducto}`)
        .then((response) => response.json())
        .then((data) => {
            // Rellenar el formulario con los detalles del producto
            document.getElementById("id-producto").value = data._id;
            document.getElementById("nombreEditar").value = data.nombre;
            document.getElementById("descripcionEditar").value = data.descripcion;
            document.getElementById("precioEditar").value = data.precio;
            document.getElementById("existenciaEditar").value = data.existencia;
            document.getElementById("imagenEditar").value = data.imagen;
        })
        .catch((error) => console.log(error));
}

document.getElementById("botonEditar").addEventListener("click", function (evento) {
    //Evitar que el formulario envie valores por defecto
    evento.preventDefault();
    // Obtener los datos del formulario
    const idProducto = document.getElementById("id-producto").value;
    const nombreE = document.getElementById("nombreEditar").value;
    const descripcionE = document.getElementById("descripcionEditar").value;
    const precioE = document.getElementById("precioEditar").value;
    const existenciaE = document.getElementById("existenciaEditar").value;
    const imagenE = document.getElementById("imagenEditar").value;

    var botonesDeRadio = document.getElementsByName("categoria");

    //Obtengo el valor que el usuario seleccionara
    var valorSeleccionado;
    for (var i = 0; i < botonesDeRadio.length; i++) {
        if (botonesDeRadio[i].checked) {
            valorSeleccionado = botonesDeRadio[i].value;
            break;
        }
    }
    const data = {
        nombre: nombreE,
        descripcion: descripcionE,
        precio: precioE,
        existencia: existenciaE,
        imagen: imagenE,
        categoria: valorSeleccionado,
        nombreUsuario: username

    }

    // Hacer la solicitud al backend para actualizar el producto
    fetch(`http://localhost:3000/api/editarProd/${idProducto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then(respuesta => {
            respuesta.json()
            if (respuesta.ok) {
                console.log('Producto editado correctamente');
                location.reload();
            } else {
                console.error('Error al editar el producto');
            }
        })
        .then(datos => {
            Editar(datos);
        })
})

function Editar(datos) {
    console.log(datos);

}

/*Eliminar algun producto */
function eliminarProducto(idProducto) {
    fetch(`http://localhost:3000/api/eliminarProd/${idProducto}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Producto eliminado correctamente');
                location.reload();
            } else {
                console.error('Error al eliminar el producto');
            }
        })
        .catch(error => console.error(error));
}

/*Mostrar Registros de Productos*/
function mostrarProductos(productos) {
    let mostraProductos = document.getElementById('mostrarProductos')
    const productoEd = document.getElementById('productoEditar')
    const productoEl = document.getElementById('productoEliminar')
    mostraProductos.innerHTML = ''
    productos.forEach(element => {
        mostraProductos.innerHTML +=
            `<div class="contenedorProductos">
              <img src="${element.imagen}">
            <br>
            <br>
        <div class="informacion"><p>${element.nombre}</p><p class="precio">
        <span>${element.descripcion}</span></p><p class="precio">
        <span>Precio: Q ${element.precio}</span></p>
         Existencia: ${element.existencia}<p>${element.categoria}</p></div><div>
        <button onclick="obtenerProducto('${element._id}')"><i class="fas fa-edit"></i></button>
         <button onclick="eliminarProducto('${element._id}')">Eliminar</button></div></div>`

    });
}

/*Funcion para ver los productos en la pagina */
function ver() {
    window.onload = async () => {

        try {
            const response = await fetch(`http://localhost:3000/api/ver?nombreUsuario=${username}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const listaProducto = await response.json();
            //console.log(listaProducto);
            mostrarProductos(listaProducto);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
}
