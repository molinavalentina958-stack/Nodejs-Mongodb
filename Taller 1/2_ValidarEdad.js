// 2. Validación de edad

const edad = 45;

function validarEdad() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (edad >= 18) {
                resolve("Eres mayor de edad");
            } else {
                reject("Eres menor de edad");
            }
        }, 1000);
    });
}

async function ejecutarValidacion() {
    try {
        const resultado = await validarEdad();
        console.log(resultado);
    } catch (error) {
        console.error(error);
    }
}

ejecutarValidacion();
