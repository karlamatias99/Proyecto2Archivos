
const usernameListItem = document.getElementById('username-list-item');

// Obtener el usuario almacenado en el localStorage
const username = localStorage.getItem('usuario');

// Asignar el usuario al elemento li
usernameListItem.innerHTML = `<a href="#">${username}</a>`;
console.log(username);
ver();



/*Mostrar los pedidos del usuario, segun el usuario logeado*/
function mostrarPedidoUsuario(pedidos) {
    let mostraPedidos = document.getElementById('mostrarPedidos')
    mostraPedidos.innerHTML = ''
    pedidos.forEach(element => {
        mostraPedidos.innerHTML +=
            `<div class="contenedorPedidos">
            <img src="../imagenes/carritoEntrega.png">
          
      <div class="informacion"><p>Codigo: </p><p>${element._id}</p><p class="informacion">
      <span> Usuario: ${element.usuarioPedido}</span></p><p class="informacion">
      <span>Direccion: ${element.direccion}</span></p><p class="informacion">
      <span>Telefono: ${element.telefono}</span></p> <p class="precio">
      <span>Total Compra: Q ${element.totalcompra}</span></p>
      <p class="informacion">
      Tarjeta: ${formatNumber(element.Tarjeta)}</p>
      <p class="informacion">
      Fecha de Entrega: ${element.FechaEntrega}</p>
      <p class="informacion">
      <span>${element.Estado}</span></p></div><div></div></div>`

    });
}

//funcion para mostrar unicamente los ultimos 4 digitos de la tarjeta del usuario
function formatNumber(cardNumber) {
    const lastFourDigits = cardNumber.slice(-4);
    const maskedNumber = lastFourDigits.padStart(cardNumber.length, '*');
    return maskedNumber;
}



/*Funcion para ver los pedidos el usuario en la pagina */
function ver() {
    window.onload = async () => {

        try {
            const response = await fetch(`http://localhost:3000/api/pedidosUsuario?perfilUsuario=${username}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const listaPedidos = await response.json();
            //console.log(listaProducto);
            mostrarPedidoUsuario(listaPedidos);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
}
