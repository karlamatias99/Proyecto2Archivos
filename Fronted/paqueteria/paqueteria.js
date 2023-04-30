/*Listo los productos que estan ingresados, si los hay */
ver();


/*Seleccionar un pedido para editar */
function obtenerPedido(idPedido) {
    fetch(`http://localhost:3000/api/pedido/${idPedido}`)
        .then((response) => response.json())
        .then((data) => {
            // Rellenar el formulario con los detalles del producto
            document.getElementById("idPedido").value = data._id;
            document.getElementById("nombreUsuario").value = data.usuarioPedido;
            document.getElementById("direccion").value = data.direccion;
            document.getElementById("telefono").value = data.telefono;
            document.getElementById("totalCompra").value = data.totalCompra;
            document.getElementById("fecha").value = data.FechaEntrega;

        })
        .catch((error) => console.log(error));
}

document.getElementById("botonEditar").addEventListener("click", function (evento) {
    //Evitar que el formulario envie valores por defecto
    evento.preventDefault();
    // Obtener los datos del formulario
    const idPedido = document.getElementById("idPedido").value;
    const nombreE = document.getElementById("nombreUsuario").value;
    const direccionE = document.getElementById("direccion").value;
    const telefonoE = document.getElementById("telefono").value;
    const totalCompraE = document.getElementById("totalCompra").value;
    const FechaEntregaE = document.getElementById("fecha").value;

    var botonesDeRadio = document.getElementsByName("estado");

    //Obtengo el valor que el usuario seleccionara
    var valorSeleccionado;
    for (var i = 0; i < botonesDeRadio.length; i++) {
        if (botonesDeRadio[i].checked) {
            valorSeleccionado = botonesDeRadio[i].value;
            break;
        }
    }

    const data = {
        _id: idPedido,
        nusuarioPedido: nombreE,
        direccion: direccionE,
        telefono: telefonoE,
        totalCompra: totalCompraE,
        FechaEntrega: FechaEntregaE,
        Estado: valorSeleccionado

    }

    // Hacer la solicitud al backend para actualizar el producto
    fetch(`http://localhost:3000/api/editarPedido/${idPedido}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then(respuesta => {
            respuesta.json()
            if (respuesta.ok) {
                console.log('Pedido editado correctamente');
                location.reload();
            } else {
                console.error('Error al editar el pedido');
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
function eliminarPedido(idPedido) {
    fetch(`http://localhost:3000/api/eliminarPedido/${idPedido}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Pedido eliminado correctamente');
                location.reload();
            } else {
                console.error('Error al eliminar el pedido');
            }
        })
        .catch(error => console.error(error));
}

/*Mostrar Registros de Productos*/
function mostrarProductos(pedidos) {
    let mostraPedidos = document.getElementById('mostrarPedidos')
    const pedidoEd = document.getElementById('productoEditar')
    const pedidoEl = document.getElementById('productoEliminar')
    mostraPedidos.innerHTML = ''
    pedidos.forEach(element => {
        mostraPedidos.innerHTML +=
            `<div class="contenedorPedidos">
              <img src="../imagenes/Pedido.png">
            
        <div class="informacion"><p>Codigo: ${element._id}</p><p class="informacion">
        <span> Usuario: ${element.usuarioPedido}</span></p><p class="informacion">
        <span>Direccion: ${element.direccion}</span></p><p class="informacion">
        <span>Telefono: ${element.telefono}</span></p> <p class="precio">
        <span>Total Compra: Q ${element.totalCompra}</span></p>
        <p class="informacion">
        <span>${element.FechaEntrega}</span></p>
        <p class="informacion">
        <span>${element.Estado}</span></p></div><div>
        
        <button onclick="obtenerPedido('${element._id}')"><i class="fas fa-edit"></i></button>
         <button onclick="eliminarPedido('${element._id}')">Eliminar</button></div></div>`

    });
}

/*Funcion para ver los productos en la pagina */
function ver() {
    window.onload = async () => {

        try {
            const response = await fetch('http://localhost:3000/api/pedidos');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const listaPedidos = await response.json();
            //console.log(listaProducto);
            mostrarProductos(listaPedidos);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
}
