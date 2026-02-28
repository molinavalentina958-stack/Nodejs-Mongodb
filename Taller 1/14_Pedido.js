// 14. Procesamiento de pedido

let contador = 0;

function generarID() {
    return new Promise((resolve) => {
        contador++;
          resolve(contador);
    });
}

function calcularTotal(precio, cantidad) {
    return new Promise((resolve, reject) => {
        if (precio <= 0 || cantidad <= 0) {
            reject("Precio o cantidad inválidos");
        } else {
            const total = precio * cantidad;
            resolve(total);
        }
    }, 1000);
}

function simularEnvio(id, total) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (total > 0) {
          resolve(`Pedido ${id} enviado correctamente`);
        } else {
          reject(`Error en el envío del pedido ${id}`);
        }
    }, 1000);
  });
}

async function procesarPedido() {
  try {
    const id = await generarID();
    console.log("ID generado:", id);

    const total = await calcularTotal(450000, 5);
    console.log("Total del pedido:", total);

    const envio = await simularEnvio(id, total);
    console.log(envio);

  } catch (error) {
    console.error("Error en el proceso:", error);
  }
}

procesarPedido();
