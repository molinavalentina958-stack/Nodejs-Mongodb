// 9. Generar factura 

const productos = [
    { nombre: "Teclado", precio: 100000 },
    { nombre: "Mouse", precio: 30000 },
    { nombre: "Computador", precio: 800000 }
];

function calcularTotalConIVA(productos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (!productos || productos.length === 0) {
                reject("No hay productos en el arreglo");
                return;
            }

            const total = productos.reduce((acum, producto) => 
                acum + producto.precio, 0);

            const iva = total * 0.19;
            const totalFinal = total + iva;

            resolve({
                total,
                iva,
                totalFinal
            });

        }, 1000);
    });
}

async function ejecutarCalculo() {
    try {
        const resultado = await calcularTotalConIVA(productos);
        console.log("Subtotal:", resultado.total);
        console.log("IVA (19%):", resultado.iva);
        console.log("Total a pagar:", resultado.totalFinal);
    } catch (error) {
        console.error(error);
    }
}

ejecutarCalculo();
