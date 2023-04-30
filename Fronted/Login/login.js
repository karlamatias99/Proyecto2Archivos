//clase para poder realizar la transicion de Inicio Sesion o Registrarse 

//addEventListener, para decirle que en el evento click debe mostrar la funcion necesaria
document.getElementById("btn_registrarse").addEventListener("click", registrar);
document.getElementById("btn_login").addEventListener("click", inicioSesion);


//Declaro las variables que utilizare
let contenedor = document.querySelector(".Login_Registro");
let formulario_login = document.querySelector(".FormularioLogin");
let formulario_registro = document.querySelector(".FormularioRegistro");
let parteFijaLogin = document.querySelector(".login");
let parteFijaRegistro = document.querySelector(".registro");

//funciones para realizar la transicion entre las ventanas que utilizare

function inicioSesion() {

   formulario_login.style.display = "block";
   contenedor.style.left = "10px";
   formulario_registro.style.display = "none";
   parteFijaRegistro.style.opacity = "1";
   parteFijaLogin.style.opacity = "0";

}

function registrar() {

   formulario_registro.style.display = "block";
   contenedor.style.left = "410px";
   formulario_login.style.display = "none";
   parteFijaRegistro.style.opacity = "0";
   parteFijaLogin.style.opacity = "1";

}


