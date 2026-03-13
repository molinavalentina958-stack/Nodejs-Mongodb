// Promesa con validación y consumir con: async / await y tambien con .then()

function procesarPedido(pedido) {
    return new Promise((resolve, reject) => {
        if (pedido.cantidad > 0) {
            let total = pedido.precio * pedido.cantidad;
            resolve(total);
        } else {
            reject("Cantidad inválida");
        }
    });
}

async function ejecutarPedido() {
    try {
        let total = await procesarPedido({producto:"Cebolla", precio:2000, cantidad:2});
        console.log("Total:", total);
    } catch (error) {
        console.log(error);
    }
}

ejecutarPedido();
