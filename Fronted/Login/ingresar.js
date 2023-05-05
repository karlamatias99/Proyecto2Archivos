const form = document.getElementById('RegistroUsuario');
const form2 = document.getElementById('Ingreso');

form.addEventListener('submit', registrar);


function registrar(evento) {
    //Evitar que el formulario envie valores por defecto
    evento.preventDefault();

    let nombre = document.getElementById('nombreAñadir').value;
    let apellido = document.getElementById('apellidoAñadir').value;
    let correo = document.getElementById('emailAñadir').value;
    let password = document.getElementById('passwordAñadir').value;
    let rol = "Común";

    const data = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        password: password,
        rol: rol

    }

    fetch('http://localhost:3000/api', {
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

form2.addEventListener('submit', async (event) => {
    event.preventDefault();

    let correo = document.getElementById('email').value;
    let password = document.getElementById('Password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const userRole = data.rol; // Aquí se obtiene el rol del usuariol;
            localStorage.setItem('usuario', data.correo);
            console.log(userRole);
            if (userRole === 'Administrador') {

                window.location.href = '../administrador/admin.html';
            } else if (userRole === 'Paqueteria') {

                window.location.href = '../paqueteria/paqueteria.html';
            } else {

                window.location.href = '../usuario/Vistausuario.html';
            }
        } else {
            console.error('Error en la respuesta', response);
            alert('Correo y/o contraseña incorrectos. Intente de nuevo');
        }

    } catch (error) {
        console.error('Error al enviar la solicitud', error);
        alert('Error al enviar la solicitud');
    }
});




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