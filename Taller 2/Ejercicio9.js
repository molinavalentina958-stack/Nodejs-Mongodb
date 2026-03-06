// 9. Reservas de hotel

const reservas = [
  { cliente: "Ana", noches: 6, precioNoche: 100000 },
  { cliente: "Luis", noches: 2, precioNoche: 120000 }
];

function validarReserva(reserva) {
  return new Promise((resolve, reject) => {
    if (reserva.noches <= 0) {
      reject(`La reserva del cliente ${reserva.cliente} tiene un número de noches inválido.`);
    } else {
      const subtotal = reserva.noches * reserva.precioNoche;
      const impuesto = subtotal * 0.10;
      const descuento = reserva.noches > 5 ? subtotal * 0.15 : 0;
      const total = subtotal + impuesto - descuento;
      resolve({ subtotal, impuesto, descuento, total });
    }
  });
}

async function generarReporteReservas(reservas) {
  const reservasProcesadas = [];
  const reservasError = [];
  const ingresosTotales = [];

  for (const reserva of reservas) {
    try {
        const { subtotal, impuesto, descuento, total } = await validarReserva(reserva);

        reservasProcesadas.push({
            cliente: reserva.cliente,
            noches: reserva.noches,
            subtotal,
            impuesto,
            descuento,
            total
        });

        ingresosTotales.push(total);

    } catch (error) {
        reservasError.push({
            cliente: reserva.cliente,
            error: error
        });
    }
}

    return {
        reservasProcesadas,
        reservasError,
        ingresosTotales
    };
}

generarReporteReservas(reservas).then(reporte => {
    console.log("Reservas procesadas:", reporte.reservasProcesadas);
    console.log("Reservas con errores:", reporte.reservasError);
    console.log("Ingresos totales:", reporte.ingresosTotales.reduce((acum, total) => acum + total, 0));
}). catch(error => {
    console.error("Error al generar el reporte de reservas:", error);
});
