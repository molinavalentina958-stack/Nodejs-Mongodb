// 10. Validar stock

let productos = [
    { nombre: "Teclado", precio: 50000, stock: 10 },
    { nombre: "Mouse", precio: 30000, stock: 0 },
    { nombre: "Monitor", precio: 800000, stock: 5 }
];

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function validarStock(producto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const item = productos.find(p => p.nombre === producto);
            if (!item) {
                reject("Producto no encontrado");
                return;
            }
            if (item.stock > 0) {
                resolve("Producto disponible");
            } else {
                reject("Producto agotado");
            }
        }, 1000);
    });
}

async function BuscarProducto() {
    rl.question("Ingrese el producto: ", async (nombre) => {
        try {
            const resultado = await validarStock(nombre);
            console.log("Resultado de la búsqueda:", resultado);
        } catch (error) {
            console.error(error);
        } finally {
            rl.close();
        }
    });
}

BuscarProducto();
