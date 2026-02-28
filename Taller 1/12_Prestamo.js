// 12. Flujo préstamo bancario 

function validarIngresos(ingresos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ingresos >= 4500000) {
        resolve(ingresos);
      } else {
        reject("Ingresos insuficientes");
      }
    }, 1000);
  });
}

function validarHistorial(historial) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (historial === "Bueno") {
        resolve(historial);
      } else {
        reject("Historial crediticio no válido");
      }
    }, 1000);
  });
}

function aprobarPrestamo(ingresos, historial) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ingresos >= 4500000 && historial === "Bueno") {
        resolve("Préstamo aprobado");
      } else {
        reject("Préstamo rechazado");
      }
    }, 1000);
  });
}

async function realizarPrestamo() {
  try {
    const ingresos = await validarIngresos(7800000);
    const historial = await validarHistorial("Bueno");
    const resultado = await aprobarPrestamo(ingresos, historial);
    console.log(resultado);
  } catch (error) {
    console.error("Error:", error);
  }
}

realizarPrestamo();
