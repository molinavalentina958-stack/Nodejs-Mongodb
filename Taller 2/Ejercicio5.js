// 5. Inventario 

const productos = [
  { nombre: "Laptop", stockActual: 3, stockMinimo: 5, precio: 2000000 },
  { nombre: "Mouse", stockActual: 20, stockMinimo: 10, precio: 50000 }
];

function verificarStock(productos) {
  return new Promise((resolve) => {
    const resultados = [];

    productos.forEach(producto => {
      const diferencia = producto.stockActual - producto.stockMinimo;
      const valor = diferencia * producto.precio;

      resultados.push({
        nombre: producto.nombre,
        diferencia,
        valor
      });
    });
    resolve(resultados);
  });
}

async function generarInforme(productos) {
  try {
    const listaReposicion = await verificarStock(productos);

    return { listaReposicion };

  } catch (error) {
    console.error(error);
  }
}

generarInforme(productos).then(informe => {
  console.log("Lista:", informe.listaReposicion);

  const total = informe.listaReposicion.reduce(
    (acc, item) => acc + item.valor,
    0
  );

  console.log("Total:", total);
});
