

function TopClientes() {
    fetch('http://localhost:3000/api/TopClientes') // endpoint del backend que devuelve los datos
        .then(response => response.json())
        .then(data => {
            // Obtener la tabla
            const table = document.getElementById('top10clientes');

            // Recorrer los datos y crear las filas de la tabla
            data.forEach((cliente, index) => {
                const row = table.insertRow(index + 1);
                const nombreCell = row.insertCell(0);
                const productosCell = row.insertCell(1);

                nombreCell.innerHTML = cliente.nombre;
                productosCell.innerHTML = cliente.numProductos;
            });
        })
        .catch(error => console.error(error));


}