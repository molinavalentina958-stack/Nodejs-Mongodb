// 8. Consumo de energía 

const usuarios = [
    { nombre: "Ana", consumo: 120, tarifa: 500 },
    { nombre: "Luis", consumo: 200, tarifa: 500}
];

function validarConsumo(usuario) {
    return new Promise((resolve, reject) => {
        
        if (usuario.consumo <= 0) {
            reject(`El usuario ${usuario.nombre} tiene un consumo inválido.`);
        } else {

            const costo = usuario.consumo * usuario.tarifa;
            const subsidio = usuario.consumo < 150 ? costo * 0.10: 0;
            const totalPagar = costo - subsidio;
            resolve({ costo, subsidio, totalPagar });
        }
    });
}

async function generarReporteEnergia(usuarios) {
    const listaFacturas = [];
    const usuariosError = [];
    const totalRecaudado = [];

    for (const usuario of usuarios) {
        try {
            const { costo, subsidio, totalPagar } = await validarConsumo(usuario);

            listaFacturas.push({
                nombre: usuario.nombre,
                consumo: usuario.consumo,
                costo,
                subsidio,
                totalPagar
            });

            totalRecaudado.push(totalPagar);

        } catch (error) {
            usuariosError.push({
                nombre: usuario.nombre,
                error: error
            });
        }
    }

    return {
        listaFacturas,
        usuariosError,
        totalRecaudado
    };
}

generarReporteEnergia(usuarios).then(reporte => {
    console.log("Facturas generadas:", reporte.listaFacturas);
    console.log("Usuarios con errores:", reporte.usuariosError);
    console.log("Total recaudado:", reporte.totalRecaudado.reduce((acum, total) => acum + total, 0));
}).catch(error => {
    console.error("Error al generar el reporte:", error);
});
