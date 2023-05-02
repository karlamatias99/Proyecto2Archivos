// Variables que traemos de nuestro html
const informacionCompra = document.getElementById('informacionCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const contenedor = document.getElementById('contenedor');
const carrito = document.getElementById('carrito');
const numero = document.getElementById("numero");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const x = document.getElementById('x')

// Variables que vamos a usar en el proyecto
let lista = []
let valortotal = 0

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
    fetch('http://localhost:3000/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoCompra),
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log('Producto insertado correctamente');
                numero.classList.add("diseñoNumero");
                numero.innerHTML = +numero.innerHTML + 1;
            } else {
                console.error('Error al insertar producto');
            }
        })
        .catch(error => {
            console.error("Error al agregar el producto:", error);
        });
};


/*function comprar(nombre, imagen, precio) {
    const  productosCompra = { nombre, imagen, precio };
    lista = fetch('http://localhost:3000/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( productosCompra),
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log('Producto insertado correctamente');
               // location.reload();
            } else {
                console.error('Error al insertar producto');
            }
        })
        .catch(error => {
            console.error("Error al agregar el producto:", error);
        });

    numero.innerHTML = lista.length
    numero.classList.add("diseñoNumero")
    return lista
};*/




/*function comprar(nombre, imagen, precio) {
    const producto = { nombre, imagen, precio };
    fetch('http://localhost:3000/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto),
    })
        .then(response => response.json())
        .then(response => {
            if (response.ok) {
                console.log('Producto insertado correctamente');
                location.reload();
            } else {
                console.error('Error al insertar producto');
            }
        })
        .catch(error => {
            console.error("Error al agregar el producto:", error);
        });
};
*/

function Ingresar(datos) {
    console.log(datos);

}

function mostrarElemtrosLista(productos) {
    productosCompra.innerHTML = ""
    valortotal = 0
    productos.forEach(element => {
        productosCompra.innerHTML +=
            `
        <p>${element.nombre}</p>
        <span>Precio: Q ${element.precio}</span>`

    });
    total.innerHTML = `<p>Valor Total</p> <p><span>$${valortotal}</span></p>`
}

/*function comprar(indice) {
    lista.push({ nombre: productos.nombre, precio: productos.precio })

    let van = true
    let i = 0
    while (van == true) {
        if (productos.nombre == productos.nombre) {
            productos.existencia -= 1
            if (productos.existencia == 0) {
                visualizarProductos()
            }
            van = false
        }
        //guardarAlmacenamientoLocal("productos", productos)
        i += 1
    }
    numero.innerHTML = lista.length
    numero.classList.add("diseñoNumero")
    return lista
}*/


carrito.addEventListener("click", function () {
    body.style.overflow = "hidden"
    contenedorCompra.classList.remove('none')
    contenedorCompra.classList.add('contenedorCompra')
    informacionCompra.classList.add('informacionCompra')

})



x.addEventListener("click", function () {
    body.style.overflow = "auto"
    contenedorCompra.classList.add('none')
    contenedorCompra.classList.remove('contenedorCompra')
    informacionCompra.classList.remove('informacionCompra')
    mostrarElemtrosLista()
})



//Ver elementos en nuestro carrito
/*function mostrarElemtrosLista(productos) {
    productosCompra.innerHTML = ""
    valortotal = 0
    productos.forEach(element => {
        productosCompra.innerHTML +=
            `
        <p>${element.nombre}</p>
        <span>Precio: Q ${element.precio}</span>`

    });
    total.innerHTML = `<p>Valor Total</p> <p><span>$${valortotal}</span></p>`
}*/

//Eliminar elementos de nuestro carrito 
/*function eliminar(indice) {
    let van = true
    let i = 0
    while (van == true) {
        if (productos[i].nombre == lista[indice].nombre) {
            productos[i].existencia += 1
            lista.splice(indice, 1)
            van = false
        }
        i += 1
    }
    guardarAlmacenamientoLocal("productos", productos)

    numero.innerHTML = lista.length
    if (lista.length == 0) {
        numero.classList.remove("diseñoNumero")
    }
    visualizarProductos()
    mostrarElemtrosLista()
}*/


