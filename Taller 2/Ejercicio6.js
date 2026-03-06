// 6. Préstamos bancarios 

const prestamos = [
  { cliente: "Ana", monto: 10000000, tasa: 0.02, plazo: 12 },
  { cliente: "Luis", monto: 0, tasa: 0.03, plazo: 24 }
];

function validarPrestamo(prestamo) {
    return new Promise((resolve, reject) => {
        if (prestamo.monto <= 0) {
            reject("Préstamo inválido");
        } else {
            const interes = prestamo.monto * prestamo.tasa;
            const Mensual = interes / prestamo.plazo;
            const total = prestamo.monto + interes;
            resolve({
                cliente: prestamo.cliente,
                mensual: Mensual,
                total: total
            });
        }
    });
}

async function generarInforme(prestamos) {
    const prestamosOK = [];
    const prestamosError = [];

    for (const prestamo of prestamos) {
        try {
            const resultado = await validarPrestamo(prestamo);
            prestamosOK.push(resultado);
        } catch (error) {
            prestamosError.push({
                cliente: prestamo.cliente,
                error: error
            });
        }
    }
    return { prestamosOK, prestamosError };
}

generarInforme(prestamos).then(informe => {
    console.log("Préstamos Aprobados:");
    informe.prestamosOK.forEach(prestamo => {
        console.log(`Cliente: ${prestamo.cliente}, Cuota Mensual: ${prestamo.mensual}, Total prestado: ${prestamo.total}`);
    });
    console.log("Préstamos Rechazados:");
    informe.prestamosError.forEach(prestamo => {
        console.log(`Cliente: ${prestamo.cliente}, Error: ${prestamo.error}`);
    });
});
