// // 4. Validar usuario 

const readline = require("readline");

// Copiar en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function validarUsuario(usuario, contraseña) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usuario === "Admin" && contraseña === "98463") {
        resolve("Acceso concedido");
      } else {
        reject("Usuario o contraseña incorrectos");
      }
    }, 1000);
  });
}

async function iniciarSesion() {
  rl.question("Usuario: ", (usuario) => {
    rl.question("Contraseña: ", async (contraseña) => {
      try {
        const resultado = await validarUsuario(usuario, contraseña);
        console.log(resultado);
      } catch (error) {
        console.error(error);
      }
      rl.close();
    });
  });
}

iniciarSesion();
