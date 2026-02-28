// 11. Flujo de compra 

function validarUsuario(usuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usuario === "Valentina") {
        resolve("Usuario válido");
      } else {
        reject("Usuario no válido");
      }
    }, 1000);
  });
}

function validarStock(producto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (producto.stock >= producto.cantidad && producto.cantidad > 0) {
        resolve(producto);
      } else {
        reject("No hay stock disponible");
      }
    }, 1000);
  });
}

function calcularTotal(producto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (producto.cantidad <= 0) {
        reject("Cantidad no válida");
      } else {
        const total = producto.precio * producto.cantidad;
        resolve(total);
      }
    }, 1000);
  });
}

function confirmarCompra(total) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Compra confirmada. Total pagado: $${total}`);
    }, 1000);
  });
}

    try {
        await validarUsuario("Valentina");
        const producto = await validarStock({ nombre: "Computador", precio: 250000, cantidad: 8, stock: 5 });
        const total = await calcularTotal(producto);
        const mensaje = await confirmarCompra(total);
        console.log(mensaje);
    } catch (error) {
        console.error("Error:", error);
    }

async function realizarCompra() {
  try {
    await validarUsuario("Valentina");
    const producto = await validarStock({ nombre: "Computador", precio: 250000, cantidad: 3, stock: 5 });
    const total = await calcularTotal(producto);
    const mensaje = await confirmarCompra(total);
    console.log(mensaje);
  } catch (error) {
    console.error("Error:", error);
  }
}

realizarCompra();
