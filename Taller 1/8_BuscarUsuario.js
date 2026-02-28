// 8. Buscar usuario por ID

let Usuarios = [
    { id: "1", nombre: "Juan", edad: 25 },
    { id: "2", nombre: "María", edad: 30 },
    { id: "3", nombre: "Pedro", edad: 22 },
    { id: "4", nombre: "Ana", edad: 28 },
    { id: "5", nombre: "Luis", edad: 35 }
];

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function buscarUsuarioPorID(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const usuario = Usuarios.find(u => u.id === id);
            if (usuario) {
                resolve(usuario);
            } else {
                reject("Usuario no encontrado");
            }
        }, 1000);
    });
}

async function BuscarUsuario() {
    rl.question("Ingrese el id del usuario: ", async (id) => {
        try {
            const resultado = await buscarUsuarioPorID(id);
            console.log("Usuario encontrado:", resultado);
        } catch (error) {
            console.error(error);
        } finally {
            rl.close();
        }
    });
}

BuscarUsuario();
