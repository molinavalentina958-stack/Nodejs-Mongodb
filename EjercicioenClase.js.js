// Ejercicio: Procesar pedidos (array de objetos) con validaciones y cálculos

// Tienes este arreglo de pedidos:

const pedidos = [
  { id: 1, cliente: "Ana", items: [{ sku: "A1", precio: 12000, cantidad: 2 }, { sku: "B1", precio: 8000, cantidad: 1 }], cupon: "DESC10" },
  { id: 2, cliente: "Luis", items: [{ sku: "A1", precio: 12000, cantidad: 1 }, { sku: "C1", precio: 20000, cantidad: 3 }], cupon: null },
  { id: 3, cliente: "Sofi", items: [{ sku: "D1", precio: 5000, cantidad: 0 }], cupon: "DESC20" }, // inválido (cantidad 0)
  { id: 4, cliente: "Juan", items: [], cupon: "DESC10" }, // inválido (sin items)
];

// Y este objeto de cupones:

const cupones = {
  DESC10: 0.10,
  DESC20: 0.20,
};

function validarPedido(pedido) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (pedido.items.length === 0 || pedido.items.some(item => item.cantidad <= 0)) {
        return reject(new Error("El pedido está vacío o no es válido"));
      } else 
        {return resolve(pedido);
      }
    }, 1000);
  });
}

function calcularSubtotal(pedido) {
  return new Promise((resolve, reject) => { 
    setTimeout(() => {
      if (!pedido) {
        return reject(new Error("Pedido no válido"));
      }else {
      const subtotal = pedido.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
      return resolve({ ...pedido, subtotal });
      }
    }, 1000);
  });
}

function aplicarDescuento(pedido) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!pedido || !pedido.subtotal) {
        return reject(new Error("Pedido no válido para aplicar descuento"));
      }
      const descuento = cupones[pedido.cupon] || 0;
      const total = pedido.subtotal - (pedido.subtotal * descuento);
      return resolve({ ...pedido, total });
    }, 1000);
  });
}

async function procesarPedidos(pedidos) {

  const pedidosOK = [];
  const pedidosError = [];
  const resumenClientes = {};
  let totalGeneral = 0;

  for (const pedido of pedidos) {
    try {

      const pedidoValido = await validarPedido(pedido);
      const pedidoConSubtotal = await calcularSubtotal(pedidoValido);
      const pedidoFinal = await aplicarDescuento(pedidoConSubtotal);

      pedidosOK.push(pedidoFinal);

      if (!resumenClientes[pedidoFinal.cliente]) {
        resumenClientes[pedidoFinal.cliente] = 0;
      }

      resumenClientes[pedidoFinal.cliente] += pedidoFinal.total;

      totalGeneral += pedidoFinal.total;

    } catch (error) {

      pedidosError.push({
        id: pedido.id,
        cliente: pedido.cliente,
        error: error.message
      });

    }
  }

  return {
    pedidosOK,
    pedidosError,
    resumenClientes,
    totalGeneral
  };
}

procesarPedidos(pedidos).then(reporte => {
  console.log("REPORTE FINAL");
  console.log(reporte);
});
