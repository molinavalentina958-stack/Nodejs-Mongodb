// 7. Promedio de notas 

let notas = [
    { estudiante: "Juan", nota1: 4.5, nota2: 3.0, nota3: 4.0 },
    { estudiante: "María", nota1: 3.0, nota2: 4.5, nota3: 3.5 },
    { estudiante: "Pedro", nota1: 1.5, nota2: 2.0, nota3: 1.8 },
    { estudiante: "Ana", nota1: 5.0, nota2: 4.8, nota3: 5.0 },
    { estudiante: "Luis", nota1: 4.8, nota2: 4.2, nota3: 4.6 }
];

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calcularPromedio(nombre) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const estudiante = notas.find(e => 
                e.estudiante.toLowerCase() === nombre.toLowerCase()
            );

            if (!estudiante) {
                reject("Estudiante no encontrado ");
                return;
            }

            const promedio = 
                (estudiante.nota1 + estudiante.nota2 + estudiante.nota3) / 3;

            if (promedio >= 3.0) {
                resolve(`El promedio de ${nombre} es ${promedio.toFixed(2)}`);
            } else {
                reject(`El promedio de ${nombre} es ${promedio.toFixed(2)} y es insuficiente`);
            }

        }, 1000);
    });
}

async function ejecutarCalculo() {
    rl.question("Ingrese el nombre del estudiante: ", async (nombre) => {
        try {
            const resultado = await calcularPromedio(nombre);
            console.log(resultado);
        } catch (error) {
            console.error(error);
        } finally {
            rl.close();
        }
    });
}

ejecutarCalculo();
