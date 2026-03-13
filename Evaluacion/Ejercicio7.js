// Promesas con arrays y consumir con: async / await y tambien con .then()

const pedidos = [
 {producto:"Maduro", precio:2000, cantidad:2},
 {producto:"Lechuga", precio:5000, cantidad:1},
 {producto:"Café", precio:3000, cantidad:4}
];

function calcularTotal(pedidos) {
    return new Promise((resolve) => {
        let totalGeneral = 0;

        pedidos.forEach(pedido => {
            totalGeneral += pedido.precio * pedido.cantidad;
        });

        resolve(totalGeneral);
    });
}

async function mostrarTotal() {
    let total = await calcularTotal(pedidos);
    console.log("Total general:", total);
}

mostrarTotal();
