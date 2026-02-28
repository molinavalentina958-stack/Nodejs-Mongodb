// 1. Calculadora avanzada 

const a = 17;
const b = 6;

function operar(tipo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            switch (tipo) {
                case "suma":
                    resolve(`Suma: ${a + b}`);
                    break;
                case "resta":
                    resolve(`Resta: ${a - b}`);
                    break;
                case "multiplicacion":
                    resolve(`Multiplicación: ${a * b}`);
                    break;
                case "division":
                    if (b === 0) {
                        reject("Error: No se puede dividir por 0");
                    } else {
                        resolve(`División: ${a / b}`);
                    }
                    break;
                default:
                    reject("Operación no válida");
            }
        }, 1000);
    });
}

operar("suma")
    .then(console.log)
    .then(() => operar("resta"))
    .then(console.log)
    .then(() => operar("multiplicacion"))
    .then(console.log)
    .then(() => operar("division"))
    .then(console.log)
    .catch(console.error);

async function ejecutarOperaciones() {
    try {
        console.log(await operar("suma"));
        console.log(await operar("resta"));
        console.log(await operar("multiplicacion"));
        console.log(await operar("division"));
    } catch (error) {
        console.error(error);
    }
}

ejecutarOperaciones();
