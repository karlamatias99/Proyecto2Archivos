/*Listo los pedidos, si los hay */
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
            document.getElementById("totalcompra").value = data.totalcompra;
            document.getElementById("FechaGeneracion").value = data.FechaGeneracion;
            document.getElementById("FechaEntrega").value = data.FechaEntrega;
            //Mando a llamar el estado del pedido 
            const opcion = data.Estado;
            // Encontrar el elemento HTML correspondiente
            const radioBtnEstado = document.querySelector(`input[name="estado"][value="${opcion}"]`);

            // Marcar el botón correspondiente
            radioBtnEstado.checked = true;

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
    const totalCompraE = document.getElementById("totalcompra").value;
    const FechaGeneracionE = document.getElementById("FechaGeneracion").value;
    const FechaEntregaE = document.getElementById("FechaEntrega").value;


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
        totalcompra: totalCompraE,
        FechaGeneracion: FechaGeneracionE,
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
                alert("Pedido editado Correctamente")
                location.reload();
            } else {
                console.error('Error al editar el pedido');
                alert("Error al editar el pedido")
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
                alert("Pedido eliminado correctamente")
                location.reload();
            } else {
                console.error('Error al eliminar el pedido');
                alert("Error al eliminar el pedido")
            }
        })
        .catch(error => console.error(error));
}

/*Mostrar Registros de Pedidos*/
function mostrarPedidos(pedidos) {
    let mostraPedidos = document.getElementById('mostrarPedidos')
    mostraPedidos.innerHTML = ''
    pedidos.forEach(element => {
        mostraPedidos.innerHTML +=
            `<div class="contenedorPedidos">
            ${element.Estado === 'En curso'
                ? '<img src="../imagenes/En Curso.png">'
                : '<img src="../imagenes/Procesado.png">'
            }
        <div class="informacion"><p>Codigo:</p><p>${element._id}</p><p class="informacion">
        <span> Usuario: ${element.usuarioPedido}</span></p><p class="informacion">
        <span>Direccion: ${element.direccion}</span></p><p class="informacion">
        <span>Telefono: ${element.telefono}</span></p> <p class="precio">
        <span>Total Compra: Q ${element.totalcompra}</span></p>
        <p class="informacion">
        <span>Fecha de Generacion:${element.FechaGeneracion}</span></p>
        <p class="informacion">
        <span>Fecha de Entrega: ${element.FechaEntrega}</span></p>
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
                throw new Error('La respuesta desde la red no es correcta');
            }
            const listaPedidos = await response.json();
            //console.log(listaProducto);
            mostrarPedidos(listaPedidos);
        } catch (error) {
            console.error('Existe un error con la peticion fetch:', error);
        }
    };
}
