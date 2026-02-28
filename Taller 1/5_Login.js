// 5. Login + Mensaje

const readline = require("readline");

// Copiar en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Login(usuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usuario === "Valentina") {
        resolve("Bienvenida Valentina");
      } else {
        reject("Usuario incorrecto");
      }
    }, 1000);
  });
}

async function iniciarSesion() {
  rl.question("Usuario: ", async (usuario) => {
    try {
      const resultado = await Login(usuario);
      console.log(resultado);
    } catch (error) {
      console.error(error);
    }
    rl.close();
  });
}

iniciarSesion();
