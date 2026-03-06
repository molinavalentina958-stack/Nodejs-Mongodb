// 4. Carrito de compras

const carritos = [
  { cliente: "Ana", ciudad: "Medellín", productos: [{ precio: 50000, cantidad: 2 }] },
  { cliente: "Luis", ciudad: "Bogotá", productos: [] }
];

function validarCarrito(carrito) {
  return new Promise((resolve, reject) => {

    if (!carrito.productos || carrito.productos.length === 0) {
      reject(`El cliente ${carrito.cliente} no tiene productos en el carrito.`);
    } else {
      const envio = carrito.ciudad === "Medellín" ? 10000 : 20000;
      const subtotal = carrito.productos.reduce((acum, producto) => acum + producto.precio * producto.cantidad, 0);
      const descuento = subtotal > 100000 ? subtotal * 0.05 : 0;
      const total = subtotal + envio - descuento;
      resolve({ subtotal, envio, descuento, total });
    }
  });
}

async function generarFactura(carritos) {
  const ventasOK = [];
  const ventasError = [];
  const totalVentas = [];

  for (const carrito of carritos) {
    try {
      const { subtotal, envio, descuento, total } = await validarCarrito(carrito);
      ventasOK.push({ cliente: carrito.cliente, subtotal, envio, descuento });
      totalVentas.push(total);
    } catch (error) {
      ventasError.push({
        cliente: carrito.cliente,
        error: error
      });
    };
  }

  return {
    ventasOK,
    ventasError,
    totalVentas
  };
}

generarFactura(carritos).then(factura => {
  console.log("Ventas procesadas:", factura.ventasOK);
  console.log("Errores en ventas:", factura.ventasError);
  console.log("Total de ventas:", factura.totalVentas.reduce((acum, total) => acum + total, 0));
});
