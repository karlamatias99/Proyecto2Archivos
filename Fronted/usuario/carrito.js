const getProductCart = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/producto-carrito");
        if (!response.ok) {
            throw new Error("Error de red");
        }
        const data = await response.json();
        setCartItems(data.productsCart);
    } catch (error) {
        console.error(error);
    }
};


const getProducts = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/producto");
        const data = await response.json();
        setProducts(data.products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};


const addItemCart = async (product) => {
    const { nombre, imagen, precio } = product;

    try {
        await fetch("http://localhost:3000/api/producto-carrito", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, imagen, precio }),
        });
        getProducts();
        getProductsCart();
    } catch (error) {
        console.error("Error al agregar el producto:", error);
    }
};

