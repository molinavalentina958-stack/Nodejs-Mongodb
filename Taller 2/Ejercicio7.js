// 7. Ventas por vendedor

const ventas = [
  { vendedor: "Ana", monto: 500000 },
  { vendedor: "Luis", monto: 700000 },
  { vendedor: "Ana", monto: 300000 }
];

function calcularComision(monto) {
  return new Promise((resolve, reject) => {
    if (monto < 0) {
      reject("Monto inválido");
    } else {
      resolve(monto * 0.05);
    }
  });
}

async function generarInforme(ventas) {
  const resultados = [];
  const resumen = {};

  for (const venta of ventas) {
    try {
      const comision = await calcularComision(venta.monto);

      resultados.push({
        vendedor: venta.vendedor,
        monto: venta.monto,
        comision
      });

      resumen[venta.vendedor] =
        (resumen[venta.vendedor] || 0) + venta.monto;

    } catch (error) {
      console.error(`Error en venta de ${venta.vendedor}: ${error}`);
    }
  }

  let vendedorTop = null;
  let mayorVenta = 0;

  for (const vendedor in resumen) {
    if (resumen[vendedor] > mayorVenta) {
      mayorVenta = resumen[vendedor];
      vendedorTop = vendedor;
    }
  }

  return {
    resultados,
    resumen,
    vendedorTop
  };
}

generarInforme(ventas).then(informe => {
  console.log("Comisiones:");
  console.log(informe.resultados);

  console.log("Resumen por vendedor:");
  console.log(informe.resumen);

  console.log("Vendedor Top:");
  console.log(informe.vendedorTop);
});
