// 2. Procesar facturas con IVA

const facturas = [
  { id: 1, productos: [{ precio: 20000, cantidad: 2 }, { precio: 10000, cantidad: 1 }] },
  { id: 2, productos: [] }
];

function validarProductos(factura) {
  return new Promise((resolve, reject) => {
    if (!factura.productos || factura.productos.length === 0) {
      reject(`Factura ${factura.id} no tiene productos.`);
    } else {
      const subtotal = factura.productos.reduce((acum, producto) => {
        return acum + producto.precio * producto.cantidad;
      }, 0);

      const iva = subtotal * 0.19;
      const total = subtotal + iva;

      resolve(total);
    }
  });
}

async function generarReporte(facturas) {
  const facturasProcesadas = [];
  const facturasError = [];

  for (const factura of facturas) {
    try {
      const total = await validarProductos(factura);
      facturasProcesadas.push({ id: factura.id, total });
    } catch (error) {
      facturasError.push({
        id: factura.id,
        error: error
      });
    }
  }

  const totalFacturasProcesadas = facturasProcesadas.reduce(
    (acum, factura) => acum + factura.total,
    0
  );

  return {
    facturasProcesadas,
    facturasError,
    totalFacturasProcesadas
  };
}

generarReporte(facturas).then(reporte => {
  console.log("Facturas Procesadas:", reporte.facturasProcesadas);
  console.log("Facturas con Error:", reporte.facturasError);
  console.log("Total Facturas Procesadas:", reporte.totalFacturasProcesadas);
});
