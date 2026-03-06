// 1. Procesar nómina

const empleados = [
  { id: 1, nombre: "Ana", salarioBase: 2000000, horasExtra: 10 },
  { id: 2, nombre: "Luis", salarioBase: 1800000, horasExtra: 5 },
  { id: 3, nombre: "Carlos", salarioBase: 0, horasExtra: 8 }
];

function calcularSalarioTotal(empleado) {
  return new Promise((resolve, reject) => {
    if (empleado.salarioBase <= 0) {
      reject(`Error: El salario base de ${empleado.nombre} es inválido.`);
    } else {
      const valorHora = empleado.salarioBase / 240;
      const pagoHorasExtra = valorHora * 1.5 * empleado.horasExtra;
      const salarioTotal = empleado.salarioBase + pagoHorasExtra;
      const descuentoSalud = salarioTotal * 0.04;
      const salarioNeto = salarioTotal - descuentoSalud;

      resolve(salarioNeto);
    }
  });
}

async function generarReporte(empleados) {
  const empleadosProcesados = [];
  const empleadosError = [];

  for (const empleado of empleados) {
    try {
      const salario = await calcularSalarioTotal(empleado);
      empleadosProcesados.push({ ...empleado, salario });
    } catch (error) {
      empleadosError.push({
        id: empleado.id,
        nombre: empleado.nombre,
        error: error 
      });
    }
  }

  const totalNomina = empleadosProcesados.reduce(
    (total, emp) => total + emp.salario,
    0
  );

  return {
    empleadosProcesados,
    empleadosError,
    totalNomina
  };
}

generarReporte(empleados).then(reporte => {
  console.log("Empleados Procesados:", reporte.empleadosProcesados);
  console.log("Empleados con Error:", reporte.empleadosError);
  console.log("Total nómina:", reporte.totalNomina);
});
    