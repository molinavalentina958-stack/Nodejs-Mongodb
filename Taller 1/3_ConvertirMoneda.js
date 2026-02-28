function convertirMoneda(valor, tasa) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (tasa > 0) {
                resolve(`Cantidad convertida: ${valor / tasa} USD`);
            } else {
                reject("Error: La tasa de cambio debe ser mayor que 0");
            }
        }, 1000);
    });
}

async function ejecutarConversion() {
    try {
        const resultado = await convertirMoneda(10000, 4000);
        console.log(resultado);
    } catch (error) {
        console.error(error);
    }
}

ejecutarConversion();
