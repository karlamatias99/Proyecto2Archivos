ver();

document.getElementById("botonAñadir").addEventListener("click", function (evento) {
    //Evitar que el formulario envie valores por defecto
    evento.preventDefault();

    let nombre = document.getElementById('nombreAñadir').value;
    let apellido = document.getElementById('apellidoAñadir').value;
    let correo = document.getElementById('emailAñadir').value;
    let password = document.getElementById('passwordAñadir').value;
    var botonesDeRadio = document.getElementsByName("rol");

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
        apellido: apellido,
        correo: correo,
        password: password,
        rol: valorSeleccionado
    };




    fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(respuesta => respuesta.json())
        .then(datos => Ingresar(datos))

})

function Ingresar(datos) {
    console.log(datos);

}

/*Seleccionar un producto para editar */
function obtenerUsuario(idUsuario) {
    fetch(`http://localhost:3000/api/usuario/${idUsuario}`)
        .then((response) => response.json())
        .then((data) => {
            // Rellenar el formulario con los detalles del producto
            document.getElementById("id-empleado").value = data._id;
            document.getElementById("nombreEditar").value = data.nombre;
            document.getElementById("apellidoEditar").value = data.apellido;
            document.getElementById("correoEditar").value = data.correo;
            document.getElementById("passwordEditar").value = data.password;
            //Mando a llamar el estado del pedido 
            const opcionElegida = data.rol;
            // Encontrar el elemento HTML correspondiente
            const radioBtn = document.querySelector(`input[name="rolEditrar"][value="${opcionElegida}"]`);

            // Marcar el botón correspondiente
            radioBtn.checked = true;
        })
        .catch((error) => console.log(error));
}

document.getElementById("botonEditar").addEventListener("click", function (evento) {
    //Evitar que el formulario envie valores por defecto
    evento.preventDefault();
    // Obtener los datos del formulario
    const idProducto = document.getElementById("id-empleado").value;
    const nombreE = document.getElementById("nombreEditar").value;
    const apellidoE = document.getElementById("apellidoEditar").value;
    const correoE = document.getElementById("correoEditar").value;
    const passE = document.getElementById("passwordEditar").value;

    var botonesDeRadio = document.getElementsByName("rol");

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
        apellido: apellidoE,
        correo: correoE,
        password: passE,
        rol: valorSeleccionado

    }

    // Hacer la solicitud al backend para actualizar el producto
    fetch(`http://localhost:3000/api/editar/${idProducto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then(respuesta => {
            respuesta.json()
            if (respuesta.ok) {
                console.log('Usuario editado correctamente');
                location.reload();
            } else {
                console.error('Error al editar el usuario');
            }
        })
        .then(datos => {
            Editar(datos);
        })
})

function Editar(datos) {
    console.log(datos);

}


/*Eliminar algun registro */
function eliminarUsuario(idUsuario) {
    fetch(`http://localhost:3000/api/eliminar/${idUsuario}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Usuario eliminado correctamente');
                location.reload();
            } else {
                console.error('Error al eliminar el usuario');
            }
        })
        .catch(error => console.error(error));
}

/*Mostrar Registros de Usuarios*/
function mostrarUsuarios(usuarios) {
    let mostrarUsuarios = document.getElementById('mostrarUsuarios')
    const productoEd = document.getElementById('productoEditar')
    const productoEl = document.getElementById('productoEliminar')
    mostrarUsuarios.innerHTML = ''
    usuarios.forEach(element => {
        mostrarUsuarios.innerHTML +=
            `<div class="contenedorProductos">  
            <img src="../imagenes/usuario.png">
        <div class="informacion"><p> Nombre: ${element.nombre}</p><p class="precio">
        <span>Apellido: ${element.apellido}</span></p><p class="precio">
        <span>Correo: ${element.correo}</span></p>
         Rol: ${element.rol}<p></p></div><div>
        <button onclick="obtenerUsuario('${element._id}')"><i class="fas fa-edit"></i></button>
         <button onclick="eliminarUsuario('${element._id}')">Eliminar</button></div></div>`

    });
}

/*Funcion para ver los productos en la pagina */
function ver() {
    window.onload = async () => {

        try {
            const response = await fetch('http://localhost:3000/api/usuarios');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const listaUsuarios = await response.json();
            //console.log(listaProducto);
            mostrarUsuarios(listaUsuarios);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
}




/*function login(evento) {

    evento.preventDefault();

    let correo = document.getElementById('email').value;
    let password = document.getElementById('Password').value;
    let rol = document.getElementById('rol').value;

    const data = {
        correo: correo,
        password: password,
        rol: rol
    }

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(response => {
            if (response.ok) {
                // Si la autenticación es exitosa, redirigir al usuario a la página de inicio
                console.log(data);
                if (rol == "Común") {
                    window.location.href = '../usuario/Vistausuario.html';
                } else if (rol == "Administrador") {
                    window.location.href = '../administrador/admin.html';
                } else {
                    window.location.href = '../paqueteria/paqueteria.html';
                }


            } else {
                // Si la autenticación no es exitosa, mostrar un mensaje de error
                console.log(data);
                throw new Error('Error al iniciar sesión');
            }
        })
        .catch(error => {
            console.error(error);
        });
}*/