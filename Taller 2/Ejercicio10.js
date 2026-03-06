// 10. Proyectos y presupuesto 

const proyectos = [
  { nombre: "Proyecto A", presupuesto: 10000000, gastos: [2000000, 3000000] },
  { nombre: "Proyecto B", presupuesto: 5000000, gastos: [4000000, 2000000] }
];

function validarProyecto(proyecto) {
  return new Promise((resolve, reject) => {

    if (!proyecto.gastos || proyecto.gastos.length === 0) {
      reject(`El proyecto ${proyecto.nombre} no tiene gastos registrados.`);
    } else {

      const gastoTotal = proyecto.gastos.reduce((acum, gasto) => acum + gasto, 0);
      const estado = gastoTotal > proyecto.presupuesto ? "Excedido" : "Dentro del presupuesto";
      const porcentajeEjecucion = (gastoTotal / proyecto.presupuesto) * 100;
      resolve({ gastoTotal, estado, porcentajeEjecucion });
    }
  });
}

async function generarReporteProyectos(proyectos) {

  const proyectosProcesados = [];
  const proyectosError = [];
  const proyectosEnRiesgo = [];
  const porcentajeGeneral = [];

  for (const proyecto of proyectos) {

    try {
      const { gastoTotal, estado, porcentajeEjecucion } = await validarProyecto(proyecto);

      proyectosProcesados.push({
        nombre: proyecto.nombre,
        gastoTotal,
        estado,
        porcentajeEjecucion
      });

      porcentajeGeneral.push(porcentajeEjecucion);

      if (estado === "Excedido") {
        proyectosEnRiesgo.push(proyecto.nombre);
      }

    } catch (error) {

      proyectosError.push({
        nombre: proyecto.nombre,
        error: error
      });
    }
  }

  return {
    proyectosProcesados,
    proyectosError,
    proyectosEnRiesgo,
    porcentajeGeneral
  };
}

generarReporteProyectos(proyectos).then(reporte => {
  console.log("Proyectos procesados:", reporte.proyectosProcesados);
  console.log("Errores en proyectos:", reporte.proyectosError);
  console.log("Proyectos en riesgo:", reporte.proyectosEnRiesgo);
  console.log(
    "Porcentaje de ejecución general:",
    reporte.porcentajeGeneral.reduce((acum, p) => acum + p, 0) / reporte.porcentajeGeneral.length
  );
});
